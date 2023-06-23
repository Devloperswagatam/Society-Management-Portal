package com.example.demo.service;

import com.example.demo.entity.Resident;
import com.example.demo.exception.ResidentException;

public interface ResidentService {
	public Resident addResident(Resident resident)throws ResidentException;
	public Resident updateResident(Resident resident)throws ResidentException; 
}
