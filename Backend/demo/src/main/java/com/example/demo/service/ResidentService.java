package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Resident;
import com.example.demo.exception.ResidentException;

public interface ResidentService {
	public Resident addResident(Resident resident)throws ResidentException;
	public Resident updateResident(Resident resident)throws ResidentException;
	public List<Resident> viewAllResidents()throws ResidentException;	
}
