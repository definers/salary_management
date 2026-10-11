# frozen_string_literal: true

class SalaryAudit < ApplicationRecord
  # Associations
  belongs_to :employee

  # Validations
  validates :old_salary, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :new_salary, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :changed_by, presence: true

  # Immutable Record Pattern: Audit records should never be modified or deleted
  before_update { raise ActiveRecord::ReadOnlyRecord, "Audit records cannot be modified" }
  before_destroy { raise ActiveRecord::ReadOnlyRecord, "Audit records cannot be deleted" }

  scope :recent_first, -> { order(created_at: :desc) }
end
