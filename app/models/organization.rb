class Organization < ApplicationRecord
  belongs_to :user
  belongs_to :domain

  validates :user, presence: true
  validates :domain, presence: true
end
