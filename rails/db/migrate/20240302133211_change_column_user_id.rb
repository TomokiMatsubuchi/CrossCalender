class ChangeColumnUserId < ActiveRecord::Migration[7.0]
  def change
    change_column_null :columns, :user_id, false
  end
end
