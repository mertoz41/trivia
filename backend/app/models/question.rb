class Question < ApplicationRecord
    has_many :choices
    belongs_to :category

    # def diff_by_category
    #     self.category.difficulty

    # end
   

end
