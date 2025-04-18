class Api::UsersController < ApplicationController
  allow_unauthenticated_access only: :create

  def create
    @user = User.new(user_params)

    if @user.save
      session = @user.sessions.create!
      render json: {
        user: { id: @user.id.to_s, username: @user.username },
        token: session.token
      }, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.expect(user: [ :username, :password ])
  end
end
