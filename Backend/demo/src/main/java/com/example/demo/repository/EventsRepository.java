package com.example.demo.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Event_Schedule;

@Repository
public interface EventsRepository extends JpaRepository<Event_Schedule, Integer>{

}
