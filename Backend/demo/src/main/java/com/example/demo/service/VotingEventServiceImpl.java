package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

			votingEventRepository.save(votingEvent);
			
			
			//sending voting event reminder to all residents
			
			List<Resident> allResident = residentService.viewAllResidents();
			for(Resident resident : allResident) {
				emailSenderService.sendEmail(resident.getEmail(),
											"Voting Event",
											"Dear "+resident.getName()+" there's an voting event on "+votingEvent.getStartTime()+". So please nominate yourself or give vote to your candidates.");
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

		// Check if resident is already nominated for another post in the same voting
		// event
		if (candidateRepository.existsByridAndVotingEventVotingId(existResident.getRid(), votingId)) {
			throw new IllegalStateException("Resident is already nominated for this post in this voting event.");
		}

		// Fetch the VotingEvent and Resident
		VotingEvent votingEvent = votingEventRepository.findById(votingId)
				.orElseThrow(() -> new IllegalArgumentException("Invalid voting event ID."));

		// Create a new Candidate entity and save it
		Candidate candidate = new Candidate();
		candidate.setVotingEvent(votingEvent);
		candidate.setResident(existResident);
		candidate.setNumberOfVotes(1);
		candidate.setPostName(votingEvent.getPostname());
		candidateRepository.save(candidate);
		
		//sending confirmation to the candidates
		
		emailSenderService.sendEmail(candidate.getResident().getEmail(),
										"Candidate Confirmation",
										"Dear "+candidate.getResident().getName()+", you have nominated youself for the "+candidate.getPostName()+" post");

	}

	@Override
	public void giveVote(Integer votingId, Integer rid) {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();

		// Fetch the VotingEvent and Resident
		VotingEvent votingEvent = votingEventRepository.findById(votingId)
				.orElseThrow(() -> new IllegalArgumentException("Invalid voting event ID."));
		Resident currResident = residentRepository.findByEmail(username);

		Candidate existCandidate = candidateRepository.findById(currResident.getRid()).orElse(null);

		if (existCandidate != null) {
			throw new IllegalStateException("Not a candidate !!");
		}

		// Check if the voter has already voted
		if (voterRepository.existsByridAndVotingEventVotingId(currResident.getRid(), votingId)) {
			throw new IllegalStateException("Resident has already voted in this voting event.");
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
    @Scheduled(fixedDelay = 60000) 
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

}
