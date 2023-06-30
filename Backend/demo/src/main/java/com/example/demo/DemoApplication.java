package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import com.example.demo.entity.Resident;
import com.example.demo.service.EmailSenderService;
import com.example.demo.service.ResidentService;

@SpringBootApplication
@EnableScheduling
public class DemoApplication {
	
	@Autowired
	private EmailSenderService emailSenderService;
	
	@Autowired
	private ResidentService residentService;
	
	
	

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
		System.out.println("Runninggg.......");
	}
	
	
	@Scheduled(fixedRate = 10000)
	@EventListener(ApplicationReadyEvent.class)
	public void sendMail() {
	    try {
	        List<Resident> residents = residentService.viewAllResidents();
	        for (Resident resident : residents) {
	            emailSenderService.sendEmail(resident.getEmail(),
	                    "Maintenance Due",
	                    "Dear Mr. "+resident.getName()+", your last month's maintenance is due. Please pay before the deadline.");
	        }
	    } catch (Exception e) {
	        // Handle any exceptions that occur during sending emails
	        e.printStackTrace();
	    }
	}

}
