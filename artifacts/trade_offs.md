# Trade-offs & Performance Considerations

## Database Choice
- **SQLite (Dev) vs PostgreSQL (Prod):** SQLite for zero-config local development. PostgreSQL recommended for production concurrency.

## Performance for 10,000 Employees
- **Indexes:** Added indexes on `email`, `country`, `department`, and `role`.
- **Pagination:** Server-side pagination using `will_paginate`. Never load 10,000 records into memory.
- **Seeding:** Used `insert_all` in batches for fast bulk inserts.

## Design Patterns
- **Query Object:** Encapsulates filtering, keeps controller thin, reusable across endpoints.
- **Service Object:** `SalaryUpdaterService` encapsulates the transaction for updating salary and creating audit records.