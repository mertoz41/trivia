class Question < ApplicationRecord
    has_many :choices
    belongs_to :category

    def self.q_by_category(category_id, difficulty)
        self.all.where(category_id: category_id, difficulty: difficulty)
    end

    def shuffle
        self.choices.shuffle
    end 

   

end
