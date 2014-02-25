class Item < ActiveRecord::Base
  belongs_to :tweet
  has_one :itemtype
end
