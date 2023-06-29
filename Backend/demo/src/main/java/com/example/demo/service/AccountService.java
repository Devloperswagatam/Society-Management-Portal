package com.example.demo.service;

import java.util.List;


import com.example.demo.entity.Accounts;
import com.example.demo.exception.AccountsException;
import com.example.demo.exception.ResidentException;

public interface AccountService {
	List<Accounts> getAccountsByResidentId(Integer residentId) throws AccountsException, ResidentException;
	
	Accounts createAccount(Accounts account) throws AccountsException, ResidentException;
	
	Accounts updateStatus(Integer billNo) throws AccountsException, ResidentException;
}
