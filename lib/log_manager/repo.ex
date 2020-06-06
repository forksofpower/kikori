defmodule LogManager.Repo do
  use Ecto.Repo,
    otp_app: :log_manager,
    adapter: Ecto.Adapters.Postgres
end
