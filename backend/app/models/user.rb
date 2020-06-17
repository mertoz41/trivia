class User < ApplicationRecord
    def self.score
        User.all.order('high_score desc')
    end 
end
