class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username
  # embed :ids, include: true #called sideloading. Will sideload all associated
end
