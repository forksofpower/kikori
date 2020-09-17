defmodule KikoriWeb.StatisticsChannel do
  use KikoriWeb, :channel

  alias Kikori.Statistics

  @impl true
  def join("statistics:lobby", _payload, socket) do
    {:ok, socket}
  end

  @impl true
  def handle_in("get_stats", _payload, socket) do
    {:reply, %{log_message_count: log_message_count}} = Statistics.Server.get(%{})
    IO.inspect log_message_count
    push socket, "stats", %{log_message_count: log_message_count}
    {:ok, socket}
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
