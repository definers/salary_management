# frozen_string_literal: true

class SalaryUpdaterService
  Result = Struct.new(:success?, :employee, :errors)

  def initialize(employee, new_salary, changed_by: "HR Manager")
    @employee = employee
    @new_salary = new_salary
    @changed_by = changed_by
  end

  def call
    old_salary = @employee.salary

    if @employee.update(salary: @new_salary)
      create_audit_record(old_salary)
      Result.new(true, @employee, [])
    else
      Result.new(false, @employee, @employee.errors.full_messages)
    end
  end

  private

  def create_audit_record(old_salary)
    SalaryAudit.create!(
      employee: @employee,
      old_salary: old_salary,
      new_salary: @employee.salary,
      changed_by: @changed_by
    )
  end
end
