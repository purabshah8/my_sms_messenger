class Session
  include Mongoid::Document
  include Mongoid::Timestamps

  field :ip_address, type: String
  field :user_agent, type: String
  field :token, type: String
  field :expires_at, type: Time

  belongs_to :user

  validates :token, uniqueness: true, allow_nil: true
 
  index({ token: 1 }, { unique: true })
  index({ expires_at: 1 })

  before_create :generate_token, :set_expiration

  scope :active, -> { where(:expires_at.gt => Time.current) }

  def regenerate_token!
    generate_token
    set_expiration
    save!
  end

  private

  def generate_token
    self.token = SecureRandom.urlsafe_base64(32)
  end

  def set_expiration
    self.expires_at = 3.hours.from_now
  end
end
