package com.example.demo.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Event_Schedule;
import com.example.demo.entity.Resident;
import com.example.demo.entity.VotingEvent;
import com.example.demo.exception.EventsException;
import com.example.demo.exception.ResidentException;
import com.example.demo.repository.EventsRepository;
import com.example.demo.repository.ResidentRepository;

@Service
public class EventServiceImpl implements EventService {

	@Autowired
	private EventsRepository eventsRepository;

	@Autowired
	private ResidentRepository residentRepo;

	@Autowired
	private EmailSenderService emailSenderService;

	@Override
	public Event_Schedule addEvent(Event_Schedule event) throws EventsException {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();

		Resident existResident = residentRepo.findByEmail(username);

		if (event == null) {
			throw new EventsException("Event is null");
		}

		List<Event_Schedule> events = eventsRepository.findAll();
		for (Event_Schedule oldEvent : events) {
			if (hasTimeCollision(event, oldEvent)) {
				throw new EventsException("New event clashes with an existing event");
			}
		}

		event.addResidentToOrganizerTeam(existResident);
		event.setStatus("open");

		// Sending event confermation through mail

		// for(Resident organizer : event.getOrganizerTeam()) {
		// emailSenderService.sendEmail(organizer.getEmail(),
		// "Event Schedule Confirmation",
		// "Dear "+organizer.getName()+" You have been added to the organizer team for
		// the "+event.getEName()+" Event.");
		// }

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
		if (existEvents.size() == 0) {
			throw new EventsException("Events List is empty");
		}
		return existEvents;
	}

	@Override
	public void addResidentToOrganizerTeam(Integer eid) throws ResidentException, EventsException {
		Event_Schedule eventSchedule = eventsRepository.findById(eid)
				.orElseThrow(() -> new EventsException("Invalid event ID"));

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();

		Resident existResident = residentRepo.findByEmail(username);
		for (Resident organizer : eventSchedule.getOrganizerTeam()) {
			if (existResident.getRid().equals(organizer.getRid())) {
				throw new EventsException("Already a organizer !!");
			}
		}

		eventSchedule.addResidentToOrganizerTeam(existResident);

		// Sending event confirmation via mail
		// emailSenderService.sendEmail(existResident.getEmail(),
		// "Event Schedule Confirmation",
		// "Dear "+existResident.getName()+" You have been added to the organizer team
		// for the "+eventSchedule.getEName()+" event on
		// "+eventSchedule.getStartTime()+".");

		eventsRepository.save(eventSchedule);
	}

	@Override
	public List<Resident> getOrganizersByEventId(Integer eid) throws EventsException, ResidentException {
		Event_Schedule eventSchedule = eventsRepository.findById(eid)
				.orElseThrow(() -> new EventsException("Invalid event ID"));

		return eventSchedule.getOrganizerTeam();
	}

	@Override
	public void automaticallyCloseEvents() {
		List<Event_Schedule> openEvents = eventsRepository.findByStatus("open");
		LocalDateTime currentTime = LocalDateTime.now();

		for (Event_Schedule event : openEvents) {
			if (currentTime.isAfter(event.getEndTime())) {
				event.setStatus("closed");
				eventsRepository.save(event);
				System.out.println("Event closed successfully !!");
			}
		}
	}

	@Override
	public void removeOrganizer(Integer eid) throws EventsException, ResidentException {
		Event_Schedule eventSchedule = eventsRepository.findById(eid)
				.orElseThrow(() -> new EventsException("Invalid event ID"));

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();

		Resident existResident = residentRepo.findByEmail(username);
		List<Resident> organizers = getOrganizersByEventId(eid);

		boolean isExistResidentOrganizer = false;

		for (Resident organizer : organizers) {
			if (existResident.equals(organizer)) {
				isExistResidentOrganizer = true;
				break;
			}
		}

		if (!isExistResidentOrganizer) {
			throw new ResidentException("You can only remove yourself as an organizer.");
		}

		organizers.remove(existResident);
		eventSchedule.setOrganizerTeam(organizers);
		eventsRepository.save(eventSchedule);
	}

	@Override
	public Event_Schedule updateEvent(Event_Schedule event) throws EventsException, ResidentException {
		Event_Schedule eventSchedule = eventsRepository.findById(event.getEid())
				.orElseThrow(() -> new EventsException("Invalid event ID"));

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();

		Resident existResident = residentRepo.findByEmail(username);
		List<Resident> organizers = getOrganizersByEventId(event.getEid());

		boolean isExistResidentOrganizer = false;

		for (Resident organizer : organizers) {
			if (existResident.equals(organizer)) {
				isExistResidentOrganizer = true;
				break;
			}
		}

		if (!isExistResidentOrganizer) {
			throw new ResidentException("Only the organizer can edit");
		}

		if(eventSchedule.getStatus().equals("closed")){
			throw new EventsException("Event is already closed");
		}

		eventSchedule.setEName(event.getEName());
		eventSchedule.setBudget(event.getBudget());
		eventSchedule.setDescription(event.getDescription());
		eventSchedule.setEndTime(event.getEndTime());
		eventSchedule.setStartTime(event.getStartTime());

		return eventsRepository.save(eventSchedule);
	}

}
