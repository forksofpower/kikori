defmodule Kikori.Repo do
  use Ecto.Repo,
    otp_app: :kikori,
    adapter: Ecto.Adapters.Postgres
end
