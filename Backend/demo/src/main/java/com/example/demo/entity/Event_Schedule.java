package com.example.demo.entity;


import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
public class Event_Schedule {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer eid;
	
	@NotNull(message = "Event name is mandatory")
	private String eName;
	
	@NotNull(message = "Place is mandatory")
	private String place;
	
	@NotNull(message = "Budget is mandatory")
	private Double budget;
	
	@NotNull(message = "Start Time is mandatory")
	private LocalTime startTime;
	
	@NotNull(message = "End Time is mandatory")
	private LocalTime endTime;
	
	@NotNull(message = "Start Date is mandatory")
	private LocalDate startDate;
	
	@NotNull(message = "End Date is mandatory")
	private LocalDate endDate;
	
	@NotNull(message = "Description is mandatory")
	private String description;
	
	@OneToMany(targetEntity = Resident.class)
	private List<Resident> organizerTeam = new ArrayList<>();
	
	
	public void addResidentToOrganizerTeam(Resident resident) {
	    organizerTeam.add(resident);
	}
	
}
