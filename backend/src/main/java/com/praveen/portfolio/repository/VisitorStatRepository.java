package com.praveen.portfolio.repository;

import com.praveen.portfolio.model.VisitorStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitorStatRepository extends JpaRepository<VisitorStat, Long> {
}
