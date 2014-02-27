class PostSerializer < ActiveModel::Serializer
  attributes :id, :message, :created_at, :updated_at
  # embed :ids, include: true #called sideloading. Will sideload all associated
  has_one :item, embed: :object
  has_one :user, embed: :object
end
