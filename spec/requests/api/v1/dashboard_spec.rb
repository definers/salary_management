# frozen_string_literal: true

require 'rails_helper'

RSpec.describe "Api::V1::Dashboard", type: :request do
  before do
    Employee.create!(
      first_name: "John", last_name: "Doe", email: "john@example.com",
      country: "USA", department: "Engineering", role: "Dev",
      salary: 100_000, currency: "USD"
    )
  end

  describe "GET /api/v1/dashboard/metrics" do
    it "returns aggregated metrics" do
      get "/api/v1/dashboard/metrics"
      expect(response).to have_http_status(:success)

      json = JSON.parse(response.body)
      expect(json["total_employees"]).to eq(1)
      expect(json["total_payroll"]).to eq(100_000.0)
      expect(json["avg_salary"]).to eq(100_000.0)
    end
  end
end
