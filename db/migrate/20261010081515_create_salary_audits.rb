class CreateSalaryAudits < ActiveRecord::Migration[8.1]
  def change
    create_table :salary_audits do |t|
      t.references :employee, null: false, foreign_key: true
      t.decimal :old_salary
      t.decimal :new_salary
      t.string :changed_by

      t.timestamps
    end
  end
end
