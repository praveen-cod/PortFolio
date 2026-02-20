package com.praveen.portfolio.controller;

import com.praveen.portfolio.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

    /**
     * GET /api/portfolio — Returns all portfolio data as JSON
     */
    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getPortfolioData() {
        Map<String, Object> portfolio = new HashMap<>();
        portfolio.put("name", "Praveen K");
        portfolio.put("title", "Aspiring IT Professional | Flutter & Java Developer");
        portfolio.put("email", "praveenkth530@gmail.com");
        portfolio.put("phone", "6381945199");
        portfolio.put("location", "Chennai, Tamil Nadu");
        portfolio.put("github", "https://github.com/praveen-cod");
        portfolio.put("linkedin", "https://linkedin.com/in/praveen-k-994698302");
        portfolio.put("cgpa", 8.87);
        portfolio.put("leetcode", 260);
        portfolio.put("universityRank", "3rd Rank - 2nd Semester");
        portfolio.put("skills",
                List.of("Java", "Flutter", "Dart", "React.js", "FastAPI", "Python", "MySQL", "MongoDB", "Git"));
        portfolio.put("certifications", List.of(
                "Data Structures & Algorithms using Java - NPTEL",
                "Java Basics - SoloLearn",
                "Flutter Basics - Infosys SpringBoard",
                "Dart Basics - Infosys SpringBoard"));
        portfolio.put("achievements", List.of(
                "University 3rd Rank - 2nd Semester (₹10,000 Cash Award)",
                "Gen-Trix Hackathon Finalist - St. Joseph's College of Engineering",
                "260+ LeetCode DSA Problems Solved"));

        return ResponseEntity.ok(ApiResponse.success("Portfolio data retrieved", portfolio));
    }

    /**
     * GET /api/portfolio/health — Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<ApiResponse<Map<String, String>>> health() {
        Map<String, String> status = new HashMap<>();
        status.put("status", "UP");
        status.put("service", "Praveen K Portfolio API");
        status.put("version", "1.0.0");
        return ResponseEntity.ok(ApiResponse.success("API is running!", status));
    }
}
