package com.example.demo.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@Entity
public class Voters {
	@Id
	private Integer rid;
	
	@JsonIgnore
	@OneToOne
	@MapsId
	@JoinColumn(name = "rid", referencedColumnName = "rid")
	private Resident resident;
	
	@NotNull(message = "Date is mandatory")
	private LocalDateTime date;
	
	@NotNull(message = "Voting is mandatory")
	private Boolean hasVoted;
	
}
