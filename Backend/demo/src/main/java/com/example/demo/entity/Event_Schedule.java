package com.example.demo.entity;

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
public class Events {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer eid;
	
	@NotNull(message = "Place is mandatory")
	private String place;
	
	@NotNull(message = "Budget is mandatory")
	private Double budget;
	
	@NotNull(message = "Time is mandatory")
	private String time;
	
	@NotNull(message = "Date is mandatory")
	private String date;
	
	@NotNull(message = "Description is mandatory")
	private String description;
	
}
