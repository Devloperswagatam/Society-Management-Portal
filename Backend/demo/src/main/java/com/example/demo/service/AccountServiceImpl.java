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
public class AccountServiceImpl implements AccountService {

	@Autowired
	private AccountsRepository accountsRepository;

	@Autowired
	private ResidentRepository residentRepository;

	@Override
	public List<Accounts> getAccountsByResidentId(Integer residentId) throws AccountsException, ResidentException {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();

		Resident existResident = residentRepository.findByEmail(username);
		if (!existResident.getRole().equals("committee")) {
			throw new ResidentException("Committee login required");
		}

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
	public Accounts createAccount(Resident resident) throws AccountsException, ResidentException {

		if (resident == null) {
			throw new AccountsException("Account is not created !!");
		}

		Accounts newAccount = new Accounts();
		newAccount.setAmount(5000.00);
		newAccount.setDate(LocalDateTime.now());
		newAccount.setResident(resident);
		newAccount.setStatus("pending");

		return accountsRepository.save(newAccount);
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

	@Override
	public List<Accounts> viewLogedInResidentsAccounts() throws AccountsException, ResidentException {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();

		Resident existResident = residentRepository.findByEmail(username);
//		if(!existResident.getRole().equals("resident")) {
//			throw new ResidentException("Only resident have access to this !!");
//		}

		List<Accounts> allAccounts = accountsRepository.findByResident(existResident);
		if (allAccounts.size() == 0) {
			throw new AccountsException("NO accounts are present !!");
		}
		return allAccounts;

	}

	@Override
	public List<Accounts> getAllAccounts() throws AccountsException, ResidentException {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();

		Resident existResident = residentRepository.findByEmail(username);
		
		if(!existResident.getRole().equals("committee")) {
			throw new ResidentException("Committee Login required");
		}
		return accountsRepository.findAll();
	}

}
