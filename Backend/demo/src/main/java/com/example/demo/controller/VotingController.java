package com.example.demo.controller;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Candidate;
import com.example.demo.entity.Resident;
import com.example.demo.entity.Voters;
import com.example.demo.exception.CandidateException;
import com.example.demo.exception.ResidentException;
import com.example.demo.exception.VotersException;
import com.example.demo.repository.CandidateRepository;
import com.example.demo.repository.ResidentRepository;
import com.example.demo.repository.VotersRepository;

@RestController
@RequestMapping("/residents/votes")
public class VotingController {
	@Autowired
	private VotersRepository votersRepository;

	@Autowired
	private CandidateRepository candidateRepository;

	@Autowired
	private ResidentRepository residentRepository;

	@PostMapping("/candidate")
	public ResponseEntity<Candidate> addCandidate(@RequestBody Candidate candidate) throws CandidateException {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();

//		System.out.println("username is "+ username);
		Resident existResident = residentRepository.findByEmail(username);
//		System.out.println("Resident data is "+existResident.toString());

		Integer rid = existResident.getRid();
//		System.out.println("id is "+rid);

		Optional<Candidate> existCandidate = candidateRepository.findById(rid);
		if (existCandidate.isPresent()) {
			throw new CandidateException("Already a candidate");
		}
		candidate.setResident(existResident);
		candidate.setNumberOfVotes(0);
		return new ResponseEntity<Candidate>(candidateRepository.save(candidate), HttpStatus.CREATED);

	}

	@PutMapping("/vote/{candidateId}")
	public ResponseEntity<String> giveVote(@PathVariable("candidateId") Integer candidateId) throws VotersException, CandidateException {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();

		Resident existResident = residentRepository.findByEmail(username);
//		System.out.println("Exist Resident is "+existResident.toString());

		
		Candidate candidate = candidateRepository.findById(candidateId).get();
//		System.out.println("Candidate is "+candidate.toString());
		
		
		if (existResident.getRid().equals(candidate.getRid())) {
			throw new CandidateException("Already a candidate, can't give vote");
		}
		

		
		Voters existVoter = votersRepository.findById(existResident.getRid()).orElse(null);
		if(existVoter != null) {
			throw new VotersException("Already Voted");
		}
		
		existVoter = new Voters();
		existVoter.setResident(existResident);
		existVoter.setDate(LocalDateTime.now());
		existVoter.setHasVoted(true);
		
		
		
		candidate.setNumberOfVotes(candidate.getNumberOfVotes() + 1);

		votersRepository.save(existVoter);
		candidateRepository.save(candidate);

		return new ResponseEntity<String>("Voted Successfully", HttpStatus.OK);
	}
}
