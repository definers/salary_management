# frozen_string_literal: true

module Api
  module V1
    class DashboardController < ApplicationController
      def metrics
        render json: {
          total_employees: Employee.count,
          total_payroll: Employee.sum(:salary),
          avg_salary: Employee.average(:salary),
          by_country: Employee.group(:country).average(:salary)
        }
      end
    end
  end
end
