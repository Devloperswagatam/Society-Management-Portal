package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Committee;
import com.example.demo.exception.CommitteeException;
import com.example.demo.service.CommitteeService;

@RestController
@RequestMapping("/committee")
public class CommitteeController {
	@Autowired
	private CommitteeService committeeService;
	
	@GetMapping("/member")
	public ResponseEntity<List<Committee>> viewAllCommittee() throws CommitteeException{
		List<Committee> returnCommittee = committeeService.viewAllCommittee();
		return new ResponseEntity<List<Committee>>(returnCommittee,HttpStatus.OK);
	}
	
}
