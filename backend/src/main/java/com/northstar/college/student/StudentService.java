package com.northstar.college.student;

import java.time.LocalDate;
import java.time.Year;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class StudentService {
    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<Student> findAll() {
        return repository.findAllByOrderByIdDesc();
    }

    public Student create(StudentRequest request) {
        String studentNumber = "STU-" + Year.now().getValue() + "-"
                + UUID.randomUUID().toString().substring(0, 6).toUpperCase(Locale.ROOT);
        Student student = new Student(
                studentNumber,
                request.firstName().trim(),
                request.lastName().trim(),
                request.email().trim().toLowerCase(Locale.ROOT),
                request.department().trim(),
                request.year(),
                normalizePhone(request.phone()),
                request.status(),
                LocalDate.now()
        );
        return repository.save(student);
    }

    public Student update(Long id, StudentRequest request) {
        Student student = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found."));
        student.update(
                request.firstName().trim(),
                request.lastName().trim(),
                request.email().trim().toLowerCase(Locale.ROOT),
                request.department().trim(),
                request.year(),
                normalizePhone(request.phone()),
                request.status()
        );
        return repository.save(student);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found.");
        }
        repository.deleteById(id);
    }

    private String normalizePhone(String phone) {
        return phone == null || phone.isBlank() ? null : phone.trim();
    }
}
