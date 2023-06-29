package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
	
	@NotNull(message = "Email is mandatory")
	@Email(message = "Require email format")
	private String email;
	
	@NotNull(message = "Password is mandatory")
	private String password;
	
	@NotNull(message = "Wing number is mandatory")
	private Integer wingNo;
	
	@NotNull(message = "Flat number is mandatory")
	private Integer flatNo;
	
	@NotNull(message = "Floor number is mandatory")
	private Integer floorNo;
	
	@NotNull(message = "Member count is mandatory")
	private Integer memberCount;
	
	@NotNull(message = "Role is mandatory")
	private String role;
}
