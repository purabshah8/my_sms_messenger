class Api::MessagesController < ApplicationController
  before_action :start_twilio_client, only: :create
  before_action :require_authentication
  before_action :set_current_user

  def index
    @messages = @current_user.messages.order(sent_at: :desc)

    render json: @messages
  end

  def create
    @message = @current_user.messages.new(message_params)
    @message.from ||= ENV['TWILIO_PHONE_NUMBER']

    begin
      @client.messages.create(
        to: @message.to,
        from: @message.from,
        body: @message.body
      )
      @message.sent_at = Time.now

      if @message.save
        render json: @message, status: :created
      else
        render json: @message.errors, status: :unprocessable_entity
      end
    rescue Twilio::REST::RestError => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  private

  def message_params
    params.expect(message: [:to, :from, :body])
  end
end
