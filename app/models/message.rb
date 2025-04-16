class Message
  include Mongoid::Document
  include Mongoid::Timestamps
  field :to, type: String
  field :from, type: String
  field :body, type: String
  field :sent_at, type: Time

  validates :to, presence: true
  validates :from, presence: true
  validates :body, presence: true
end
