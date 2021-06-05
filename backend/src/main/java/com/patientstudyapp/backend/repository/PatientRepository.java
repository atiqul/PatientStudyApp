package com.patientstudyapp.backend.repository;
import com.patientstudyapp.backend.model.Patient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, String> {
    
}
