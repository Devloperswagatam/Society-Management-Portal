package com.example.demo.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Event_Schedule;
import com.example.demo.entity.Resident;
import com.example.demo.exception.EventsException;
import com.example.demo.exception.ResidentException;
import com.example.demo.repository.EventsRepository;
import com.example.demo.repository.ResidentRepository;

@Service
public class EventServiceImpl implements EventService{
	
	@Autowired
	private EventsRepository eventsRepository;
	
	@Autowired
	private ResidentRepository residentRepo;
	
	@Autowired
	private EmailSenderService  emailSenderService;

	@Override
	public Event_Schedule addEvent(Event_Schedule event) throws EventsException {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		
		Resident existResident = residentRepo.findByEmail(username);
		
		
		if(event == null) {
			throw new EventsException("Event is null");
		}
		
		List<Event_Schedule> events = eventsRepository.findAll();
		for(Event_Schedule oldEvent : events) {
			if (hasTimeCollision(event, oldEvent)) {
	            throw new EventsException("New event clashes with an existing event");
	        }
		}
		
		
		
		
		event.addResidentToOrganizerTeam(existResident);
		
		
		//Sending event confermation through mail
		
		for(Resident organizer : event.getOrganizerTeam()) {
			emailSenderService.sendEmail(organizer.getEmail(),
										"Event Schedule Confirmation",
										"Dear "+organizer.getName()+" You have been added to the organizer team for the "+event.getEName()+" Event.");
		}
		
		
		
		return eventsRepository.save(event);
	}
	
	
	private boolean hasTimeCollision(Event_Schedule newEvent, Event_Schedule oldEvent) {
	    // Compare start and end times
	    if (newEvent.getStartTime().isBefore(oldEvent.getEndTime()) &&
	            newEvent.getEndTime().isAfter(oldEvent.getStartTime())) {
	        return true; // Collision detected
	    }
	    
	    // No collision
	    return false;
	}
	
	
	
	

	@Override
	public List<Event_Schedule> viewEvent() throws EventsException {
		List<Event_Schedule> existEvents = eventsRepository.findAll();
		if(existEvents.size() == 0) {
			throw new EventsException("Events List is empty");
		}
		return existEvents;
	}

	@Override
	public void addResidentToOrganizerTeam(Integer eid, Resident resident) throws ResidentException {
		Event_Schedule eventSchedule = eventsRepository.findById(eid).orElseThrow(() -> new IllegalArgumentException("Invalid event ID"));
		
		Resident existResident = residentRepo.findByEmail(resident.getEmail());
		if(existResident == null) {
			System.out.println("Resident dont exist");
		}

		eventSchedule.addResidentToOrganizerTeam(existResident);
		
		//Sending event confirmation via mail
		emailSenderService.sendEmail(existResident.getEmail(),
				"Event Schedule Confirmation",
				"Dear "+existResident.getName()+" You have been added to the organizer team for the "+eventSchedule.getEName()+" Event.");
		
		
		eventsRepository.save(eventSchedule);
	}

	@Override
	public List<Resident> getOrganizersByEventId(Integer eid) throws EventsException, ResidentException {
		Event_Schedule eventSchedule = eventsRepository.findById(eid)
                .orElseThrow(() -> new IllegalArgumentException("Invalid event ID"));

        return eventSchedule.getOrganizerTeam();
	}

	

}
