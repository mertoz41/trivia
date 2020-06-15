class CategoriesController < ApplicationController
    def index
        render json: Category.all.to_json(
            :except => [:created_at, :updated_at])
    end 

    def show
        category = Category.find(params[:id])
        render json: category, include: :questions
    end
end

render json: user_shops.to_json(methods: :fav_number)