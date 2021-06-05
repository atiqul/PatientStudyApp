package com.patientstudyapp.backend.controller;

import java.util.List;
import javax.validation.Valid;
import com.patientstudyapp.backend.model.Patient;
import com.patientstudyapp.backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
@RestController
@RequestMapping("/api")
@CrossOrigin
public class PatientController {
    @Autowired
    private PatientRepository patientRepository;

    @GetMapping("/patients")
    public List<Patient> getPatients() {
        return patientRepository.findAll();
    }

    @PostMapping("/patients")
    public Patient creaPatient(@Valid @RequestBody Patient patient) { 
        
        if(!patientRepository.findById(patient.getPatientId()).isPresent()){
            return patientRepository.save(patient);            
        }else{
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Patient with Patient ID: " + patient.getPatientId() + " is already available");
        }
        
    }

    @GetMapping("/patients/{patientId}")
    public Patient getPatientById(@PathVariable String patientId) {
        return patientRepository.findById(patientId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient ID: " + patientId + "not found"));
    }

    @PutMapping("/patients/{patientId}")
    public Patient updatePatient(@PathVariable String patientId, @Valid @RequestBody Patient patient) {
        return patientRepository.findById(patientId).map(oldPatient -> {
            oldPatient.setFirstName(patient.getFirstName());
            oldPatient.setLastName(patient.getLastName());
            oldPatient.setDateOfBirth(patient.getDateOfBirth());

            return patientRepository.save(oldPatient);
        }).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient ID: " + patientId + "not found"));
    }

    @DeleteMapping("/patients/{patientId}")
    public ResponseEntity<?> deletePatient(@PathVariable String patientId) {
        return patientRepository.findById(patientId).map(patient -> {
            patientRepository.delete(patient);

            return ResponseEntity.ok().build();
        }).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient ID: " + patientId + "not found"));
    }

}
