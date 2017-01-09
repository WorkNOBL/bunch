class Domain < ApplicationRecord
  has_many :organizations
  has_many :users, through: :organizations

  validates :name, presence: true, uniqueness: true
end
