class CreateEmployees < ActiveRecord::Migration[8.1]
  def change
    create_table :employees do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :country
      t.string :department
      t.string :role
      t.decimal :salary
      t.string :currency

      t.timestamps
    end
  end
end
