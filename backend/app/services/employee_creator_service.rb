class EmployeeCreatorService
  Result = Struct.new(:success?, :employee, :errors)

  def initialize(params)
    @params = params
  end

  def call
    employee = Employee.new(@params)
    if employee.save
      Result.new(true, employee, [])
    else
      Result.new(false, employee, employee.errors.full_messages)
    end
  end
end
