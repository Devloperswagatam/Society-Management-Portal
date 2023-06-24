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
	@GeneratedValue(strategy = GenerationType.AUTO)
//	@OneToMany
	private Integer rid;
	
	@NotNull(message = "First name is mandatory")
	private String Fname;
	
	@NotNull(message = "Last name is mandatory")
	private String Lname;
	
	@NotNull(message = "Phone number is mandatory")
	@Size(max = 10,min = 10, message = "Require only 10 digit")
	private String phoneNumber;
	
	@NotNull(message = "Email is mandatory")
	@Email(message = "Require email format")
	private String email;
	
	@NotNull(message = "Wing number is mandatory")
	private Integer WingNo;
	
	@NotNull(message = "Flat number is mandatory")
	private Integer FlatNo;
	
	@NotNull(message = "Floor number is mandatory")
	private Integer FloorNo;
	
	@NotNull(message = "Member count is mandatory")
	private Integer MemberCount;
}
