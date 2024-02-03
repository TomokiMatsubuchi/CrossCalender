# == Schema Information
#
# Table name: tasks
#
#  id          :bigint           not null, primary key
#  description :text
#  due_date    :date
#  priority    :integer
#  status      :string
#  title       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  column_id   :bigint           not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_tasks_on_column_id  (column_id)
#  index_tasks_on_user_id    (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (column_id => columns.id)
#  fk_rails_...  (user_id => users.id)
#
class Task < ApplicationRecord
  belongs_to :user
  belongs_to :column
end
