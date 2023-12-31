package com.example.demo.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.DynamicUpdate;

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

public class Complaint {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long cid;
	
	@ManyToOne
	@JoinColumn(name = "rid",referencedColumnName = "rid")
	private Resident resident;
	
	@NotNull(message = "title is Mandatory")
    private String title;
	
	@NotNull(message = "description is Mandatory")
    private String description;
	
	@NotNull(message = "date is Mandatory")
    private LocalDateTime date;
	
	@NotNull(message = "status is Mandatory")
    private String status;
}
