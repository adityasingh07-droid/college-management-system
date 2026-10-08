package com.northstar.college.student;

import java.time.LocalDate;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class StudentDataInitializer implements CommandLineRunner {
    private final StudentRepository repository;

    public StudentDataInitializer(StudentRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() > 0) {
            return;
        }

        repository.save(new Student("STU-2025-001", "Aarav", "Sharma", "aarav.sharma@northstar.edu",
                "Computer Science", 3, "+91 98765 43210", "Active", LocalDate.of(2023, 8, 14)));
        repository.save(new Student("STU-2025-002", "Maya", "Patel", "maya.patel@northstar.edu",
                "Business", 2, "+91 98765 43211", "Active", LocalDate.of(2024, 8, 12)));
        repository.save(new Student("STU-2025-003", "Ishaan", "Gupta", "ishaan.gupta@northstar.edu",
                "Engineering", 4, "+91 98765 43212", "Active", LocalDate.of(2022, 8, 15)));
        repository.save(new Student("STU-2025-004", "Ananya", "Reddy", "ananya.reddy@northstar.edu",
                "Design", 1, "+91 98765 43213", "On leave", LocalDate.of(2025, 8, 11)));
        repository.save(new Student("STU-2025-005", "Kabir", "Mehta", "kabir.mehta@northstar.edu",
                "Computer Science", 2, "+91 98765 43214", "Active", LocalDate.of(2024, 8, 12)));
        repository.save(new Student("STU-2025-006", "Diya", "Nair", "diya.nair@northstar.edu",
                "Business", 3, "+91 98765 43215", "Active", LocalDate.of(2023, 8, 14)));
    }
}
