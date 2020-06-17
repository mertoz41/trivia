class UsersController < ApplicationController

    def index
        user = User.score
        render json: user.to_json(
            :except => [:username, :password, :created_at, :updated_at]
        )
    end 

    
    def create
        new_user = User.create(name: params["name"], high_score: params["high_score"])
        render json: new_user.to_json(
            :except => [:username, :password, :created_at, :updated_at]
        )       
    end 

end
