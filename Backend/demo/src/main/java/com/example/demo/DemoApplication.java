package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import com.example.demo.entity.Accounts;
import com.example.demo.entity.Resident;
import com.example.demo.exception.CommitteeException;
import com.example.demo.repository.AccountsRepository;
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
	private AccountService accountService;

	@Autowired
	private CommitteeService committeeService;
	
	@Autowired
	private VotingEventService votingEventService;

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
		System.out.println("Runninggg.......");
	}
	
//	@Scheduled(fixedDelay = 60000)
	@EventListener(ApplicationReadyEvent.class)
	public void addCommittee() throws CommitteeException {

		committeeService.addCommittee();

	}
	
	@Scheduled(fixedDelay = 60000)
	@EventListener(ApplicationReadyEvent.class)
	public void removeCandidate() {
		votingEventService.removeCandidate();
	}

//	@Scheduled(fixedRate = 10000)
//	@EventListener(ApplicationReadyEvent.class)
//	public void sendMail() {
//		try {
//			
//			//Get all the residents
//			List<Resident> residents = residentService.viewAllResidents();
//			
//			//visit individual resident
//			for (Resident resident : residents) {
//				
//				//Get all the accounts of each resident
//				List<Accounts> allAccounts = accountService.getAccountsByResidentId(resident.getRid());
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

}
