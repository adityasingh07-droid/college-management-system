package com.northstar.college.student;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record StudentRequest(
        @NotBlank @Size(max = 60) String firstName,
        @NotBlank @Size(max = 60) String lastName,
        @NotBlank @Email @Size(max = 120) String email,
        @NotBlank @Size(max = 80) String department,
        @Min(1) @Max(8) Integer year,
        @Size(max = 24) String phone,
        @NotBlank @Pattern(regexp = "Active|On leave|Graduated") String status
) {
}
