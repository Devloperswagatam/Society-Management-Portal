package com.example.demo.service;

import java.time.LocalDateTime;
import java.time.Year;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Candidate;
import com.example.demo.entity.Committee;
import com.example.demo.entity.Resident;
import com.example.demo.entity.VotingEvent;
import com.example.demo.exception.CommitteeException;
import com.example.demo.repository.CandidateRepository;
import com.example.demo.repository.CommitteeRepository;
import com.example.demo.repository.ResidentRepository;
import com.example.demo.repository.VotingEventRepository;

@Service
public class CommitteeServiceImpl implements CommitteeService {

	@Autowired
	private CommitteeRepository committeeRepository;

	@Autowired
	private VotingEventRepository votingEventRepository;

	@Autowired
	private CandidateRepository candidateRepository;
	
	@Autowired
	private ResidentRepository residentRepository;

	@Override
	public List<Committee> viewAllCommittee() throws CommitteeException {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		
		Resident existresident = residentRepository.findByEmail(username);
		if(!existresident.getRole().equals("committee")) {
			throw new CommitteeException("Committee login required !!");
		}
		
		List<Committee> list = committeeRepository.findAll();

		if (list.size() == 0) {
			throw new CommitteeException("No committee member available in list");
		}
		return list;
	}

	@Override
	public void addCommittee() throws CommitteeException {
//		Committee existCommittee = committeeRepository.findById(committee.getRid()).orElse(null);

		// Getting all voting events from current year
		try {
			List<VotingEvent> allVotingEvents = votingEventRepository.findByYearAndStatus(Year.now(),
					"closed");
			for (VotingEvent event : allVotingEvents) {
				List<Candidate> allCandidates = candidateRepository.findByVotingEvent(event);

				Candidate winnerCandidate = null;
				Integer maxVotes = 0;
				for (Candidate candidate : allCandidates) {
					Integer votes = candidate.getNumberOfVotes();
					if (votes > maxVotes) {
						maxVotes = votes;
						winnerCandidate = candidate;
					}
				}

				if (winnerCandidate != null) {
					Committee committee = new Committee();
					committee.setRid(winnerCandidate.getRid());
					committee.setPostName(winnerCandidate.getPostName());
					committeeRepository.save(committee);
					
					
					Resident existResident = residentRepository.findById(winnerCandidate.getRid()).orElse(null);
					if(existResident != null) {
						existResident.setRole("committee");
						residentRepository.save(existResident);
					}else {
						throw new IllegalArgumentException("Resident not found !!");
					}
					
					System.out.println("Committe member added successfully !!");
				}
			}
		} catch (Exception err) {
			err.printStackTrace();
			throw new CommitteeException("Exception occured while creating committee member !!");
		}

	}
}
