class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include ActiveModel::SecurePassword

  field :username, type: String
  field :password_digest, type: String

  has_many :sessions
  has_many :messages

  has_secure_password

  validates :username, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 8 }, on: :create

  # Indexes for faster queries
  index({ username: 1 }, { unique: true })
end
