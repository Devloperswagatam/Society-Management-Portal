package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Event_Schedule;
import com.example.demo.entity.Resident;
import com.example.demo.exception.EventsException;
import com.example.demo.exception.ResidentException;
import com.example.demo.service.EventService;

@RestController
@RequestMapping("/events")
public class EventController {
	@Autowired
	private EventService eventService;
	
	
	@GetMapping("/event")
	public ResponseEntity<List<Event_Schedule>> viewAllEvents() throws EventsException{
		return new ResponseEntity<List<Event_Schedule>>(eventService.viewEvent(),HttpStatus.OK);
	}
	
	@PostMapping("/event")
	public ResponseEntity<Event_Schedule> addEvent(@RequestBody Event_Schedule event) throws EventsException{
		return new ResponseEntity<Event_Schedule>(eventService.addEvent(event),HttpStatus.CREATED);
	}
	
	@PostMapping("/organizer/{eid}")
	public ResponseEntity<String> addResidentToOrganizerTeam(@PathVariable Integer eid, @RequestBody Resident resident) throws ResidentException{
		eventService.addResidentToOrganizerTeam(eid, resident);
		return new ResponseEntity<String>("Resident added to organizer team successfully.",HttpStatus.CREATED);
	}
	
	@GetMapping("/organizer/{eid}")
    public ResponseEntity<List<Resident>> getOrganizersByEventId(@PathVariable Integer eid) throws EventsException, ResidentException{
        return new ResponseEntity<List<Resident>>(eventService.getOrganizersByEventId(eid),HttpStatus.OK);
    }
}
