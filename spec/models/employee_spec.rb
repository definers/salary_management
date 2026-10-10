# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Employee, type: :model do
  let(:valid_attributes) do
    {
      first_name: "John", last_name: "Doe", email: "john@example.com",
      country: "USA", department: "Engineering", role: "Dev",
      salary: 100_000, currency: "USD"
    }
  end

  describe "validations" do
    it "is valid with valid attributes" do
      expect(described_class.new(valid_attributes)).to be_valid
    end

    it "is invalid without an email" do
      employee = described_class.new(valid_attributes.merge(email: nil))
      expect(employee).not_to be_valid
      expect(employee.errors[:email]).to include("can't be blank")
    end

    it "is invalid with a negative salary" do
      employee = described_class.new(valid_attributes.merge(salary: -100))
      expect(employee).not_to be_valid
      expect(employee.errors[:salary]).to include("must be greater than or equal to 0")
    end

    it "downcases email before saving" do
      employee = described_class.create!(valid_attributes.merge(email: "JOHN@EXAMPLE.COM"))
      expect(employee.reload.email).to eq("john@example.com")
    end
  end

  describe "scopes" do
    before do
      described_class.create!(valid_attributes)
      described_class.create!(valid_attributes.merge(email: "jane@example.com", country: "UK", department: "HR"))
    end

    it ".search finds by first name" do
      expect(described_class.search("John").count).to eq(1)
    end

    it ".by_country filters correctly" do
      expect(described_class.by_country("UK").count).to eq(1)
    end
  end
end
