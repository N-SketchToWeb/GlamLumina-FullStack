package com.example.glamlumina.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.glamlumina.entity.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}

