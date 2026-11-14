package com.praveen.portfolio.repository;

import com.praveen.portfolio.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {

    List<ContactMessage> findAllByOrderByCreatedAtDesc();

    List<ContactMessage> findByReadFalseOrderByCreatedAtDesc();

    @Query("SELECT COUNT(c) FROM ContactMessage c WHERE c.read = false")
    long countUnread();

    boolean existsByEmail(String email);
}
