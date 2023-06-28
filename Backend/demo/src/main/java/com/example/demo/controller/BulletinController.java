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

import com.example.demo.entity.Bulletin;
import com.example.demo.exception.BulletinException;
import com.example.demo.repository.BulletinRepository;
@RestController
@RequestMapping("/notes")
public class BulletinController {
	@Autowired
	BulletinRepository bulletinRepo;
	
	@PostMapping("/note")
	public String createNotes(@RequestBody Bulletin bulletin) throws BulletinException{
		bulletinRepo.save(bulletin);
		return "Notes has been created successfully";
	}
	@GetMapping("/note")
	public ResponseEntity<List<Bulletin>> getAllNotes() throws BulletinException{
		List<Bulletin> notelist = new ArrayList<>();
		bulletinRepo.findAll().forEach(notelist::add);
		return new ResponseEntity<List<Bulletin>>(notelist, HttpStatus.OK);
	}
}
