class AddActiveToEmployees < ActiveRecord::Migration[8.1]
  def change
    add_column :employees, :active, :boolean, default: true, null: false
    add_index :employees, :active
  end
end