class Category < ApplicationRecord
    has_many :questions

    # def question_difficulty
    
    #     self.questions.map {|question| question.difficulty}.uniq

       

    # end
end
