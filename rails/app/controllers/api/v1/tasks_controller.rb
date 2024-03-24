class Api::V1::TasksController < ApplicationController
  before_action :set_task, only: [:show, :update, :destroy]

  def index
    @tasks = current_api_v1_user.tasks
    render json: @tasks
  end

  def show
    render json: @task
  end

  def create
    @task = current_api_v1_user.tasks.new(task_params)
    @task.assign_column_from_status(task_params[:status])
    if @task.save
      render json: @task, status: :created, location: api_v1_task_url(@task)
    else
      error_messages = @task.errors.messages.map { |field, messages| { field => messages.join(", ") } }
      render json: { errors: error_messages }, status: :unprocessable_entity
    end
  end

  def update
    @task.assign_column_from_status(task_params[:status])
    if @task.update(task_params)
      render json: @task
    else
      error_messages = @task.errors.messages.map { |field, messages| { field => messages.join(", ") } }
      render json: { errors: error_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @task.destroy
    head :no_content
  end

  private
    def set_task
      @task = Task.find(params[:id])
    end

    def task_params
      params.require(:task).permit(:title, :description, :status, :priority, :due_date)
    end
end
