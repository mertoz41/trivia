class QuestionsController < ApplicationController
    def index
        questions = Question.all
        render json: questions
    end 

    def by_category_and_difficulty
        questions = # some method that returns questions based on params category_Id and difficulty
        
    end
end
