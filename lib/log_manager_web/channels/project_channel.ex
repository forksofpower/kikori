defmodule LogManagerWeb.ProjectChannel do
  # use LogManagerWeb, :channel
  use Phoenix.Channel

  @impl true
  def join("project:" <> projectId, _payload, socket) do
    if authorized?(socket, projectId) do
      # IO.puts("project ID " <> projectId)
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  @impl true
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  @impl true
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Check whether the user is allowed to listen to this resource
  defp authorized?(socket, id) do
    user = get_current_user(socket)
    project = LogManager.Projects.get_project!(id)
    # IO.puts("User: " <> inspect(user))
    # IO.puts("ProjectUser: " <> inspect(project))
    if (project && project.user.id === user.id) do
      true
    else
      false
    end
    # IO.puts(inspect(get_current_user(socket).name))
    # true
  end

  defp get_current_user(socket) do
    socket.assigns |> Map.get(:current_user)
  end
end

