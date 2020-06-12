# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'rest-client'

User.destroy_all
Category.destroy_all
Question.destroy_all
Choice.destroy_all


trivia = RestClient.get 'https://opentdb.com/api.php?amount=25&type=multiple'
trivia_array = JSON.parse(trivia)['results']

trivia_array.each do |question_hash|
    
    category = Category.find_or_create_by(name: question_hash["category"])
    question = Question.create(text: question_hash["question"], category_id: category.id, difficulty: question_hash["difficulty"])
    correct_choice = Choice.create(text: question_hash["correct_answer"], question_id: question.id, correct: true)
    question_hash['incorrect_answers'].each do |answer|
        incorrect_choice = Choice.create(text: answer, question_id: question.id, correct: false)
    end
end





mert = User.create(name: "Mert", username: "MERTY", password: "1234", high_score: 10)

