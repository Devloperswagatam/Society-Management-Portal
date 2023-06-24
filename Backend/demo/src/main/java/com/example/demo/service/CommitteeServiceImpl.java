package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Committee;
import com.example.demo.exception.CommitteeException;
import com.example.demo.repository.CommitteeRepository;

@Service
public class CommitteeServiceImpl implements CommitteeService{
	
	@Autowired
	private CommitteeRepository committeeRepository;

	@Override
	public List<Committee> viewAllCommittee() throws CommitteeException {
		List<Committee> list = committeeRepository.findAll();
		
		if(list.size() == 0) {
			throw new CommitteeException("No committee member available in list");
		}
		return list;
	}

	@Override
	public Committee addCommittee(Committee committee) throws CommitteeException {
		Committee existCommittee = committeeRepository.findByEmail(committee.getResident().getEmail());
		
		if(existCommittee != null) {
			throw new CommitteeException("Resident email already exist");
		}else {
			return committeeRepository.save(committee);
		}
	}
	
	

}
