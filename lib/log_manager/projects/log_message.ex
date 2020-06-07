defmodule LogManager.Projects.LogMessage do
  use Ecto.Schema
  import Ecto.Changeset

  schema "log_messages" do
    field :data, :string
    field :request_data, :string
    field :type, :string
    field :project_id, :id

    timestamps()
  end

  @doc false
  def changeset(log_message, attrs) do
    log_message
    |> cast(attrs, [:type, :request_data, :data])
    |> validate_required([:type, :request_data, :data])
  end
end
