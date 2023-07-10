package com.example.demo.service;

import java.util.List;


import com.example.demo.entity.Accounts;
import com.example.demo.entity.Resident;
import com.example.demo.exception.AccountsException;
import com.example.demo.exception.ResidentException;

public interface AccountService {
	public List<Accounts> viewLogedInResidentsAccounts() throws AccountsException, ResidentException;
	
	List<Accounts> getAccountsByResidentId(Integer residentId) throws AccountsException, ResidentException;
	
	Accounts createAccount(Resident resident) throws AccountsException, ResidentException;
	
	Accounts updateStatus(Integer billNo) throws AccountsException, ResidentException;

	List<Accounts> getAllAccounts() throws AccountsException, ResidentException;
}
