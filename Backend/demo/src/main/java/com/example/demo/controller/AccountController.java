package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Accounts;
import com.example.demo.exception.AccountsException;
import com.example.demo.exception.ResidentException;
import com.example.demo.service.AccountService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/residents/accounts")
public class AccountController {
	
	@Autowired
	private AccountService accountService;
	
	@GetMapping("/account/{rid}")
	public ResponseEntity<List<Accounts>> getAccountsByResidentId(@PathVariable("rid") Integer rid) throws AccountsException, ResidentException{
		return new ResponseEntity<List<Accounts>>(accountService.getAccountsByResidentId(rid),HttpStatus.OK);
	}
	
//	@PostMapping("/account")
//	public ResponseEntity<Accounts> createAccount(@RequestBody) throws AccountsException, ResidentException{
////		System.out.println("the id is :" + rid);
//		return new ResponseEntity<Accounts>(accountService.createAccount(),HttpStatus.CREATED);
//	}
	
	@PutMapping("/account/{billNo}")
	public ResponseEntity<Accounts> updateStatus(@PathVariable("billNo") Integer billNo) throws AccountsException,ResidentException{
		return new ResponseEntity<Accounts>(accountService.updateStatus(billNo),HttpStatus.OK);
	}
	
	@GetMapping("/account")
	public ResponseEntity<List<Accounts>> viewLogedInResidentsAccounts() throws AccountsException, ResidentException{
		return new ResponseEntity<List<Accounts>>(accountService.viewLogedInResidentsAccounts(),HttpStatus.OK);
	}
}
