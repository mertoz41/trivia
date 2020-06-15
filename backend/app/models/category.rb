class Category < ApplicationRecord
    has_many :questions

    def question_difficulty
        question_hash = {}
        question_hash.map{|key, value|}
        # self.questions.map {|question| question_hash.map[question.difficulty] = }.uniq
    end
end
