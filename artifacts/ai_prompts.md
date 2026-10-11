# AI Usage & Manual Corrections

## Prompt 1: Rails Model Setup
**Prompt:** "Generate Rails models for Employee and SalaryAudit with validations."
**AI Output:** Basic validations were provided.
**Manual Correction:** I added `dependent: :destroy`, immutable callbacks for `SalaryAudit`, and scopes for search/filtering.

## Prompt 2: Pagination
**Prompt:** "How to implement pagination in a Rails API?"
**AI Output:** Suggested Kaminari and `total_count`.
**Manual Correction:** I chose `will_paginate` and had to change `total_count` to `total_entries` in the controller. I also wrapped the `SalaryUpdaterService` in a transaction.