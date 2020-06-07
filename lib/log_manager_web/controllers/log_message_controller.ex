defmodule LogManagerWeb.LogMessageController do
  use LogManagerWeb, :controller
  require Logger
  require IEx

  alias LogManager.{Guardian, Projects, Projects.LogMessage}
  alias LogManager.Projects
  alias LogManager.Projects.LogMessage

  action_fallback LogManagerWeb.FallbackController

  plug :authorize_user when action in [:index, :create]

  def index(conn, %{"project_id" => id}) do
    {project_id, ""} = Integer.parse(id)
    log_messages = Projects.list_project_log_messages(project_id)
    render(conn, "index.json", log_messages: log_messages)
  end

  def index(conn, _params) do
    log_messages = Projects.list_log_messages()
    render(conn, "index.json", log_messages: log_messages)
  end

  def create(conn, %{"log_message" => log_message_params, "project_id" => id}) do
    {project_id, ""} = Integer.parse(id)
    log_message_params = Map.put(log_message_params, "project_id", project_id)
    with {:ok, %LogMessage{} = log_message} <- Projects.create_log_message(log_message_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.log_message_path(conn, :show, log_message))
      |> render("show.json", log_message: log_message)
    end
  end

  def show(conn, %{"id" => id}) do
    log_message = Projects.get_log_message!(id)
    render(conn, "show.json", log_message: log_message)
  end

  def update(conn, %{"id" => id, "log_message" => log_message_params}) do
    log_message = Projects.get_log_message!(id)

    with {:ok, %LogMessage{} = log_message} <- Projects.update_log_message(log_message, log_message_params) do
      render(conn, "show.json", log_message: log_message)
    end
  end

  def delete(conn, %{"id" => id}) do
    log_message = Projects.get_log_message!(id)

    with {:ok, %LogMessage{}} <- Projects.delete_log_message(log_message) do
      send_resp(conn, :no_content, "")
    end
  end

  defp authorize_user(conn, _params) do
    %{params: %{"project_id" => project_id}} = conn
    project = Projects.get_project!(project_id)
    user = Guardian.Plug.current_resource(conn)

    if (user.id == project.user_id) do
      conn
    else
      send_resp(conn, 401, Jason.encode!(%{error: "access denied"}))
    end
  end
end
