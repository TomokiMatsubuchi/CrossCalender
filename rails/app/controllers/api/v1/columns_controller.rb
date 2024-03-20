class Api::V1::ColumnsController < ApplicationController
  before_action :set_column, only: [:show, :update, :destroy]

  def index
    @columns = current_api_v1_user.columns.includes(:tasks).order(:id).all
    render json: @columns, include: :tasks
  end

  def show
    render json: @column
  end

  def create
    @column = current_api_v1_user.columns.new(column_params)
    if @column.save
      render json: @column, status: :created
    else
      render json: @column.errors, status: :unprocessable_entity
    end
  end

  def update
    puts column_params
    if @column.update(column_params)
      render json: @column
    else
      render json: @column.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @column.destroy
    head :no_content
  end

  private

  def set_column
    @column = Column.find(params[:id])
  end

  def column_params
    params.require(:column).permit(:name)
  end
end
