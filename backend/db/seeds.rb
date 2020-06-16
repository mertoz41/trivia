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


urls = [ 'https://opentdb.com/api.php?amount=50&category=21&type=multiple',
    'https://opentdb.com/api.php?amount=50&category=9&type=multiple',
    'https://opentdb.com/api.php?amount=50&category=10&type=multiple',
    'https://opentdb.com/api.php?amount=50&category=11&type=multiple',
    'https://opentdb.com/api.php?amount=50&category=12&type=multiple',
    'https://opentdb.com/api.php?amount=50&category=14&type=multiple',
    'https://opentdb.com/api.php?amount=50&category=15&type=multiple',
    'https://opentdb.com/api.php?amount=50&category=16&type=multiple',
    'https://opentdb.com/api.php?amount=50&category=17&type=multiple',
    'https://opentdb.com/api.php?amount=50&category=18&type=multiple',
    'https://opentdb.com/api.php?amount=50&category=13&type=multiple',
    'https://opentdb.com/api.php?amount=50&category=19&type=multiple',
    'https://opentdb.com/api.php?amount=50&category=22&type=multiple',
    'https://opentdb.com/api.php?amount=50&category=23&type=multiple',
    'https://opentdb.com/api.php?amount=50&category=24&type=multiple',
    'https://opentdb.com/api.php?amount=50&category=25&type=multiple',
    'https://opentdb.com/api.php?amount=50&category=26&type=multiple',
    'https://opentdb.com/api.php?amount=50&category=27&type=multiple',
    'https://opentdb.com/api.php?amount=50&category=28&type=multiple',
    'https://opentdb.com/api.php?amount=50&category=32&type=multiple']


    
    
    def create_questions(url)
        trivia = RestClient.get url
        trivia_array = JSON.parse(trivia)['results']
        trivia_array.each do |question_hash|
            category = Category.find_or_create_by(name: question_hash["category"])
            question = Question.create(text: question_hash["question"], category_id: category.id, difficulty: question_hash["difficulty"])
            correct_choice = Choice.create(text: question_hash["correct_answer"], question_id: question.id, correct: true)
            question_hash['incorrect_answers'].each do |answer|
                incorrect_choice = Choice.create(text: answer, question_id: question.id, correct: false)
            end
        end
    end
    
    
    urls.each do |url| 
        create_questions(url)
    end 





mert = User.create(name: "Mert", username: "MERTY", password: "1234", high_score: 10)

