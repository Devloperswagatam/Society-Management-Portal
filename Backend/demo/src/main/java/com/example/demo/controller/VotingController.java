package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/vote")
public class VotingController {
	@Autowired
	private VotersRepository votersRepository;
	
	@Autowired
	private CandidateRepository candidateRepository;
	
	@Autowired
	private ResidentRepository residentRepository;
	
	@PostMapping("/addCandidate")
	public ResponseEntity<Candidate> addCandidate(@RequestBody Resident resident) throws ResidentException{
		Resident existResident = residentRepository.findByEmail(resident.getEmail());
		if(existResident == null) {
			throw new ResidentException("Resident does not exist");
		}
		Candidate candidate = new Candidate();
	    candidate.setResident(resident);

	    Candidate savedCandidate = candidateRepository.save(candidate);
	    return new ResponseEntity<Candidate>(savedCandidate, HttpStatus.OK);
	}
	
	@PutMapping("/addVote")
	public ResponseEntity<String> giveVote(@RequestParam Integer rid) throws VotersException, CandidateException{
		Voters voter = votersRepository.findById(rid).get();
        Candidate candidate = candidateRepository.findById(rid).get();

        if (voter == null || candidate == null) {
            return new ResponseEntity<String>("Invalid Citizen or Candidate", HttpStatus.NOT_FOUND);
        }

        if (voter.getHasVoted()) {
            return new ResponseEntity<String>("Already Voted", HttpStatus.BAD_REQUEST);
        }

        voter.setHasVoted(true);
        candidate.setNumberOfVotes(candidate.getNumberOfVotes()+1);

        votersRepository.save(voter);
        candidateRepository.save(candidate);

        return new ResponseEntity<String>("Voted Successfully", HttpStatus.OK);
	}
}
