class AddColumnIdToTasks < ActiveRecord::Migration[7.0]
  def change
    add_reference :tasks, :column, null: false, foreign_key: true
  end
end
