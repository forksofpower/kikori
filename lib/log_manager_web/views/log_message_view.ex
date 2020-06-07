defmodule LogManagerWeb.LogMessageView do
  use LogManagerWeb, :view
  alias LogManagerWeb.LogMessageView

  def render("index.json", %{log_messages: log_messages}) do
    %{data: render_many(log_messages, LogMessageView, "log_message.json")}
  end

  def render("show.json", %{log_message: log_message}) do
    %{data: render_one(log_message, LogMessageView, "log_message.json")}
  end

  def render("log_message.json", %{log_message: log_message}) do
    %{id: log_message.id,
      type: log_message.type,
      request_data: log_message.request_data,
      data: log_message.data}
  end
end