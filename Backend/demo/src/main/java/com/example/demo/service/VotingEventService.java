package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Candidate;
import com.example.demo.entity.VotingEvent;
import com.example.demo.exception.EventsException;
import com.example.demo.exception.ResidentException;

public interface VotingEventService {
	
	public void createVotingEvent(VotingEvent votingEvent) throws EventsException, ResidentException;
	
	public void nominateCandidate(Integer votingId) throws EventsException;
	
	public void giveVote(Integer votingId, Integer rid);
	
	public void closeVotingEvent(Integer votingId);
	
	public List<VotingEvent> getAllVotingEvents();
	
	public void removeCandidate();

	public void withdrawNomination(Integer votingId) throws EventsException;
	
	public void automaticallyCloseVotingEvents();
	
	public List<Candidate> getAllCandidatesByVotingId(Integer votingId);

	public List<Candidate> getAllCandidates() throws EventsException;

	public VotingEvent updateVotingEvent(VotingEvent event) throws EventsException, ResidentException;
}
