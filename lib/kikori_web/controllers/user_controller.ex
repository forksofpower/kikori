defmodule KikoriWeb.UserController do
  use KikoriWeb, :controller
  require IEx

  alias Kikori.Guardian
  alias Kikori.Accounts
  alias Kikori.Accounts.User

  action_fallback KikoriWeb.FallbackController

  @doc """
  List all users
  """
  def index(conn, _params) do
    users = Accounts.list_users()
    render(conn, "index.json", users: users)
  end

  @doc """
  Create a new user
  """
  def create(conn, %{"user" => user_params}) do
    # IEx.pry
    with {:ok, %User{} = user} <- Accounts.create_user(user_params),
         {:ok, token, _claims} <- Guardian.encode_and_sign(user) do
      conn |> render("auth_success.json", %{user: user, token: token})
    else
      {:error, changeset} -> conn |> render(changeset.errors)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    render(conn, "show.json", user: user)
  end

  # GET /me
  # returns the current user
  def show(conn, _params) do
    user = Guardian.Plug.current_resource(conn)
    conn |> render("show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Accounts.get_user!(id)

    with {:ok, %User{} = user} <- Accounts.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)

    with {:ok, %User{}} <- Accounts.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end

  def sign_in(conn, %{"email" => email, "password" => password}) do
    case Accounts.token_sign_in(email, password) do
      {:ok, token, _claims} ->
        conn |> render("jwt.json", %{jwt: token})
      _ ->
        {:error, :unauthorized}
    end
  end
end
