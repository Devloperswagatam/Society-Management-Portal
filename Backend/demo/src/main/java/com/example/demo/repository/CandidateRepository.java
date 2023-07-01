package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Candidate;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Integer> {

	boolean existsByridAndVotingEventVotingId(Integer rid, Integer votingId);

	Optional<Candidate> findByridAndVotingEventVotingId(Integer rid, Integer votingId);

}
