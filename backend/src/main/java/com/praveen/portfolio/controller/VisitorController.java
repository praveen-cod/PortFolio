package com.praveen.portfolio.controller;

import com.praveen.portfolio.dto.ApiResponse;
import com.praveen.portfolio.service.VisitorService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/visitors")
public class VisitorController {

    private final VisitorService visitorService;

    public VisitorController(VisitorService visitorService) {
        this.visitorService = visitorService;
    }

    /**
     * POST /api/visitors — Record a page visit
     */
    @PostMapping
    public ResponseEntity<ApiResponse<Map<String, Long>>> recordVisit(HttpServletRequest request) {
        String ipAddress = getClientIp(request);
        String userAgent = request.getHeader("User-Agent");
        long total = visitorService.recordVisit(ipAddress, userAgent);
        Map<String, Long> data = Map.of("totalVisitors", total);
        return ResponseEntity.ok(ApiResponse.success("Visit recorded", data));
    }

    /**
     * GET /api/visitors — Get total visitor count
     */
    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Long>>> getVisitorCount() {
        long total = visitorService.getTotalVisitors();
        Map<String, Long> data = Map.of("totalVisitors", total);
        return ResponseEntity.ok(ApiResponse.success("Visitor count retrieved", data));
    }

    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip != null ? ip.split(",")[0].trim() : "unknown";
    }
}
