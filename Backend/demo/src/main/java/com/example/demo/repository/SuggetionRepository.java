package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Suggetion;
@Repository
public interface SuggetionRepository extends JpaRepository<Suggetion, Long>{

}
