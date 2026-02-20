package com.praveen.portfolio.controller;

import com.praveen.portfolio.dto.ApiResponse;
import com.praveen.portfolio.dto.ContactRequest;
import com.praveen.portfolio.model.ContactMessage;
import com.praveen.portfolio.service.ContactService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    /**
     * POST /api/contact — Submit a new contact message
     */
    @PostMapping
    public ResponseEntity<ApiResponse<ContactMessage>> submitMessage(
            @RequestBody ContactRequest request) {
        try {
            // Basic validation
            if (request.getName() == null || request.getName().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error("Name is required"));
            }
            if (request.getEmail() == null || !request.getEmail().contains("@")) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error("Valid email is required"));
            }
            if (request.getMessage() == null || request.getMessage().trim().length() < 10) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error("Message must be at least 10 characters"));
            }

            ContactMessage saved = contactService.saveMessage(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success("Message sent successfully! I'll get back to you soon.", saved));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to send message: " + e.getMessage()));
        }
    }

    /**
     * GET /api/contact — Get all messages (admin)
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<ContactMessage>>> getAllMessages() {
        List<ContactMessage> messages = contactService.getAllMessages();
        return ResponseEntity.ok(ApiResponse.success("Messages retrieved", messages));
    }

    /**
     * GET /api/contact/unread — Get unread messages
     */
    @GetMapping("/unread")
    public ResponseEntity<ApiResponse<List<ContactMessage>>> getUnreadMessages() {
        List<ContactMessage> messages = contactService.getUnreadMessages();
        return ResponseEntity.ok(ApiResponse.success("Unread messages retrieved", messages));
    }

    /**
     * GET /api/contact/stats — Get message statistics
     */
    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getStats() {
        Map<String, Long> stats = Map.of(
                "total", contactService.getTotalCount(),
                "unread", contactService.getUnreadCount());
        return ResponseEntity.ok(ApiResponse.success("Stats retrieved", stats));
    }

    /**
     * PATCH /api/contact/{id}/read — Mark message as read
     */
    @PatchMapping("/{id}/read")
    public ResponseEntity<ApiResponse<ContactMessage>> markAsRead(@PathVariable Long id) {
        Optional<ContactMessage> msg = contactService.markAsRead(id);
        return msg.map(m -> ResponseEntity.ok(ApiResponse.success("Marked as read", m)))
                .orElse(ResponseEntity.notFound().build());
    }
}
