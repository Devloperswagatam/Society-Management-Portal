package com.example.demo.AppSecurity.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.AppSecurity.model.CustomUserDetails;
import com.example.demo.entity.Resident;
import com.example.demo.repository.ResidentRepository;

@Service
public class CustomUserDetailService implements UserDetailsService {

	@Autowired
	private ResidentRepository residentRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Resident resident = residentRepository.findByEmail(username);

		if (resident == null) {
			throw new UsernameNotFoundException("User not found !!");
		} else {
			return new CustomUserDetails(resident);
		}
	}

}
