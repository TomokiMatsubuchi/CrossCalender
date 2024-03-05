# == Schema Information
#
# Table name: columns
#
#  id         :bigint           not null, primary key
#  name       :string
#  position   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_columns_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Column < ApplicationRecord
  has_many :tasks
  belongs_to :user
end
