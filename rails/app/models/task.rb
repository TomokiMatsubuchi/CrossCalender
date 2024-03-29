# == Schema Information
#
# Table name: tasks
#
#  id          :bigint           not null, primary key
#  description :text
#  due_date    :date             not null
#  priority    :integer          not null
#  status      :string           not null
#  title       :string           not null
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

  validates :title, :status, :priority, :due_date, :user_id, presence: true

  def assign_column_from_status(status)
    self.column = Column.find_by(name: status)
  end
end
