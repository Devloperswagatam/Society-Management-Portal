package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.VotingEvent;

@Repository
public interface VotingEventRepository extends JpaRepository<VotingEvent, Integer>{
	public List<VotingEvent> findByStatus(String status);
}
