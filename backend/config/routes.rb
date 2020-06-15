Rails.application.routes.draw do
  resources :users
  resources :categories
  resources :choices
  resources :questions
  get 'questions/:category_id/:difficulty', to: 'questions#by_category_and_difficulty'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
