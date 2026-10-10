# frozen_string_literal: true

class EmployeeQuery
  def initialize(relation = Employee.all)
    @relation = relation
  end

  def call(params = {})
    @relation
      .then { |r| filter_by_search(r, params[:search]) }
      .then { |r| filter_by_country(r, params[:country]) }
      .then { |r| filter_by_department(r, params[:department]) }
      .then { |r| paginate(r, params[:page], params[:per_page]) }
  end

  private

  def filter_by_search(relation, search)
    return relation if search.blank?

    relation.where(
      "first_name LIKE :q OR last_name LIKE :q OR email LIKE :q",
      q: "%#{search}%"
    )
  end

  def filter_by_country(relation, country)
    return relation if country.blank?

    relation.where(country: country)
  end

  def filter_by_department(relation, department)
    return relation if department.blank?

    relation.where(department: department)
  end

  def paginate(relation, page, per_page)
    page = page || 1
    per_page = per_page || 20
    relation.paginate(page: page, per_page: per_page)
  end
end
app/controllers/api/v1/employees_controller.rb