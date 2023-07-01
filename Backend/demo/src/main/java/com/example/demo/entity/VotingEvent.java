package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

	@Column(unique = true)
	private String postname;

	private LocalDateTime startTime;

	private LocalDateTime endTime;

	private String description;

	private String status;
}
