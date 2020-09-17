defmodule Kikori.Guardian.AuthPipeline do
  use Guardian.Plug.Pipeline, otp_app: :kikori,
      module: Kikori.Guardian,
      error_handler: Kikori.AuthErrorHandler

  plug Guardian.Plug.VerifyHeader, realm: "Bearer"
  plug Guardian.Plug.EnsureAuthenticated
  plug Guardian.Plug.LoadResource
end
