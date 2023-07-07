package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Suggetion;
import com.example.demo.exception.ResidentException;
import com.example.demo.exception.SuggetionException;

public interface SuggestionService {
	List<Suggetion> getSuggestionByResidentId(Integer residentId) throws SuggetionException, ResidentException;
	public List<Suggetion> getAllSuggestions();
	Suggetion createSuggetion(Suggetion suggestion) throws SuggetionException, ResidentException;
	Suggetion updateStatus(Long sid) throws  ResidentException, SuggetionException;
}
