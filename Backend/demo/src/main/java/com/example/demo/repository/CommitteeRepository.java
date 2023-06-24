package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Committee;

@Repository
public interface CommitteeRepository extends JpaRepository<Committee, Integer>{
	
}
