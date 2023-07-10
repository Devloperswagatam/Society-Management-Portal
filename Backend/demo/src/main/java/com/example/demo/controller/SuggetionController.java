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
import com.example.demo.entity.Suggetion;
import com.example.demo.exception.ResidentException;
import com.example.demo.exception.SuggetionException;
import com.example.demo.repository.SuggetionRepository;
import com.example.demo.service.SuggestionService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/sugg")
public class SuggetionController {
	@Autowired
	SuggetionRepository suggestRepo;
	@Autowired
	SuggestionService service;
	@PostMapping("/suggetion")
	public ResponseEntity<Suggetion> createSuggetion(@RequestBody Suggetion suggetion) throws SuggetionException, ResidentException{
		return new ResponseEntity<Suggetion>(service.createSuggetion(suggetion),HttpStatus.CREATED);
	}
	
	 @GetMapping("/suggestion")
	    public List<Suggetion> getAllSuggestions() {
	        return service.getAllSuggestions();
	    }
	@GetMapping("/suggetion/{rid}")
	public ResponseEntity<List<Suggetion>> getSuggestionByResidentId(@PathVariable("rid") Integer rid) throws SuggetionException, ResidentException{
		return new ResponseEntity<List<Suggetion>>(service.getSuggestionByResidentId(rid),HttpStatus.OK);
	}
	@PutMapping("/suggetion/{id}")
	public ResponseEntity<Suggetion> updateStatus(@PathVariable("id") Long id) throws SuggetionException,ResidentException{
		return new ResponseEntity<Suggetion>(service.updateStatus(id),HttpStatus.OK);
	}
}
