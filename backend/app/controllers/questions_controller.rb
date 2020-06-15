class QuestionsController < ApplicationController
    def index
        questions = Question.all
        render json: questions
    end 

    # def show
    #     question = Question.q_by_category(params[:category_id], params[:difficulty])
    #     render json: question
    # end 

    def by_category_and_difficulty
        questions = Question.q_by_category(params[:category_id], params[:difficulty])
        # byebug
         # some method that returns questions based on params category_Id and difficulty
        render json: questions
    end

end

