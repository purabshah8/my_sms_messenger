class Api::SessionsController < ApplicationController
  allow_unauthenticated_access only: :create

  def create
    if user = User.find_by(username: user_params[:username])&.authenticate(user_params[:password])
      session = user.sessions.create!
      render json: {
        user: { id: user.id.to_s, username: user.username },
        token: session.token
      }, status: :created
    else
      render json: { errors: ['The provided username or password is invalid.'] }, status: :unauthorized
    end
  end

  def destroy
    Current.session.destroy
    head :no_content
  end

  private
  def user_params
    params.expect(user: [:username, :password])
  end
end
