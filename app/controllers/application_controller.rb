class ApplicationController < ActionController::API
  include Authentication

  allow_unauthenticated_access only: :frontend

  def start_twilio_client
    @client = Twilio::REST::Client.new(
      ENV['TWILIO_ACCOUNT_SID'],
      ENV['TWILIO_AUTH_TOKEN']
    )
  end

  def set_current_user
    return unless authenticated?

    @current_user = Current.session.user
  end

  def frontend
    render file: Rails.root.join('public', 'browser', 'index.html'), layout: false
  end
end
