# frozen_string_literal: true

class Employee < ApplicationRecord
  # Associations
  has_many :salary_audits, dependent: :destroy

  # Validations
  validates :first_name, presence: true, length: { maximum: 50 }
  validates :last_name,  presence: true, length: { maximum: 50 }
  validates :email,      presence: true,
                         uniqueness: { case_sensitive: false },
                         format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :country,    presence: true
  validates :department, presence: true
  validates :role,       presence: true
  validates :salary,     presence: true,
                         numericality: { greater_than_or_equal_to: 0 }
  validates :currency,   presence: true, length: { is: 3 }

  # Normalize email before saving
  before_save :downcase_email

  # Scopes for reusable query logic (used by EmployeeQuery)
  scope :search, ->(term) {
    return all if term.blank?
    where("first_name LIKE :q OR last_name LIKE :q OR email LIKE :q", q: "%#{term}%")
  }
  scope :by_country,    ->(country)    { where(country: country)    if country.present? }
  scope :by_department, ->(department) { where(department: department) if department.present? }
  scope :active, -> { where(active: true) }

  private

  def downcase_email
    self.email = email.downcase if email.present?
  end
end
