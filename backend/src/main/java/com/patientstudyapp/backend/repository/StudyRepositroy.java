package com.patientstudyapp.backend.repository;
import com.patientstudyapp.backend.model.Study;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudyRepositroy extends JpaRepository<Study, Integer> {
    
}
