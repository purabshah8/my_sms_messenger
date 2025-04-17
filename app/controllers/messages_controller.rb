class MessagesController < ApplicationController
  before_action :start_twilio_client, only: :create

  def index
    @messages = Message.all.order(sent_at: :desc)

    render json: @messages
  end

  def create
    @message = Message.new(message_params)
    @message.from ||= ENV['TWILIO_PHONE_NUMBER']

    begin
      @client.messages.create(
        to: @message.to,
        from: @message.from,
        body: @message.body
      )
      @message.sent_at = Time.now

      if @message.save
        render json: @message, status: :created, location: @message
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
