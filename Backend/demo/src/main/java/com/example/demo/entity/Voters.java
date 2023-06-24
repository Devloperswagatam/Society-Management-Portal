package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Voters {
	@Id
	private Integer rid;
	
	@OneToOne
	@JoinColumn(name = "rid")
	private Resident resident;
	
	@NotNull(message = "Date is mandatory")
	private String date;
	
	@NotNull(message = "Voting is mandatory")
	private Boolean hasVoted;
	
}
