defmodule LogManager.Projects.LogMessage do
  use Ecto.Schema
  import Ecto.Changeset

  alias LogManager.Projects.Project

  @derive {Jason.Encoder, only: [:id, :type, :request_data, :message, :project_id, :level, :inserted_at]}
  schema "log_messages" do
    field :message, :string
    field :request_data, :string
    field :level, :string
    field :type, :string, default: "default"
    belongs_to(:project, Project, foreign_key: :project_id)

    timestamps()
  end

  @doc false
  def changeset(log_message, attrs) do
    log_message
    |> cast(attrs, [:type, :request_data, :message, :project_id, :level])
    |> validate_required([:message, :project_id])
  end
end
