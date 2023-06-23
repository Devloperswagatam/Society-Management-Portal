package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Resident;
import com.example.demo.exception.ResidentException;
import com.example.demo.repository.ResidentRepository;

@Service
public class ResidentServiceImpl implements ResidentService{
	
	@Autowired
	private ResidentRepository residentRepository;

	@Override
	public Resident addResident(Resident resident) throws ResidentException{
		Resident existResident = residentRepository.findByEmail(resident.getEmail());
		if(existResident != null) {
			throw new ResidentException("Resident email already exist");
		}else {
			return residentRepository.save(resident);
		}
	}

	@Override
	public Resident updateResident(Resident resident) throws ResidentException {
		if(resident == null) {
			throw new ResidentException("Null value is not allowed");
		}
		
		Optional<Resident> optional = residentRepository.findById(resident.getRid());
		if(optional.isEmpty()) {
			throw new ResidentException("No resident exist with given resident id :"+ resident.getRid());
		}
		return residentRepository.save(resident);
	}

	@Override
	public List<Resident> viewAllResidents() throws ResidentException {
		List<Resident> residents = residentRepository.findAll();
		if(residents.size()==0) {
			throw new ResidentException("No resident available in list");
		}
		return residents;
	}

}
