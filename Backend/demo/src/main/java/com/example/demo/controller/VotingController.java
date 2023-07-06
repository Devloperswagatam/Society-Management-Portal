package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Candidate;
import com.example.demo.entity.VotingEvent;

import com.example.demo.service.VotingEventService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/residents/voting")
public class VotingController {
	@Autowired
	private VotingEventService votingEventService;


	@PostMapping("/event")
	public ResponseEntity<?> createVotingEvent(@RequestBody VotingEvent votingEvent) {
		try {
			votingEventService.createVotingEvent(votingEvent);
			return ResponseEntity.ok("Voting event created successfully.");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PostMapping("/candidates/{votingId}")
	public ResponseEntity<?> nominateCandidate(@PathVariable("votingId") Integer votingId) {
		try {
			votingEventService.nominateCandidate(votingId);
			return ResponseEntity.ok("Candidate nominated successfully.");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("Already a candidate !!");
		}
	}

	@PostMapping("/votes/{votingId}/{rid}")
	public ResponseEntity<?> giveVote(@PathVariable("votingId") Integer votingId, @PathVariable("rid") Integer rid) {
		try {
			votingEventService.giveVote(votingId,rid);
			return ResponseEntity.ok("Vote cast successfully.");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PostMapping("/close/{votingId}")
	public ResponseEntity<?> closeVotingEvent(@PathVariable("votingId") Integer votingId) {
		try {
			votingEventService.closeVotingEvent(votingId);
			return ResponseEntity.ok("Voting event closed successfully.");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@GetMapping("/event")
	public ResponseEntity<List<VotingEvent>> getAllVotingEvents() {
		return new ResponseEntity<List<VotingEvent>>(votingEventService.getAllVotingEvents(), HttpStatus.OK);
	}
	
	@GetMapping("/event/{votingId}")
	public ResponseEntity<List<Candidate>> viewCandidatesByVotingEvent(@PathVariable("votingId") Integer votingId){
		return new ResponseEntity<List<Candidate>>(votingEventService.getAllCandidatesByVotingId(votingId),HttpStatus.OK);
	}
	
}
