class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      render json: { status: 'User created successfully' }, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.expect(user: [ :username, :password_digest ])
  end
end
