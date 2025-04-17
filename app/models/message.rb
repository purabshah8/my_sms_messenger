class Message
  include Mongoid::Document
  include Mongoid::Timestamps
  field :to, type: String
  field :from, type: String
  field :body, type: String
  field :sent_at, type: Time

  validates :to, :from, presence: true, format: {
    with: /\A\+\d{1,3}\d{10}\z/,
    message: "invalid format, ensure phone number has country code and no spaces or dashes"
  }
  validates :body, presence: true
end
