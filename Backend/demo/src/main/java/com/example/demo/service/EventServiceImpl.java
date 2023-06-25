package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

	@Override
	public Event_Schedule addEvent(Event_Schedule event) throws EventsException {
		if(event == null) {
			throw new EventsException("Event is null");
		}
		return eventsRepository.save(event);
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
		
		eventsRepository.save(eventSchedule);
	}

	@Override
	public List<Resident> getOrganizersByEventId(Integer eid) throws EventsException, ResidentException {
		Event_Schedule eventSchedule = eventsRepository.findById(eid)
                .orElseThrow(() -> new IllegalArgumentException("Invalid event ID"));

        return eventSchedule.getOrganizerTeam();
	}

	

}
