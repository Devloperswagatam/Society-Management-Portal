package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Accounts;
import com.example.demo.entity.Resident;

public interface AccountsRepository extends JpaRepository<Accounts, Integer>{
	List<Accounts> findByResident(Resident resident);
}
