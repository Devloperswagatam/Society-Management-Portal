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
public class Candidate {
	@Id
	private Integer rid;
	
	@OneToOne
	@JoinColumn(name = "rid")
	private Resident resident;
	
	@NotNull(message = "Post name is mandatory")
	private String postName;
	
	@NotNull(message = "Number of votes is mandatory")
	private Integer numberOfVotes;
}
