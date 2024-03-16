class AddNotNullConstraintsToTasks < ActiveRecord::Migration[7.0]
  def change
    change_column_null :tasks, :due_date, false
    change_column_null :tasks, :priority, false
    change_column_null :tasks, :status, false
    change_column_null :tasks, :title, false
  end
end
