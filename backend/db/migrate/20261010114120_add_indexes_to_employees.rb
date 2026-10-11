# frozen_string_literal: true
class AddIndexesToEmployees < ActiveRecord::Migration[8.1]
  def change
    add_index :employees, :email, unique: true
    add_index :employees, :country
    add_index :employees, :department
    add_index :employees, :role
    add_index :employees, [:country, :department] # Composite index for faster filtering
  end
end