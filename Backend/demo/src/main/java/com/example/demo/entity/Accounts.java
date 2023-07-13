package com.example.demo.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.DynamicUpdate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class Accounts {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer billNo;
	
	// @JsonIgnore
	@ManyToOne()
	@JoinColumn(name = "rid", referencedColumnName = "rid")
	private Resident resident;
	
	@NotNull(message = "Amount is must")
	private Double amount;
	
	@NotNull(message = "Date is must")
	private LocalDateTime date;
	
	@Column(length = 10)
	@NotNull(message = "Status is must")
	private String status;
}
