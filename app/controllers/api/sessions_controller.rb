class Api::SessionsController < ApplicationController
  allow_unauthenticated_access only: :create

  def create
    if user = User.authenticate_by(params.permit(:username, :password))
      session = user.sessions.create!(user_agent: request.user_agent, ip_address: request.remote_ip)
      render json: { token: session.token }, status: :created
    else
      render json: { error: 'The provided username or password is invalid.' }, status: :unauthorized
    end
  end

  def destroy
    Current.session.destroy
    head :no_content
  end
end
