package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Committee;
import com.example.demo.exception.CommitteeException;

public interface CommitteeService {
	public List<Committee> viewAllCommittee() throws CommitteeException;
	
	public Committee addCommittee(Committee committee) throws CommitteeException;
}
