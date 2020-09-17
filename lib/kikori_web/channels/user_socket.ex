defmodule KikoriWeb.UserSocket do
  use Phoenix.Socket
  alias Kikori.{Guardian}

  # @impl true
  # def connect(_params, socket, _connect_info) do
  #   {:ok, socket}
  # end

  @impl true
  def connect(%{"token" => token}, socket, _connection) do
    case Guardian.decode_and_verify(token) do
      {:ok, claims} ->
        case Guardian.resource_from_claims(claims) do
          {:ok, user} ->
            {:ok, assign(socket, :current_user, user)}
          {:error, _reason} ->
            :error
        end
      {:error, _reason} ->
        :error
    end
  end

  @impl true
  def connect(_payload, socket, _connection) do
    {:ok, socket}
  end

  # Socket id's are topics that allow you to identify all sockets for a given user:
  #
  #     def id(socket), do: "user_socket:#{socket.assigns.user_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #     KikoriWeb.Endpoint.broadcast("user_socket:#{user.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  @impl true
  def id(_socket), do: nil

  # Channels
  # channel "statistics:lobby", KikoriWeb.StatisticsChannel
  channel "project:*", KikoriWeb.ProjectChannel
end
