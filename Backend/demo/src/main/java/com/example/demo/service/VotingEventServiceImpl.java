package com.example.demo.service;

import java.time.LocalDateTime;
import java.time.Year;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Candidate;
import com.example.demo.entity.Resident;
import com.example.demo.entity.Voters;
import com.example.demo.entity.VotingEvent;
import com.example.demo.repository.CandidateRepository;
import com.example.demo.repository.ResidentRepository;
import com.example.demo.repository.VotersRepository;
import com.example.demo.repository.VotingEventRepository;

@Service
public class VotingEventServiceImpl implements VotingEventService {
	@Autowired
	private VotingEventRepository votingEventRepository;

	@Autowired
	private CandidateRepository candidateRepository;

	@Autowired
	private VotersRepository voterRepository;

	@Autowired
	private ResidentRepository residentRepository;

	@Autowired
	private ResidentService residentService;

	@Autowired
	private EmailSenderService emailSenderService;

	@Override
	public void createVotingEvent(VotingEvent votingEvent) {
		try {
			
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String username = authentication.getName();
			
			Resident existResident = residentRepository.findByEmail(username);
			
			if(!existResident.getRole().equals("committee")) {
				throw new IllegalArgumentException("Committee login required !!");
			}

			LocalDateTime newEventStartTime = votingEvent.getStartTime();
			LocalDateTime newEventEndTime = votingEvent.getEndTime();

			// Check for time overlap with existing voting events
			List<VotingEvent> existingEvents = votingEventRepository.findAll();
			for (VotingEvent existingEvent : existingEvents) {
				LocalDateTime existingEventStartTime = existingEvent.getStartTime();
				LocalDateTime existingEventEndTime = existingEvent.getEndTime();

				if (newEventStartTime.isBefore(existingEventEndTime)
						&& newEventEndTime.isAfter(existingEventStartTime)) {
					throw new IllegalArgumentException("The new voting event clashes with an existing event.");
				}
			}
			
			
			votingEvent.setYear(Year.now());
			votingEvent.setStatus("open");
			votingEventRepository.save(votingEvent);

			// sending voting event reminder to all residents

			List<Resident> allResident = residentService.viewAllResidents();
			for (Resident resident : allResident) {
				emailSenderService.sendEmail(resident.getEmail(), "Voting Event",
						"Dear " + resident.getName() + " there's an voting event on " + votingEvent.getStartTime()
								+ ". So please nominate yourself or give vote to your candidates.");
			}

		} catch (Exception err) {
			err.printStackTrace();
			throw new RuntimeException("Failed to create voting event !!");
		}

	}

	@Override
	public void nominateCandidate(Integer votingId) {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();

		Resident existResident = residentRepository.findByEmail(username);
//		Integer rid = existResident.getRid();

		// Fetch the VotingEvent and Resident
		VotingEvent votingEvent = votingEventRepository.findById(votingId)
				.orElseThrow(() -> new IllegalArgumentException("Invalid voting event ID."));

		// Check if the voting event has already started
		LocalDateTime currentTime = LocalDateTime.now();
		if (currentTime.isAfter(votingEvent.getStartTime())) {
			throw new IllegalStateException("Voting event has already started. Nomination is no longer allowed !!");
		}
		

		// Check if resident is already nominated for another post in the same voting
		// event
		if (candidateRepository.existsByridAndVotingEventVotingId(existResident.getRid(), votingId)) {
			throw new IllegalStateException("Resident is already nominated for this post in this voting event.");
		}
		
		//check if there already a candidate from your flat no
		List<Candidate> allCandidates = candidateRepository.findByVotingEvent(votingEvent);
		for(Candidate candidate : allCandidates) {
			if(existResident.getFlatNo().equals(candidate.getResident().getFlatNo())) {
				throw new IllegalStateException("A member from your flat is already nominated !!");
			}
		}

		// Create a new Candidate entity and save it
		Candidate candidate = new Candidate();
		candidate.setVotingEvent(votingEvent);
		candidate.setResident(existResident);
		candidate.setNumberOfVotes(1);
		candidate.setPostName(votingEvent.getPostname());
		candidateRepository.save(candidate);

		// sending confirmation to the candidates

		emailSenderService.sendEmail(candidate.getResident().getEmail(), "Candidate Confirmation",
				"Dear " + candidate.getResident().getName() + ", you have nominated youself for the "
						+ candidate.getPostName() + " post");

	}

	@Override
	public void giveVote(Integer votingId, Integer rid) {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();

		// Fetch the VotingEvent and Resident
		VotingEvent votingEvent = votingEventRepository.findById(votingId)
				.orElseThrow(() -> new IllegalArgumentException("Invalid voting event ID."));
		
		//check the voting event is still open or closed
		LocalDateTime currentTime = LocalDateTime.now();
//		System.out.println("Currrent timme is "+ currentTime);
//		System.out.println("Event start time "+ votingEvent.getStartTime());
		
		
		if(currentTime.isAfter(votingEvent.getEndTime())) {
			throw new IllegalArgumentException("Voting event is already closed, you can't vote !!");
		}
		
//		System.out.println("Event end time "+ votingEvent.getEndTime());
		
		
		
		
		
		Resident currResident = residentRepository.findByEmail(username);

		Candidate existCandidate = candidateRepository.findById(currResident.getRid()).orElse(null);

		if (existCandidate != null && existCandidate.getRid().equals(rid)) {
			throw new IllegalStateException("Your a candidate, you have already voted !!");
		}

		// Check if the voter has already voted
		if (voterRepository.existsByridAndVotingEventVotingId(currResident.getRid(), votingId)) {
			throw new IllegalStateException("Resident has already voted in this voting event.");
		}
		
		if(currentTime.isBefore(votingEvent.getStartTime())) {
			throw new IllegalArgumentException("Voting event not yet started !!");
		}

		// Create a new Voter entity and save it
		Voters voter = new Voters();
		voter.setVotingEvent(votingEvent);
		voter.setResident(currResident);
		voter.setDate(LocalDateTime.now());
		voter.setHasVoted(true);
		voterRepository.save(voter);

		// Increment the number of votes for the chosen candidate
		Candidate candidate = candidateRepository.findByridAndVotingEventVotingId(rid, votingId)
				.orElseThrow(() -> new IllegalStateException("Candidate not found."));
		candidate.setNumberOfVotes(candidate.getNumberOfVotes() + 1);
		candidateRepository.save(candidate);

	}

	@Override
	public void closeVotingEvent(Integer votingId) {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		
		Resident existResident = residentRepository.findByEmail(username);
		
		if(!existResident.getRole().equals("committee")) {
			throw new IllegalArgumentException("Committee login required !!");
		}

		VotingEvent votingEvent = votingEventRepository.findById(votingId)
				.orElseThrow(() -> new IllegalArgumentException("Invalid voting event ID."));

		if (votingEvent.getStatus().equals("open")) {
			if (LocalDateTime.now().isAfter(votingEvent.getEndTime())) {
				votingEvent.setStatus("closed");
				votingEventRepository.save(votingEvent);
			} else {
				throw new IllegalArgumentException("Voting time is not yet passed!");
			}
		} else {
			throw new IllegalArgumentException("Voting event is already closed!");
		}

	}

	// Scheduled method to automatically close voting events

	public void automaticallyCloseVotingEvents() {
		List<VotingEvent> openEvents = votingEventRepository.findByStatus("open");
		LocalDateTime currentTime = LocalDateTime.now();

		for (VotingEvent event : openEvents) {
			if (event.getEndTime().isBefore(currentTime)) {
				event.setStatus("closed");
				votingEventRepository.save(event);
				System.out.println("Voting event closed successfully !!");
			}
		}
	}

	@Override
	public List<VotingEvent> getAllVotingEvents() {
		return votingEventRepository.findAll();
	}

	@Override
	public void removeCandidate() {
		try {
		List<VotingEvent> allVotingEvents = votingEventRepository.findByYearAndStatus(Year.now(),
				"closed");
		for(VotingEvent event : allVotingEvents) {
			List<Candidate> allCandidates = candidateRepository.findByVotingEvent(event);
			// Find the candidate with the maximum number of votes
	        int maxVotes = 0;
	        for (Candidate candidate : allCandidates) {
	            int votes = candidate.getNumberOfVotes();
	            if (votes > maxVotes) {
	                maxVotes = votes;
	            }
	        }
	        
	     // Remove candidates with fewer votes
//	        List<Candidate> candidatesToRemove = new ArrayList<>();
	        for (Candidate candidate : allCandidates) {
	            
	            if (candidate.getNumberOfVotes() < maxVotes) {
	            	allCandidates.remove(candidate);
	                candidateRepository.delete(candidate);
	            }
	        }
	        
	        candidateRepository.saveAll(allCandidates);
	        System.out.println("Loosing candidates are removed !!");
		}
		}catch(Exception err) {
			err.printStackTrace();
			throw new IllegalArgumentException("Exception occured while removing candidates !! "+err.getMessage());
		}
		
	}

}
