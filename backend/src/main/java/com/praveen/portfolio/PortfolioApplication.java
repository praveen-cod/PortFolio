package com.praveen.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PortfolioApplication {
    public static void main(String[] args) {
        SpringApplication.run(PortfolioApplication.class, args);
        System.out.println("\n" +
            "╔══════════════════════════════════════════════╗\n" +
            "║   🚀 Praveen K Portfolio API - RUNNING!      ║\n" +
            "║   🌐 API: http://localhost:8080/api          ║\n" +
            "║   🗄️  H2:  http://localhost:8080/h2-console  ║\n" +
            "╚══════════════════════════════════════════════╝\n");
    }
}
