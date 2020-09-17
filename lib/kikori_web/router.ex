defmodule KikoriWeb.Router do
  use KikoriWeb, :router

  alias Kikori.Guardian

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug CORSPlug, origin: ["http://localhost:3000", "http//localhost:4000"], headers: ["Authorization", "Content-Type", "Accept", "Origin", "User-Agent", "DNT","Cache-Control", "X-Mx-ReqToken", "Keep-Alive", "X-Requested-With", "If-Modified-Since", "Bearer", "X-File-Name"]
    # plug CORSPlug, origin: &__MODULE__.cors_preflight/0, max_age: 86400,
    plug :accepts, ["json"]
  end

  pipeline :jwt_authenticated do
    plug Guardian.AuthPipeline
  end

  scope "/", KikoriWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  scope "/api/v1", KikoriWeb do
    # public
    pipe_through :api

    post "/signup", UserController, :create
    options "/signup", UserController, :options
    post "/signin", UserController, :sign_in
    options "/signin", UserController, :options

    # private
    pipe_through :jwt_authenticated

    resources "/users", UserController, only: [:index, :show]
    resources "/projects", ProjectController, except: [:new, :edit] do
      resources "/logs", LogMessageController, only: [:create, :index, :show]
      options "/logs", LogMessageController, :options
    end
    options "/projects", ProjectController, :options

    resources "/logs", LogMessageController, except: [:new, :edit]
    get "/me", UserController, :show
    options "/me", UserController, :options

    post "/commit", LogMessageController, :create
    options "/commit", LogMessageController, :options
  end

  # scope "/api/v1", KikoriWeb do
    # private
    # authorize with api token & client id
    # pipe_through :token_authenticated
  # end


  # Other scopes may use custom stacks.
  # scope "/api", KikoriWeb do
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
      live_dashboard "/dashboard", metrics: KikoriWeb.Telemetry
    end
  end
end
