package com.example.demo.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
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
@DynamicUpdate
@Entity
public class Voters {
	@Id
	private Integer rid;
	
	@JsonIgnore
	@OneToOne
	@MapsId
	@JoinColumn(name = "rid", referencedColumnName = "rid")
	private Resident resident;
	
	@ManyToOne
    @JoinColumn(name = "voting_id")
    private VotingEvent votingEvent;
	
	@NotNull(message = "Date is mandatory")
	private LocalDateTime date;
	
	@NotNull(message = "Voting is mandatory")
	private Boolean hasVoted;
	
}
