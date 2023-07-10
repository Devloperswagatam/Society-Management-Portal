package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Complaint;
import com.example.demo.exception.ComplaintException;
import com.example.demo.exception.ResidentException;

public interface ComplaintService {
	List<Complaint> getComplaintsByResidentId(Integer residentId) throws ComplaintException, ResidentException;
	Complaint createComplaint(Complaint complaint) throws ComplaintException, ResidentException ;
	Complaint updateStatus(Long id) throws  ResidentException, ComplaintException;
	List<Complaint> getAllComplaints();
	
}