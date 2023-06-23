package com.example.demo.entity;

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
public class Resident {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer RID;
	private String Fname;
	private String Lname;
	private Integer WingNo;
	private Integer FlatNo;
	private Integer FloorNo;
	private Integer MemberCount;
}
