package com.example.glamlumina.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.glamlumina.entity.Contact;
import com.example.glamlumina.repository.ContactRepository;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @PostMapping("/send")
    public Contact saveMessage(@RequestBody Contact contact) {
        return contactRepository.save(contact);
    }
}

