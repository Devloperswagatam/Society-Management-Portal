package com.example.demo.entity;

import java.time.LocalDateTime;
import java.time.Year;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class VotingEvent {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer votingId;

	@NotNull(message = "Post name is required")
	@Column(unique = true)
	private String postname;

	@NotNull(message = "Start time is required")
	private LocalDateTime startTime;

	@NotNull(message = "End time is required")
	private LocalDateTime endTime;
	
	@NotNull(message = "Year is required")
	private Year year;

	@NotNull(message = "Description is required")
	private String description;

	@NotNull(message = "Status is required")
	private String status;
	
	@NotNull(message = "Number of candidates is required")
	private Integer numberofcandidates;
}
