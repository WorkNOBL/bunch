class Answer < ApplicationRecord
  belongs_to :option
  belongs_to :rating

  validates :option, presence: true
  validates :rating, presence: true
end
