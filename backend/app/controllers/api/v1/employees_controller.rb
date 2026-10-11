# frozen_string_literal: true

module Api
  module V1
    class EmployeesController < ApplicationController
      def index
        @employees = EmployeeQuery.new.call(index_params)

        render json: {
          data: @employees,
          meta: pagination_meta(@employees)
        }
      end

      def show
        employee = Employee.find(params[:id])
        render json: employee
      end

      def update
        employee = Employee.find(params[:id])
        result = SalaryUpdaterService.new(employee, salary_params[:salary]).call

        if result.success?
          render json: result.employee
        else
          render json: { errors: result.errors }, status: :unprocessable_content
        end
      end

      def create
        result = EmployeeCreatorService.new(employee_params).call
        if result.success?
          render json: result.employee, status: :created
        else
          render json: { errors: result.errors }, status: :unprocessable_content
        end
      end

      def destroy
        employee = Employee.find(params[:id])
        if employee.update(active: false)
          render json: { message: "Employee archived successfully" }, status: :ok
        else
          render json: { errors: employee.errors.full_messages }, status: :unprocessable_content
        end
      end

      private

      def employee_params
        params.require(:employee).permit(:first_name, :last_name, :email, :country, :department, :role, :salary, :currency)
      end

      def index_params
        params.permit(:search, :country, :department, :page, :per_page)
      end

      def salary_params
        params.require(:employee).permit(:salary)
      end

      def pagination_meta(collection)
        {
          current_page: collection.current_page,
          total_pages: collection.total_pages,
           total_count: collection.total_entries # <--- Changed from total_count to total_entries
        }
      end
    end
  end
end
