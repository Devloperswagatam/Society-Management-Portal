package com.example.demo.repository;

import java.time.Year;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.VotingEvent;

@Repository
public interface VotingEventRepository extends JpaRepository<VotingEvent, Integer>{
	public List<VotingEvent> findByStatus(String status);
	
	public List<VotingEvent> findByYearAndStatus(Year year,String status);
}
