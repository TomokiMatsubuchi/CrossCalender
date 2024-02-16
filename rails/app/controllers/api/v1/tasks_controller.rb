# app/controllers/api/v1/tasks_controller.rb
class Api::V1::TasksController < ApplicationController
  before_action :set_task, only: [:show, :update, :destroy]

  def index
    @tasks = Task.all
    render json: @tasks
  end

  def show
    render json: @task
  end

  def create
    @task = Task.new(task_params)
    @task.column = Column.find_by(name: task_params[:status])
    if @task.save
      render json: @task, status: :created, location: api_v1_task_url(@task)
    else
      render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
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
      params.require(:task).permit(:title, :description, :status, :priority, :due_date, :user_id)
    end
end
