# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
require "faker"
require "bigdecimal"

BATCH_SIZE = 1_000
TOTAL_EMPLOYEES = 10_000

departments = [
  "Engineering",
  "Finance",
  "HR",
  "Marketing",
  "Sales",
  "Operations",
  "Support"
]

currencies = %w[USD INR GBP EUR CAD AUD]

TOTAL_EMPLOYEES.times.each_slice(BATCH_SIZE).with_index do |batch, index|
  employees = batch.map do
    {
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      email: Faker::Internet.unique.email,
      country: Faker::Address.country,
      department: departments.sample,
      role: Faker::Job.title,
      salary: BigDecimal(rand(30_000..150_000).to_s),
      currency: currencies.sample,
      created_at: Time.current,
      updated_at: Time.current
    }
  end

  Employee.insert_all(employees)

  puts "Inserted batch #{index + 1}: #{employees.size} employees"
end

puts "Finished seeding #{TOTAL_EMPLOYEES} employees."
