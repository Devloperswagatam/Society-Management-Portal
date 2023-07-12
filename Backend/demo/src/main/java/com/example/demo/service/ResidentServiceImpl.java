package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
		Resident existResident = residentRepository.findByEmail(resident.getEmail());
		if(existResident != null) {
			throw new ResidentException("Email is already registered, please use another !!");
		}
		
		resident.setPassword(passwordEncoder.encode(resident.getPassword()));
		resident.setRole("resident");
			return residentRepository.save(resident);
	}

	@Override
	public Resident updateResident(Resident resident) throws ResidentException {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		
		Resident existResident = residentRepository.findByEmail(username);
		
		
		if(!existResident.getEmail().equals(resident.getEmail())) {
			throw new ResidentException("This is not you !!");
		}
		
		
		existResident.setPhoneNumber(resident.getPhoneNumber());
		existResident.setName(resident.getName());
		existResident.setEmail(resident.getEmail());
//		existResident.setPassword(passwordEncoder.encode(resident.getPassword()));
		
		if(existResident.getRole().equals("committee")) {
			
			existResident.setFlatNo(resident.getFlatNo());
			existResident.setFloorNo(resident.getFloorNo());
			existResident.setWingNo(resident.getWingNo());
			existResident.setMemberCount(resident.getMemberCount());
		}
		
		
		return residentRepository.save(existResident);
	}

	@Override
	public List<Resident> viewAllResidents() throws ResidentException {
		// Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		// String username = authentication.getName();
		
		// Resident existresident = residentRepository.findByEmail(username);
		// if(!existresident.getRole().equals("committee")) {
		// 	throw new ResidentException("Committee member login required !!");
		// }
		
		List<Resident> residents = residentRepository.findAll();
		if(residents.size()==0) {
			throw new ResidentException("No resident available in list");
		}
		return residents;
	}

	@Override
	public Resident viewLoggedInResident() throws ResidentException {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		
		Resident loggedResident = residentRepository.findByEmail(username);
		return loggedResident;
	}

}
