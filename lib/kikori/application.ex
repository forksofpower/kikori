defmodule Kikori.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Kikori.Repo,
      # Start the Telemetry supervisor
      KikoriWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Kikori.PubSub},
      # Start the Endpoint (http/https)
      # Start a worker by calling: Kikori.Worker.start_link(arg)
      {Kikori.Statistics.Server, %{}},
      KikoriWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Kikori.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    KikoriWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
