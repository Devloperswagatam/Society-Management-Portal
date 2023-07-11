package com.example.demo.entity;

import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@DynamicUpdate
@Entity
public class Resident {
	@Id
	@GeneratedValue
	private Integer rid;
	
	@NotNull(message = "Name is mandatory")
	private String name;
	
	@NotNull(message = "Phone number is mandatory")
	@Size(max = 10,min = 10, message = "Require only 10 digit")
	private String phoneNumber;
	
	@Column(unique = true)
	@NotNull(message = "Email is mandatory")
	@Email(message = "Require email format")
	private String email;
	
//	@JsonIgnore
	@NotNull(message = "Password is mandatory")
	private String password;
	
	@NotNull(message = "Wing number is mandatory")
	private String wingNo;
	
	@NotNull(message = "Flat number is mandatory")
	private String flatNo;
	
	@NotNull(message = "Floor number is mandatory")
	private String floorNo;
	
	@NotNull(message = "Member count is mandatory")
	private Integer memberCount;
	
	@NotNull(message = "Role is mandatory")
	private String role;
}
