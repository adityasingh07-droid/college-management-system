# Northstar College Management System

A college management starter project with a React dashboard, a Spring Boot REST API, and MySQL persistence. The student directory is connected to the API; the campus modules include searchable preview data and interactive demo actions.

## Requirements

- Node.js 20.19+ (or 22.12+)
- Java 17+
- Maven 3.6+
- MySQL 8+

## 1. Create the database

Start MySQL, then create the application database:

```sql
CREATE DATABASE college_management
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

The same statement is in `backend/database.sql`. Spring Data JPA creates and updates the student table on startup.

## 2. Start the Spring Boot API

From the project root, open a terminal and run the backend from its folder:

```powershell
cd backend
$env:DB_USERNAME = "root"
$env:DB_PASSWORD = "your-mysql-password"
mvn spring-boot:run
```

Set `DB_USERNAME` and `DB_PASSWORD` to match your local MySQL account. Defaults are `root` and an empty password. The API is available at `http://localhost:8080`.

## 3. Start the React app

In a second terminal at the project root:

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite. The Vite development server proxies `/api` requests to the Spring Boot API. If the API is not running, the dashboard displays sample records in preview mode; editing is disabled until the API is connected.

The sidebar and dashboard shortcuts link to **Overview**, **Students**, **Departments**, **Courses**, **Faculty**, **Enrollment**, **Fees**, and **Library**. Their direct URLs are `/`, `/students`, `/departments`, `/courses`, `/faculty`, `/enrollment`, `/fees`, and `/library`; browser back/forward keeps the selected page in sync.

Enrollment and library buttons update the current preview, while fee payments are deliberately simulated and clearly marked as such. These sample campus modules do not charge money or save data to MySQL. Real payment processing requires a payment provider integration; persistent courses, enrollments, fees, faculty, and library records require corresponding backend APIs.

## Student API

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/students` | List students |
| `POST` | `/api/students` | Add a student |
| `PUT` | `/api/students/{id}` | Update a student |
| `DELETE` | `/api/students/{id}` | Remove a student |

New student records receive an automatically generated student number. The database is seeded with example records the first time the API starts against an empty database.

## Project layout

```text
src/                                  React app (Vite)
  App.jsx                             Dashboard and student directory
  App.css                             Responsive app styles
backend/
  src/main/java/com/northstar/college/ Spring Boot API
  src/main/resources/application.properties
  database.sql                        MySQL database setup
```

## Checks

```powershell
npm run lint
npm run build
cd backend
mvn test
```
