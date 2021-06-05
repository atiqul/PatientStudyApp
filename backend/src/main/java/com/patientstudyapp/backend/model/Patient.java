package com.patientstudyapp.backend.model;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Data;

/**
 * Patient
 */

@Entity
@Data
public class Patient {
    @Id    
    @NotNull
    @Size(max = 30)
    @Column(unique = true)
    private String patientId;

    @NotNull
    @Size(max = 50)
    private String firstName;

    @NotNull
    @Size(max = 50)
    private String lastName;

    @NotNull
    @Temporal(TemporalType.DATE)
    private Date dateOfBirth;

    
}