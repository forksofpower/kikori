defmodule LogManagerWeb.PageController do
  use LogManagerWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
