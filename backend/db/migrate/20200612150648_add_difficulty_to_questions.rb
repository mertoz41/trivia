class AddDifficultyToQuestions < ActiveRecord::Migration[6.0]
  def change
    add_column :questions, :difficulty, :string
  end
end
