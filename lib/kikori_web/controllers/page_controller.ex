defmodule KikoriWeb.PageController do
  use KikoriWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
