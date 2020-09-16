# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :kikori,
  ecto_repos: [Kikori.Repo]

# Configures the endpoint
config :kikori, KikoriWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "whBTKkImubRyrK+FsJSgmiJjWiDBqit+4vlJqeYvEKnhQPI5BPUTI9J49yxI6//0",
  render_errors: [view: KikoriWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Kikori.PubSub,
  live_view: [signing_salt: "dS4eNi7k"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Guardian Auth
config :kikori, Kikori.Guardian,
        issuer: "Kikori",
        secret_key: "I1L3XdEs8+JyRTTue5VWDUWZ0mFya06OKp6LHOSpLO3si51ht9HZxd3gpmTsbmA5"
  # allowed_algos: ["HS512"], # optional
  # verify_module: Guardian.JWT,  # optional
  # ttl: { 30, :days },
  # allowed_drift: 2000,
  # verify_issuer: true, # optional

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
