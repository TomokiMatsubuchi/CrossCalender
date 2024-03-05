class AddUserToColumns < ActiveRecord::Migration[7.0]
  def change
    add_reference :columns, :user, null: true, foreign_key: true
  end
end
