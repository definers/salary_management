# Salary Management System

A full-stack web application built for HR Managers to efficiently manage salary data for 10,000 employees across multiple countries, replacing tedious Excel spreadsheets.

## 🚀 Tech Stack
- **Backend:** Ruby on Rails 8 (API-only), SQLite (Dev) / PostgreSQL (Prod), RSpec
- **Frontend:** Next.js (App Router), React Query, Tailwind CSS, Axios
- **Architecture:** Query Objects, Service Objects, Thin Controllers

## 🏗️ Architecture Highlights
- **Query Object (`EmployeeQuery`):** Encapsulates complex filtering and pagination logic, keeping controllers thin and code reusable.
- **Service Object (`SalaryUpdaterService`):** Handles business logic for updating salaries and creating immutable audit records within a database transaction.
- **Design Patterns:** Applied "Skinny Controller, Fat Model" evolved to "Skinny Controller, Service Object" to ensure testability and separation of concerns.

## 🛠️ Local Setup & Testing

### Backend (Rails)
```bash
cd backend
bundle install
rails db:create db:migrate db:seed
bundle exec rspec          # Run test suite
rails s -b 0.0.0.0 -p 3000 # Start server

###Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev                # Starts on http://localhost:3001
