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
require "test_helper"

class TaskTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
