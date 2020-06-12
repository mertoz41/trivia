# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'rest-client'



category = RestClient.get 'https://opentdb.com/api.php?amount=100&type=multiple'
# category_array = JSON.parse(category)['trivia_categories']
# category_names = category_array.map {|i| i['name']}
# category_names.map {|i| Category.create(name: i)}

# question = ResClient.get ''





User.destroy_all
Category.destroy_all
Question.destroy_all
Choice.destroy_all



# user1 = User.create(name: Faker::Name.unique.name, username: Faker::FunnyName.name, password: "12345", high_score:0)
# user2 = User.create(name: Faker::Name.unique.name, username: Faker::FunnyName.name, password: "12345", high_score:0)
# mert = User.create(name: "Mert", username: "MERTY", password: "1234", high_score: 10)
# categ1 = Category.create(name: "Landmarks")
# ques1 = Question.create(text: "How tall is the Eiffel tower?", category_id: categ1.id, difficulty: "medium")
# choice1 = Choice.create(text: "10 feet", correct: false, question_id: ques1.id)
# choice2 = Choice.create(text: "1063 feet", correct: true, question_id: ques1.id)
# choice3 = Choice.create(text: "1000 feet", correct: false, question_id: ques1.id)
# choice4 = Choice.create(text: "3000 feet", correct: false, question_id: ques1.id)
