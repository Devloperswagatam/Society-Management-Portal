package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Complaint;
@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long>{

}
