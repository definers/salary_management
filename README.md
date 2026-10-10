# Salary Management System

**Incubyte Assessment - Software Craftsperson/ROR (Staff)**

## 📖 Overview
currently manages salary data for 10,000 employees across multiple countries using Excel spreadsheets, which is tedious and error-prone. This project is a web-based software solution designed for the HR Manager to efficiently manage, query, and update employee salaries.

## 🔗 Live Links
*   **Frontend (UI):** [Insert Vercel Deployment Link Here]
*   **Backend (API):** [Insert Render/Railway Deployment Link Here]
*   **Video Demo:** [Insert Loom/YouTube Video Link Here]

## 🛠 Tech Stack
*   **Backend:** Ruby on Rails (API Mode), SQLite (Development), PostgreSQL (Production)
*   **Frontend:** Next.js (React), Tailwind CSS, TanStack Query (React Query)
*   **Testing:** RSpec (Backend), Jest & React Testing Library (Frontend)
*   **Development Environment:** GitHub Codespaces (Cloud-native, AI-assisted)

## ✨ Key Features (Product Thinking)
*   **High-Performance Directory:** Server-side pagination to handle 10,000 records instantly without loading everything into memory.
*   **Advanced Filtering & Search:** HR managers can search by name, email, and filter by Country, Department, and Role. Debounced search prevents API hammering.
*   **Salary Management & Audit Trail:** Updating a salary creates an immutable record in a `salary_audits` table, capturing the old salary, new salary, and who made the change.
*   **Dashboard Metrics:** High-level aggregate views (Total Payroll, Average Salary by Department) to help HR understand organizational pay.
*   **CSV Export:** Allows HR to export filtered data for external reporting.

## 🏗 Architecture & Design Decisions
*   **Pagination & Indexing:** Added database indexes on `email`, `country`, `department`, and `role` to ensure fast query execution for 10,000 records. Used `kaminari` for server-side pagination.
*   **Service Objects:** Extracted complex business logic (e.g., `SalaryUpdaterService`) out of controllers to keep them thin and the codebase maintainable and easily testable.
*   **Performance:** Seeding 10,000 records was optimized using `insert_all` in batches to prevent memory bloat and reduce execution time.
*   **Trade-offs:** 
    *   *Left out:* Full authentication/authorization. Mocked a single "HR Manager" session to focus on core domain logic.
    *   *Left out:* Live currency conversion. Salaries are stored in local currency to focus on data integrity rather than external API dependencies.

## 🤖 AI-Driven Workflow
This project was built using an intentional AI-driven workflow (GitHub Copilot, ChatGPT, Cursor).
*   **Intentionality:** AI was used for boilerplate generation, test scaffolding, and UI styling. All AI output was manually reviewed, refactored, and optimized for performance.
*   **Documentation:** Full details of the prompts used, the initial AI outputs, and the subsequent manual refactoring/corrections are documented in `artifacts/ai_prompts.md`.

## 🚀 Getting Started (Local Setup)
*Note: This project was developed entirely in GitHub Codespaces, but can be run locally.*

### Prerequisites
*   Ruby (v3.x)
*   Node.js (v18.x)
*   SQLite3

### Backend Setup
```bash
cd backend
bundle install
rails db:create db:migrate db:seed
rails s