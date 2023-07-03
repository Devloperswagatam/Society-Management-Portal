package com.example.demo.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Suggetion;
import com.example.demo.exception.ResidentException;
import com.example.demo.exception.SuggetionException;
import com.example.demo.repository.SuggetionRepository;
import com.example.demo.service.SuggestionService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/sugg")
public class SuggetionController {
	@Autowired
	SuggetionRepository suggestRepo;
	@Autowired
	SuggestionService service;
	@Autowired
	private ObjectMapper mapper ;
//	@PostMapping("/suggetion")
//	public ResponseEntity<Suggetion> createSuggetion(@RequestBody Suggetion suggetion) throws SuggetionException, ResidentException{
//		return new ResponseEntity<Suggetion>(service.createSuggetion(suggetion),HttpStatus.CREATED);
//	}
	@PostMapping
	public  ResponseEntity<?> createSuggestion(
			@RequestParam("file") MultipartFile file,
			@RequestParam("suggestionData") String suggestionData) throws IOException,SuggetionException,ResidentException{
		
		//saving the files into the folder
		String Path_Directory="C:\\Users\\hp\\Desktop\\Society Management portal\\Society-Management-Portal\\Backend\\demo\\src\\main\\resources\\static\\images\\suggestion";
		Files.copy(file.getInputStream(), Paths.get(Path_Directory+File.separator+file.getOriginalFilename()),StandardCopyOption.REPLACE_EXISTING);
		Suggetion suggestion = null;
		try {
			
			suggestion = mapper.readValue(suggestionData, Suggetion.class);
		} catch (JsonProcessingException e) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Request");
		}
		suggestion.setImage(file.getOriginalFilename());
		suggestion.setDate(LocalDateTime.now());
		suggestRepo.save(suggestion);
		return ResponseEntity.ok(suggestion);
		
	}
	@GetMapping("/suggestion")
	public ResponseEntity<List<Suggetion>> getAllSuggetion()throws SuggetionException {
		List<Suggetion> sugglist = new ArrayList<>();
		suggestRepo.findAll().forEach(sugglist::add);
		return new ResponseEntity<List<Suggetion>>(sugglist, HttpStatus.OK);
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
