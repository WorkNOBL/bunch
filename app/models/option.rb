class Option < ApplicationRecord
  belongs_to :rating
  has_many :answers
  has_many :ratings, through: :answers

  validates :name, presence: true, uniqueness: true
end
