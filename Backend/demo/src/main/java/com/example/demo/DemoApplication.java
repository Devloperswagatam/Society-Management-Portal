package com.example.demo;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import com.example.demo.controller.ComplaintController;
import com.example.demo.entity.Accounts;
import com.example.demo.entity.Resident;
import com.example.demo.exception.CommitteeException;
import com.example.demo.repository.AccountsRepository;
import com.example.demo.repository.ResidentRepository;
import com.example.demo.service.AccountService;
import com.example.demo.service.CommitteeService;
import com.example.demo.service.EmailSenderService;
import com.example.demo.service.ResidentService;
import com.example.demo.service.VotingEventService;


@SpringBootApplication
@EnableScheduling
public class DemoApplication {

	@Autowired
	private EmailSenderService emailSenderService;

	@Autowired
	private ResidentService residentService;
	
	@Autowired
	private ResidentRepository residentRepository;

	@Autowired
	private AccountService accountService;
	
	@Autowired
	private AccountsRepository accountsRepository;

	@Autowired
	private CommitteeService committeeService;
	
	@Autowired
	private VotingEventService votingEventService;

	public static void main(String[] args) {
		new File(ComplaintController.uploadDirectory).mkdir();
		SpringApplication.run(DemoApplication.class, args);
		System.out.println("Runninggg.......");
		
	}


//	@Scheduled(fixedRate = 300000) //cron expression for every month's 1st day at 1:00 AM ("0 0 1 1 * ?")
////	@EventListener(ApplicationReadyEvent.class)
//	public void sendMail() {
//		try {
//			
//			//Get all the residents
//			List<Resident> residents = residentRepository.findAll();
//			
//			//visit individual resident
//			for (Resident resident : residents) {
//				
//				//Get all the accounts of each resident
//				List<Accounts> allAccounts = accountsRepository.findByResident(resident);
//				
//				//visit each account
//				for (Accounts account : allAccounts) {
//					
//					//condition
//					if (account.getStatus().equals("pending")) {
//						
//						//sending email
//						emailSenderService.sendEmail(resident.getEmail(), "Maintenance Due",
//								"Dear " + resident.getName() + ", your " + account.getDate().minusMonths(1).getMonth()
//										+ " month's maintenance " + account.getAmount()
//										+ " rupees is due. Please pay before the deadline.");
//
//					}
//				}
//
//			}
//		} catch (Exception e) {
//			// Handle any exceptions that occur during sending emails
//			e.printStackTrace();
//		}
//	}
	
	
//	@Scheduled(fixedRate = 300000) // (cron = "0 0 0 1 * ?") for every months 1st day at 12:00 AM
//    public void createAccountScheduled() {
//        try {
//            // Retrieve all residents
//            List<Resident> residents = residentRepository.findAll();
//
//            // Create account for each resident
//            for (Resident resident : residents) {
//            	accountService.createAccount(resident);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new IllegalArgumentException("Error at account creation "+e.getMessage());
//        }
//    }
	

	@Scheduled(fixedRate = 30000)
	public void automaticallyCloseVotingEvents() {
		votingEventService.automaticallyCloseVotingEvents();
	}
	
	
	@Scheduled(fixedRate = 60000)
	public void addCommittee() throws CommitteeException {

		committeeService.addCommittee();

	}
	
	@Scheduled(fixedRate = 60000)
	public void removeCandidate() {
		votingEventService.removeCandidate();
	}

}
