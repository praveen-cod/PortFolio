package com.praveen.portfolio.service;

import com.praveen.portfolio.model.VisitorStat;
import com.praveen.portfolio.repository.VisitorStatRepository;
import org.springframework.stereotype.Service;

@Service
public class VisitorService {

    private final VisitorStatRepository repository;

    public VisitorService(VisitorStatRepository repository) {
        this.repository = repository;
    }

    public long recordVisit(String ipAddress, String userAgent) {
        VisitorStat stat = new VisitorStat();
        stat.setIpAddress(ipAddress);
        stat.setUserAgent(userAgent != null && userAgent.length() > 500
                ? userAgent.substring(0, 500) : userAgent);
        repository.save(stat);
        return repository.count();
    }

    public long getTotalVisitors() {
        return repository.count();
    }
}
