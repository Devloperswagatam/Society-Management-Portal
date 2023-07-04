package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Resident;
import com.example.demo.exception.ResidentException;
import com.example.demo.service.ResidentService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/residents")
public class ResidentController {
	@Autowired
	private ResidentService residentService;
	
	@PostMapping("/resident")
	public ResponseEntity<Resident> addResident(@RequestBody Resident resident)throws ResidentException{
		
		System.out.println("This is resident controller");
		Resident returnResident = residentService.addResident(resident);
		return new ResponseEntity<Resident>(returnResident,HttpStatus.CREATED);
	}
	
	@PutMapping("/resident")
	public ResponseEntity<Resident> updateResident(@RequestBody Resident resident) throws ResidentException{
		Resident returnResident = residentService.updateResident(resident);
		return new ResponseEntity<Resident>(returnResident,HttpStatus.OK);
	}
	
	@GetMapping("/resident")
	public ResponseEntity<List<Resident>> viewAllResident() throws ResidentException{
		List<Resident> residents = residentService.viewAllResidents();
		return new ResponseEntity<List<Resident>>(residents,HttpStatus.OK);
	}
}
