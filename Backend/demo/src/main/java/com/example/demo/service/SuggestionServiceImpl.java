package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Resident;
import com.example.demo.entity.Suggetion;
import com.example.demo.exception.ResidentException;
import com.example.demo.exception.SuggetionException;
import com.example.demo.repository.ResidentRepository;
import com.example.demo.repository.SuggetionRepository;
@Service
public class SuggestionServiceImpl implements SuggestionService{
	@Autowired
	SuggetionRepository suggestionrepository;
	@Autowired
	ResidentRepository residentrepository;
	@Override
	public Suggetion updateStatus(Long sid) throws ResidentException, SuggetionException {
		Optional<Suggetion> suggestionOptional = suggestionrepository.findById(sid);
	    if (suggestionOptional.isPresent()) {
	    	Suggetion suggestion = suggestionOptional.get();
	        
	        // Update the status
	    	suggestion.setStatus("viewed");
	        
	        // Save the updated complaint to the database
	    	Suggetion updatedSuggestion = suggestionrepository.save(suggestion);
	        
	        return updatedSuggestion;
	    } else {
	        throw new SuggetionException("Still in the process");
	    }
	}
	@Override
	public List<Suggetion> getSuggestionByResidentId(Integer residentId) throws SuggetionException, ResidentException {
		 Optional<Resident> residentOptional = residentrepository.findById(residentId);
	        if (residentOptional.isPresent()) {
	            Resident resident = residentOptional.get();
	            List<Suggetion> suggestion = suggestionrepository.findByResident(resident);
	            return suggestion;
	        } else {
	            throw new ResidentException("Resident does not exist");
	        }
	}
	
	@Override
	public Suggetion createSuggetion(Suggetion suggestion) throws SuggetionException, ResidentException {
		//Security context holds the current users login credentials 
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		
		
//		System.out.println("user name is "+ username);
		// Retrieve the resident from the database based on the resident email
		
		Resident residentOptional = residentrepository.findByEmail(username);
//        Resident residentOptional = residentRepository.findById(rid).get();
        if (residentOptional != null) {
            Resident resident = residentOptional;
            suggestion.setResident(resident);
            
            // Save the new account to the database
            suggestion.setDate(LocalDateTime.now());
            Suggetion createdSuggestion = suggestionrepository.save(suggestion);
            
            return createdSuggestion;
        } else {
            throw new SuggetionException("Suggestion has not been sent");
        }
	}
	}


