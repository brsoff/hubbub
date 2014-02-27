class ItemSerializer < ActiveModel::Serializer
  has_one :itemtype, embed: :object
  attributes :id, :url, :post_id, :name
end
