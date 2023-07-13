package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.Bulletin;
import com.example.demo.repository.BulletinRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/bull")
public class BulletinController {
	@Autowired
	BulletinRepository repository;
	
	@GetMapping("/notes")
	public List<Bulletin> getAllBulletin(){
		return repository.findAll();
	}
	@GetMapping("/bulletin/{id}")
	public Bulletin getBulletinByid(@PathVariable("id")Long id) {
		return repository.findById(id).get();
	}
				
	@PostMapping("/bulletin")
	public String addBulletin(@RequestBody Bulletin bulletin ) {
		repository.save(bulletin);
		return "Object is saved";
	}
	@PutMapping("/bulletin/{id}")
	public String updateBulletin(@PathVariable("id") Long id, @RequestBody Bulletin updatedBulletin) {
	    Optional<Bulletin> optionalBulletin = repository.findById(id);
	    
	    if (optionalBulletin.isPresent()) {
	        Bulletin bulletin = optionalBulletin.get();
	        bulletin.setName(updatedBulletin.getName());
	        bulletin.setDescription(updatedBulletin.getDescription());
	        
	        repository.save(bulletin);
	        
	        return "Record Updated";
	    }
	    
	    return "Record not found";
	}
	@DeleteMapping("/bulletin/{id}")
	public String deleteBulletinById(@PathVariable("id")Long id) {
		Bulletin bulletin1=(Bulletin)repository.findById(id).get();
		if(bulletin1.getId()==id)
		{
			repository.delete(bulletin1);
		}
		return "Record Deleted";
	}

}
