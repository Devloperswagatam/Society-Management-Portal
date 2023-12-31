package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Voters;

@Repository
public interface VotersRepository extends JpaRepository<Voters, Integer>{
	boolean existsByridAndVotingEventVotingId(Integer rid, Integer votingId);
}
