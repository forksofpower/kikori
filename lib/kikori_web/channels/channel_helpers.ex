defmodule KikoriWeb.Channel.Helpers do
  def authenticated(socket) do
    (socket.assigns[:user_id])
  end

  # Check whether the user is allowed to listen to this resource
  def authorized?(socket, id) do
    user = get_current_user(socket)
    project = Kikori.Projects.get_project!(id)
    (project && project.user.id === user.id)
  end

  def get_current_user(socket) do
    socket.assigns |> Map.get(:current_user)
  end
end
