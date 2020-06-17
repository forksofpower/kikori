defmodule LogManagerWeb.ProjectController do
  use LogManagerWeb, :controller

  alias LogManager.Projects
  alias LogManager.Projects.Project

  action_fallback LogManagerWeb.FallbackController

  def index(conn, _params) do
    %{id: userId } = Guardian.Plug.current_resource(conn)
    %{projects: projects} = Projects.user_projects(userId)
    render(conn, "index.json", projects: projects)
  end

  def create(conn, %{"project" => project_params}) do
    user = Guardian.Plug.current_resource(conn)
    p = project_params |> Map.merge(%{"user_id" => user.id})

    with {:ok, %Project{} = project} <- Projects.create_project(p) do

      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.project_path(conn, :show, project))
      |> render("show.json", project: project)
    end
  end

  def show(conn, %{"id" => id}) do
    project = Projects.get_project!(id)
    render(conn, "show.json", project: project)
  end

  def update(conn, %{"id" => id, "project" => project_params}) do
    project = Projects.get_project!(id)

    with {:ok, %Project{} = project} <- Projects.update_project(project, project_params) do
      render(conn, "show.json", project: project)
    end
  end

  def delete(conn, %{"id" => id}) do
    project = Projects.get_project!(id)

    with {:ok, %Project{}} <- Projects.delete_project(project) do
      send_resp(conn, :no_content, "")
    end
  end
end
