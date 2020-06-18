defmodule LogManagerWeb.ProjectChannel do
  use LogManagerWeb, :channel

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
end

