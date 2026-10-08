package com.northstar.college.student;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_number", nullable = false, unique = true, length = 24)
    private String studentNumber;

    @Column(name = "first_name", nullable = false, length = 60)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 60)
    private String lastName;

    @Column(nullable = false, unique = true, length = 120)
    private String email;

    @Column(nullable = false, length = 80)
    private String department;

    @Column(nullable = false)
    private Integer year;

    @Column(length = 24)
    private String phone;

    @Column(nullable = false, length = 20)
    private String status;

    @Column(name = "enrolled_date", nullable = false)
    private LocalDate enrolledDate;

    protected Student() {
    }

    public Student(String studentNumber, String firstName, String lastName, String email,
                   String department, Integer year, String phone, String status, LocalDate enrolledDate) {
        this.studentNumber = studentNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.department = department;
        this.year = year;
        this.phone = phone;
        this.status = status;
        this.enrolledDate = enrolledDate;
    }

    public Long getId() {
        return id;
    }

    public String getStudentNumber() {
        return studentNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getDepartment() {
        return department;
    }

    public Integer getYear() {
        return year;
    }

    public String getPhone() {
        return phone;
    }

    public String getStatus() {
        return status;
    }

    public LocalDate getEnrolledDate() {
        return enrolledDate;
    }

    public void update(String firstName, String lastName, String email, String department,
                       Integer year, String phone, String status) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.department = department;
        this.year = year;
        this.phone = phone;
        this.status = status;
    }
}
