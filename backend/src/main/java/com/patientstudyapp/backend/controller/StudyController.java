package com.patientstudyapp.backend.controller;

import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Map;
import javax.validation.Valid;
import com.patientstudyapp.backend.model.Study;
import com.patientstudyapp.backend.repository.PatientRepository;
import com.patientstudyapp.backend.repository.StudyRepositroy;
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
public class StudyController {
    private final StudyRepositroy studyRepositroy;
    private final PatientRepository patientRepository;
    @Autowired
    public StudyController(StudyRepositroy studyRepositroy, PatientRepository patientRepository){
        this.studyRepositroy = studyRepositroy;
        this.patientRepository = patientRepository;
    }    

    @GetMapping("/studies")
    public List<Study> getStudies() {   
        Comparator<Study> sortedByUpdatedTime = (Study s1, Study s2)->s1.getLastModifiedDate().compareTo(s2.getLastModifiedDate());
        List<Study> studies = studyRepositroy.findAll();
        Collections.sort(studies, sortedByUpdatedTime.reversed());
        return studies;
    }

    @PostMapping("/studies")
    // @RequestMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public Study postStudy(@RequestBody Map<String, String> body) {              
        String patientId = body.get("patientId");
        if(!patientRepository.findById(patientId).isPresent()){ 
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient with ID: " + patientId + " not found.");
        }
        Study study = new Study();  
        study.setLastModifiedDate(new Date());
        study.setName(body.get("name"));
        study.setDescription(body.get("description"));
        study.setPatient(patientRepository.getById(patientId));
        return studyRepositroy.save(study);
    }

    @GetMapping("/studies/{id}")
    public Study getStudyById(@PathVariable int id) {
        return studyRepositroy.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Study ID: " + id + "not found."));
    }

    @PutMapping("/studies/{id}")
    public Study updateStudy(@PathVariable int id, @Valid @RequestBody Study study) {
        return studyRepositroy.findById(id).map(oldStudy -> {
            oldStudy.setName(study.getName());
            oldStudy.setDescription(study.getDescription());
            oldStudy.setLastModifiedDate(new Date());
            return studyRepositroy.save(oldStudy);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Study ID: " + id + "not found"));
    }

    @DeleteMapping("/studies/{id}")
    public ResponseEntity<?> deleteStudy(@PathVariable int id) {
        return studyRepositroy.findById(id).map(study -> {
            studyRepositroy.delete(study);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Study ID: " + id + "not found"));
    }
}
