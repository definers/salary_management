# frozen_string_literal: true

require 'rails_helper'

RSpec.describe "Api::V1::Employees", type: :request do
  let!(:employee) do
    Employee.create!(
      first_name: "John", last_name: "Doe", email: "john@example.com",
      country: "USA", department: "Engineering", role: "Dev",
      salary: 100_000, currency: "USD"
    )
  end

  describe "GET /api/v1/employees" do
    it "returns a successful response with paginated data" do
      get "/api/v1/employees"
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json["data"].size).to eq(1)
      expect(json["meta"]["total_count"]).to eq(1)
    end
  end

  describe "PATCH /api/v1/employees/:id" do
    it "updates the salary and creates an audit record" do
      expect {
        patch "/api/v1/employees/#{employee.id}", params: { employee: { salary: 120_000 } }
      }.to change(SalaryAudit, :count).by(1)

      expect(response).to have_http_status(:success)
      expect(employee.reload.salary).to eq(120_000)
    end

    it "returns an error if the salary is invalid" do
      patch "/api/v1/employees/#{employee.id}", params: { employee: { salary: -500 } }
      expect(response).to have_http_status(:unprocessable_content) # <--- Updated
    end
  end
end
