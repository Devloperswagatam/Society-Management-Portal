package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.ImageData;
@Repository
public interface StorageRepository extends JpaRepository<ImageData, Long>{
	Optional<ImageData> findByName(String fileName);
	Optional<ImageData> findById(Long id);
}
