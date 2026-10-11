# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SalaryAudit, type: :model do
  let(:employee) do
    Employee.create!(
      first_name: "John", last_name: "Doe", email: "john@example.com",
      country: "USA", department: "Engineering", role: "Dev",
      salary: 100_000, currency: "USD"
    )
  end

  it "is valid with valid attributes" do
    audit = described_class.new(
      employee: employee, old_salary: 100_000,
      new_salary: 120_000, changed_by: "HR Manager"
    )
    expect(audit).to be_valid
  end

  it "is immutable after creation" do
    audit = described_class.create!(
      employee: employee, old_salary: 100_000,
      new_salary: 120_000, changed_by: "HR Manager"
    )
    expect { audit.update!(new_salary: 130_000) }.to raise_error(ActiveRecord::ReadOnlyRecord)
  end
end
