# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SalaryUpdaterService do
  let(:employee) do
    Employee.create!(
      first_name: "John", last_name: "Doe", email: "john@example.com",
      country: "USA", department: "Engineering", role: "Dev",
      salary: 100_000, currency: "USD"
    )
  end

  describe "#call" do
    it "updates salary and creates an audit record" do
      expect {
        described_class.new(employee, 120_000).call
      }.to change(SalaryAudit, :count).by(1)

      expect(employee.reload.salary).to eq(120_000)
    end

    it "returns failure if salary is invalid" do
      result = described_class.new(employee, -1).call
      expect(result.success?).to be false
      expect(result.errors).to be_present
    end
  end
end
