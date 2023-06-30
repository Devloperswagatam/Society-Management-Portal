package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.Complaint;
import com.example.demo.exception.ComplaintException;
import com.example.demo.exception.ResidentException;
import com.example.demo.repository.ComplaintRepository;
import com.example.demo.service.ComplaintService;
@RestController
@RequestMapping("/api")
public class ComplaintController {
	@Autowired
	ComplaintRepository complaintRepo;
	@Autowired
	ComplaintService complaintService;
	
	@PostMapping("/complaints")
	public ResponseEntity<Complaint> createComplaint(@RequestBody Complaint complaint) throws ComplaintException, ResidentException{
		return new ResponseEntity<Complaint>(complaintService.createComplaint(complaint),HttpStatus.CREATED);
	}
	
	@GetMapping("/complaints/{rid}")
	public ResponseEntity<List<Complaint>> getComplaintsByResidentId(@PathVariable("rid") Integer rid) throws ComplaintException, ResidentException{
		return new ResponseEntity<List<Complaint>>(complaintService.getComplaintsByResidentId(rid),HttpStatus.OK);
	}
	@GetMapping("/complaint")
	public ResponseEntity<List<Complaint>> getAllComplaint()throws ComplaintException {
		List<Complaint> cmplist = new ArrayList<>();
		complaintRepo.findAll().forEach(cmplist::add);
		return new ResponseEntity<List<Complaint>>(cmplist, HttpStatus.OK);
	}
	@PutMapping("/complaints/{id}")
	public ResponseEntity<Complaint> updateStatus(@PathVariable("id") Long id) throws ComplaintException,ResidentException{
		return new ResponseEntity<Complaint>(complaintService.updateStatus(id),HttpStatus.OK);
	}
}
