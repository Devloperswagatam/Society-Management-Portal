package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.entity.Bulletin;

@Repository
public interface BulletinRepository extends JpaRepository<Bulletin, Integer>{
	
}
