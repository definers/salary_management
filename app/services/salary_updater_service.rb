# frozen_string_literal: true

class SalaryUpdaterService
  Result = Struct.new(:success?, :employee, :errors)

  def initialize(employee, new_salary, changed_by: "HR Manager")
    @employee   = employee
    @new_salary = new_salary
    @changed_by = changed_by
  end

  def call
    old_salary = @employee.salary

    @employee.transaction do
      @employee.update!(salary: @new_salary)
      @employee.salary_audits.create!(
        old_salary: old_salary,
        new_salary: @employee.salary,
        changed_by: @changed_by
      )
    end

    Result.new(true, @employee, [])
  rescue ActiveRecord::RecordInvalid => e
    Result.new(false, @employee, e.record.errors.full_messages)
  end
end
