class PostSerializer < ActiveModel::Serializer
  attributes :id, :message, :user_id, :created_at, :updated_at
  # embed :ids, include: true #called sideloading. Will sideload all associated
  has_one :item, embed: :object
end
