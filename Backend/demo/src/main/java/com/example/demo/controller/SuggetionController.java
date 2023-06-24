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
import com.example.demo.entity.Suggetion;
import com.example.demo.repository.SuggetionRepository;

@RestController
@RequestMapping("/suggetion")
public class SuggetionController {
	@Autowired
	SuggetionRepository suggestRepo;
	
	@PostMapping("/addSuggetion")
	public String createSuggetion(@RequestBody Suggetion suggetion) {
		suggestRepo.save(suggetion);
		return "Suggetion has been created successfully";
	}
	@GetMapping("/allSuggetion")
	public ResponseEntity<List<Suggetion>> getAllSuggetion(){
		List<Suggetion> sugglist = new ArrayList<>();
		suggestRepo.findAll().forEach(sugglist::add);
		return new ResponseEntity<List<Suggetion>>(sugglist, HttpStatus.OK);
	}
}
