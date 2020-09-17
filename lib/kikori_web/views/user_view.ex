defmodule KikoriWeb.UserView do
  use KikoriWeb, :view
  alias KikoriWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      email: user.email,
      name: user.name
    }
  end

  def render("jwt.json", %{jwt: jwt}) do
    %{jwt: jwt}
  end

  def render("auth_success.json", %{user: user, token: token}) do
    %{
      data: %{
        user: render_one(user, UserView, "user.json"),
        token: token
      }
    }
  end
end
