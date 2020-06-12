class CreateChoices < ActiveRecord::Migration[6.0]
  def change
    create_table :choices do |t|
      t.string :text
      t.boolean :correct
      t.integer :question_id

      t.timestamps
    end
  end
end
