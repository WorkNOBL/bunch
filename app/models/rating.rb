class Rating < ApplicationRecord
  # has_many :options
  belongs_to :user

  has_many :answers
  has_many :options, through: :answers

  validates :event_id, presence: true
  validates :user, presence: true
end
