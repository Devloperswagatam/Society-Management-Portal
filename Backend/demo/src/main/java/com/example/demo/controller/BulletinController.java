package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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




@RestController
@RequestMapping("/notice")
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
	@PutMapping("/bulletin")
	public String updateBulletin(@RequestBody Bulletin bulletin ) {
		Bulletin bulletin1=(Bulletin)repository.findById(bulletin.getId()).get();
		if(bulletin.getId()==bulletin.getId())
		{
			bulletin1.setId(bulletin.getId());
			bulletin1.setDescription(bulletin.getDescription());
			bulletin1.setName(bulletin.getName());
		}
		return "Record Updated";
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
