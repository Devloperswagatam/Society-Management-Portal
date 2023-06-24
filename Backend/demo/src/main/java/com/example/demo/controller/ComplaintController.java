package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Complaint;
import com.example.demo.repository.ComplaintRepository;
@RestController
@RequestMapping("/api")
public class ComplaintController {
	@Autowired
	ComplaintRepository complaintRepo;
	
	@PostMapping("/complaints")
	public String createComplaint(@RequestBody Complaint complaint) {
		complaintRepo.save(complaint);
		return "Complaint has been created successfully";
	}
	@GetMapping("complaints")
	public ResponseEntity<List<Complaint>> getAllComplaints(){
		List<Complaint> cmplist = new ArrayList<>();
		complaintRepo.findAll().forEach(cmplist::add);
		return new ResponseEntity<List<Complaint>>(cmplist, HttpStatus.OK);
	}
}
