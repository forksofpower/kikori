defmodule LogManagerWeb.Router do
  use LogManagerWeb, :router

  alias LogManager.Guardian

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :jwt_authenticated do
    plug Guardian.AuthPipeline
  end

  scope "/", LogManagerWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  scope "/api/v1", LogManagerWeb do
    pipe_through :api

    post "/sign-up", UserController, :create
    post "/sign-in", UserController, :sign_in
  end

  scope "/api/v1", LogManagerWeb do
    pipe_through [:api, :jwt_authenticated]
    resources "/users", UserController, only: [:index, :show]
    resources "/projects", ProjectController, except: [:new, :edit]
    get "/me", UserController, :show
  end


  # Other scopes may use custom stacks.
  # scope "/api", LogManagerWeb do
  #   pipe_through :api
  # end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: LogManagerWeb.Telemetry
    end
  end
end
