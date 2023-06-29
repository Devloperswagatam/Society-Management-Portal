package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Resident;
import com.example.demo.exception.ResidentException;
import com.example.demo.repository.ResidentRepository;

@Service
public class ResidentServiceImpl implements ResidentService{
	
	@Autowired
	private ResidentRepository residentRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public Resident addResident(Resident resident) throws ResidentException{
		resident.setPassword(passwordEncoder.encode(resident.getPassword()));
			return residentRepository.save(resident);
	}

	@Override
	public Resident updateResident(Resident resident) throws ResidentException {
		if(resident == null) {
			throw new ResidentException("Null value is not allowed");
		}
		
		Resident existResident = residentRepository.findByEmail(resident.getEmail());
		if(existResident == null) {
			throw new ResidentException("No resident exist with given email :"+ resident.getEmail());
		}
		
		
		existResident.setPhoneNumber(resident.getPhoneNumber());
		existResident.setName(resident.getName());
		existResident.setEmail(resident.getEmail());
		existResident.setPassword(passwordEncoder.encode(resident.getPassword()));
		existResident.setFlatNo(resident.getFlatNo());
		existResident.setFloorNo(resident.getFloorNo());
		existResident.setWingNo(resident.getWingNo());
		existResident.setMemberCount(resident.getMemberCount());
		existResident.setRole(resident.getRole());
		return residentRepository.save(existResident);
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
