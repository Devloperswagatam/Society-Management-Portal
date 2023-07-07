package com.example.demo.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
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
	
//	@JsonIgnore
	@OneToOne
	@MapsId
	@JoinColumn(name = "rid",referencedColumnName = "rid")
	private Resident resident;
	
	@ManyToOne
    @JoinColumn(name = "voting_id")
    private VotingEvent votingEvent;
	
	
	@NotNull(message = "Post name is mandatory")
	private String postName;
	
	@NotNull(message = "Number of votes is mandatory")
	private Integer numberOfVotes;
}
