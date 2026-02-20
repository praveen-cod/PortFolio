package com.praveen.portfolio.service;

import com.praveen.portfolio.dto.ContactRequest;
import com.praveen.portfolio.model.ContactMessage;
import com.praveen.portfolio.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

    private final ContactMessageRepository repository;

    public ContactService(ContactMessageRepository repository) {
        this.repository = repository;
    }

    public ContactMessage saveMessage(ContactRequest request) {
        ContactMessage msg = new ContactMessage();
        msg.setName(request.getName());
        msg.setEmail(request.getEmail());
        msg.setSubject(request.getSubject());
        msg.setMessage(request.getMessage());
        ContactMessage saved = repository.save(msg);
        System.out.println("📬 New message from: " + saved.getName() + " <" + saved.getEmail() + ">");
        return saved;
    }

    public List<ContactMessage> getAllMessages() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    public List<ContactMessage> getUnreadMessages() {
        return repository.findByReadFalseOrderByCreatedAtDesc();
    }

    public long getUnreadCount() {
        return repository.countUnread();
    }

    public Optional<ContactMessage> markAsRead(Long id) {
        return repository.findById(id).map(msg -> {
            msg.setRead(true);
            return repository.save(msg);
        });
    }

    public long getTotalCount() {
        return repository.count();
    }
}
