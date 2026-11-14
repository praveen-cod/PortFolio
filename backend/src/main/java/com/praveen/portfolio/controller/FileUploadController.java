package com.praveen.portfolio.controller;

import com.praveen.portfolio.dto.ApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
public class FileUploadController {

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    /**
     * POST /api/upload/profile-image
     * Accepts multipart image, saves to uploads/ folder, returns URL
     */
    @PostMapping("/profile-image")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadProfileImage(
            @RequestParam("file") MultipartFile file) {
        try {
            // Validate file type
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error("Only image files are allowed"));
            }

            // Validate file size (max 5MB)
            if (file.getSize() > 5 * 1024 * 1024) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error("File size must be less than 5MB"));
            }

            // Create uploads directory if it doesn't exist
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate unique filename
            String originalName = file.getOriginalFilename();
            String extension = "";
            if (originalName != null && originalName.contains(".")) {
                extension = originalName.substring(originalName.lastIndexOf("."));
            }
            String fileName = "profile_" + UUID.randomUUID().toString().substring(0, 8) + extension;

            // Save file
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            String fileUrl = "/uploads/" + fileName;
            System.out.println("📸 Profile image uploaded: " + fileName);

            Map<String, String> data = Map.of(
                    "url", fileUrl,
                    "filename", fileName,
                    "message", "Profile image uploaded successfully");

            return ResponseEntity.ok(ApiResponse.success("Image uploaded successfully", data));

        } catch (IOException e) {
            return ResponseEntity.status(500)
                    .body(ApiResponse.error("Failed to upload image: " + e.getMessage()));
        }
    }

    /**
     * DELETE /api/upload/profile-image
     * Removes current profile image
     */
    @DeleteMapping("/profile-image")
    public ResponseEntity<ApiResponse<String>> deleteProfileImage(@RequestParam String filename) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(filename);
            boolean deleted = Files.deleteIfExists(filePath);
            if (deleted) {
                return ResponseEntity.ok(ApiResponse.success("Image deleted", "OK"));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Failed to delete: " + e.getMessage()));
        }
    }
}
