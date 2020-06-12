class RemoveDifficultyFromCategory < ActiveRecord::Migration[6.0]
  def change
    remove_column :categories, :difficulty, :string
  end
end
