class ApplicationController < ActionController::API
  include Authentication

  def start_twilio_client
    @client = Twilio::REST::Client.new(
      ENV['TWILIO_ACCOUNT_SID'],
      ENV['TWILIO_AUTH_TOKEN']
    )
  end
end
