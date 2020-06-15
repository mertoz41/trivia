class Question < ApplicationRecord
    has_many :choices
    belongs_to :category

    # def difficulty
    #     self.difficulty
    # end
end
