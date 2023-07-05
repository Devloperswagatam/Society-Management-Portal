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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Complaint;
import com.example.demo.entity.Resident;
import com.example.demo.exception.ComplaintException;
import com.example.demo.exception.ResidentException;
import com.example.demo.repository.ComplaintRepository;
import com.example.demo.repository.ResidentRepository;
import com.example.demo.service.ComplaintService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
@Controller
@RequestMapping("/api")
public class ComplaintController {
	public static String uploadDirectory = System.getProperty("user.dir") + "/src/main/resources/static/images/complaints";
	@Autowired
	ComplaintRepository complaintRepo;
	@Autowired
	ComplaintService complaintService;
	@Autowired
	ResidentRepository residentRepo;
	@Autowired
	private ObjectMapper mapper ;
	@PostMapping
	public  ResponseEntity<?> saveComplaint(
			@RequestParam("file") MultipartFile file,
			@RequestParam("complaintData") String complaintData) throws IOException{
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		Resident existResident = residentRepo.findByEmail(username);
		//saving the files into the folder
		String Path_Directory="C:\\Users\\hp\\Desktop\\Society Management portal\\Society-Management-Portal\\Backend\\demo\\src\\main\\resources\\static\\images\\complaints";
		Files.copy(file.getInputStream(), Paths.get(Path_Directory+File.separator+file.getOriginalFilename()),StandardCopyOption.REPLACE_EXISTING);
		
		Complaint complaint = null;
		try {
			
			complaint = mapper.readValue(complaintData, Complaint.class);
		} catch (JsonProcessingException e) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Request");
		}
		complaint.setResident(existResident);
		complaint.setImage(file.getOriginalFilename());
		complaint.setDate(LocalDateTime.now());
		complaintRepo.save(complaint);
		return ResponseEntity.ok(complaint);
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
	@PostMapping("/complaint")
	public ResponseEntity<Complaint> createComplaint(@RequestBody Complaint complaint) throws ComplaintException, ResidentException{
		return new ResponseEntity<Complaint>(complaintService.createComplaint(complaint),HttpStatus.CREATED);
	}
}
