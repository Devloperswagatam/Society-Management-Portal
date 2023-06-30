package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Complaint;
import com.example.demo.entity.Resident;
import com.example.demo.exception.ComplaintException;
import com.example.demo.exception.ResidentException;
import com.example.demo.repository.ComplaintRepository;
import com.example.demo.repository.ResidentRepository;
@Service
public class ComplaintServiceImpl implements ComplaintService {
	@Autowired
	ComplaintRepository complaintRepository;
	@Autowired
	ResidentRepository repository;
	
	@Override
	public Complaint updateStatus(Long id) throws ResidentException, ComplaintException {
		Optional<Complaint> complaintOptional = complaintRepository.findById(id);
	    if (complaintOptional.isPresent()) {
	    	Complaint complaint = complaintOptional.get();
	        
	        // Update the status
	    	complaint.setStatus("viewed");
	        
	        // Save the updated complaint to the database
	    	Complaint updatedComplaint = complaintRepository.save(complaint);
	        
	        return updatedComplaint;
	    } else {
	        throw new ComplaintException("Still in the process");
	    }
	}
	@Override
	public List<Complaint> getComplaintsByResidentId(Integer residentId) throws ComplaintException, ResidentException {
		 Optional<Resident> residentOptional = repository.findById(residentId);
	        if (residentOptional.isPresent()) {
	            Resident resident = residentOptional.get();
	            List<Complaint> complaint = complaintRepository.findByResident(resident);
	            return complaint;
	        } else {
	            throw new ResidentException("Resident does not exist");
	        }
	}
	
	
	@Override
	public Complaint createComplaint(Complaint complaint) throws ComplaintException, ResidentException {
		//Security context holds the current users login credentials 
				Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
				String username = authentication.getName();
				
				
//				System.out.println("user name is "+ username);
				// Retrieve the resident from the database based on the resident email
				
				Resident residentOptional = repository.findByEmail(username);
//		        Resident residentOptional = residentRepository.findById(rid).get();
		        if (residentOptional != null) {
		            Resident resident = residentOptional;
		            complaint.setResident(resident);
		            
		            // Save the new account to the database
		            complaint.setDate(LocalDateTime.now());
		            Complaint createdComplaint = complaintRepository.save(complaint);
		            
		            return createdComplaint;
		        } else {
		            throw new ComplaintException("Complaint has not been sent");
		        }
			}

	}