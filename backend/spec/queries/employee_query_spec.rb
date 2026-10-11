# frozen_string_literal: true

require 'rails_helper'

RSpec.describe EmployeeQuery do
  let!(:employee1) do
    Employee.create!(
      first_name: "John", last_name: "Doe", email: "john@example.com",
      country: "USA", department: "Engineering", role: "Dev",
      salary: 100_000, currency: "USD"
    )
  end

  let!(:employee2) do
    Employee.create!(
      first_name: "Jane", last_name: "Smith", email: "jane@example.com",
      country: "UK", department: "HR", role: "Manager",
      salary: 80_000, currency: "GBP"
    )
  end

  describe "#call" do
    it "filters by search term" do
      result = described_class.new.call(search: "John")
      expect(result.map(&:first_name)).to contain_exactly("John")
    end

    it "filters by country" do
      result = described_class.new.call(country: "UK")
      expect(result.map(&:first_name)).to contain_exactly("Jane")
    end

    it "paginates results" do
      result = described_class.new.call(page: 1, per_page: 1)
      expect(result.size).to eq(1)
    end
  end
end
