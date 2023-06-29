package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Resident;

@Repository
public interface ResidentRepository extends JpaRepository<Resident, Integer>{
	public Resident findByEmail(String email);
	
//	Optional<Resident> findByEmail(String email);
	
//	public Resident findByName(String email);
}
