package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.VotingEvent;

public interface VotingEventService {
	
	public void createVotingEvent(VotingEvent votingEvent);
	
	public void nominateCandidate(Integer votingId);
	
	public void giveVote(Integer votingId, Integer rid);
	
	public void closeVotingEvent(Integer votingId);
	
	public List<VotingEvent> getAllVotingEvents();
	
	public void removeCandidate();
	
	public void automaticallyCloseVotingEvents();
}
