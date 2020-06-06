defmodule LogManager.Guardian.AuthPipeline do
  use Guardian.Plug.Pipeline, otp_app: :log_manager,
      module: LogManager.Guardian,
      error_handler: LogManager.AuthErrorHandler

  plug Guardian.Plug.VerifyHeader, realm: "Bearer"
  plug Guardian.Plug.EnsureAuthenticated
  plug Guardian.Plug.LoadResource
end
