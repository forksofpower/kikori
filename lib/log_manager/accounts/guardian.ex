defmodule LogManager.Guardian do
  # @behaviour Guardian.Serializer
  use Guardian, otp_app: :log_manager

  alias LogManager.Accounts

  # def subject_for_token(user, _claims) do
  #   {:ok, to_string(user.id)}
  # end

  # # def subject_for_token(_, _) do
  # #   {:error, :reason_for_error}
  # # end

  # def resource_from_claims(claims) do
  #   # def resource_from_claims(%{"sub" => id}) do
  #   id = claims["sub"]
  #   user = Accounts.get_user!(id)
  #   {:ok, user}
  # rescue
  #   Ecto.NoResultsError -> { :error, :resource_not_found }
  # end
  def subject_for_token(user, _claims) do
    sub = to_string(user.id)
    {:ok, sub}
  end

  def subject_for_token(_, _) do
    {:error, :reason_for_error}
  end

  def resource_from_claims(claims) do
    id = claims["sub"]
    resource = Accounts.get_user!(id)
    {:ok,  resource}
  end

  def resource_from_claims(_claims) do
    {:error, :reason_for_error}
  end
end
