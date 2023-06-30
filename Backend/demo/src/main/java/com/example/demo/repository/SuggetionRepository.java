package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Resident;
import com.example.demo.entity.Suggetion;
@Repository
public interface SuggetionRepository extends JpaRepository<Suggetion, Long>{

	List<Suggetion> findByResident(Resident resident);

}
