defmodule LogManager.Projects.LogMessage do
  use Ecto.Schema
  import Ecto.Changeset

  alias LogManager.Projects.Project

  schema "log_messages" do
    field :data, :string
    field :request_data, :string
    field :type, :string
    belongs_to(:project, Project, foreign_key: :project_id)

    timestamps()
  end

  @doc false
  def changeset(log_message, attrs) do
    log_message
    |> cast(attrs, [:type, :request_data, :data, :project_id])
    |> validate_required([:type, :request_data, :data, :project_id])
  end
end
