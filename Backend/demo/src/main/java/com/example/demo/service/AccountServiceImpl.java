package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Accounts;
import com.example.demo.entity.Resident;
import com.example.demo.exception.AccountsException;
import com.example.demo.exception.ResidentException;
import com.example.demo.repository.AccountsRepository;
import com.example.demo.repository.ResidentRepository;

@Service
public class AccountServiceImpl implements AccountService{
	
	@Autowired
	private AccountsRepository accountsRepository;
	
	@Autowired
	private ResidentRepository residentRepository;
	
	

	@Override
	public List<Accounts> getAccountsByResidentId(Integer residentId) throws AccountsException, ResidentException {
		 Optional<Resident> residentOptional = residentRepository.findById(residentId);
	        if (residentOptional.isPresent()) {
	            Resident resident = residentOptional.get();
	            List<Accounts> accounts = accountsRepository.findByResident(resident);
	            return accounts;
	        } else {
	            throw new ResidentException("Resident does not exist");
	        }
	}

	@Override
	public Accounts createAccount(Accounts account) throws AccountsException, ResidentException {
		 
		//Security context holds the current users login credentials 
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		
		
//		System.out.println("user name is "+ username);
		
		
		// Retrieve the resident from the database based on the resident email
		
		Resident residentOptional = residentRepository.findByEmail(username);
//        Resident residentOptional = residentRepository.findById(rid).get();
        if (residentOptional != null) {
            Resident resident = residentOptional;
            account.setResident(resident);
            
            // Save the new account to the database
            account.setDate(LocalDateTime.now());
            Accounts createdAccount = accountsRepository.save(account);
            
            return createdAccount;
        } else {
            throw new AccountsException("Account is not created !!");
        }
	}

	@Override
	public Accounts updateStatus(Integer billNo) throws AccountsException, ResidentException {
		Optional<Accounts> accountOptional = accountsRepository.findById(billNo);
	    if (accountOptional.isPresent()) {
	        Accounts account = accountOptional.get();
	        
	        // Update the status
	        account.setStatus("paid");
	        
	        // Save the updated account to the database
	        Accounts updatedAccount = accountsRepository.save(account);
	        
	        return updatedAccount;
	    } else {
	        throw new AccountsException("Payment status is still pending");
	    }
	}

}
