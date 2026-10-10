# frozen_string_literal: true

module Api
  module V1
    class DashboardController < ApplicationController
      def metrics
        render json: {
          total_employees: Employee.count,
          total_payroll: Employee.sum(:salary).to_f,
          avg_salary: Employee.average(:salary).to_f,
          by_country: Employee.group(:country).average(:salary).transform_values(&:to_f)
        }
      end
    end
  end
end
