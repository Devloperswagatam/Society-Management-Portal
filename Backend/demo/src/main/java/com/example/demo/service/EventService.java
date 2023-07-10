package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Event_Schedule;
import com.example.demo.entity.Resident;
import com.example.demo.exception.EventsException;
import com.example.demo.exception.ResidentException;

public interface EventService {
	Event_Schedule addEvent(Event_Schedule event) throws EventsException;

	List<Event_Schedule> viewEvent() throws EventsException;

	public void addResidentToOrganizerTeam(Integer eid) throws ResidentException, EventsException;

	public List<Resident> getOrganizersByEventId(Integer eid) throws EventsException, ResidentException;

	public void automaticallyCloseEvents();

	public void removeOrganizer(Integer eid) throws EventsException, ResidentException;
}
