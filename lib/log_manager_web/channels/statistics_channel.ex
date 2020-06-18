defmodule LogManagerWeb.StatisticsChannel do
  use LogManagerWeb, :channel

  @impl true
  def join("statistics:lobby", _payload, socket) do
    {:ok, socket}
  end
end
