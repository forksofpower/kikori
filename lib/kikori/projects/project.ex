defmodule Kikori.Projects.Project do
  use Ecto.Schema
  import Ecto.Changeset

  alias Kikori.{Projects.LogMessage,Accounts.User}
  # @required_fields ~w(name user_id)a

  schema "projects" do
    field :name, :string
    field :guid, :binary_id, read_after_writes: true
    belongs_to(:user, User, foreign_key: :user_id)

    has_many :log_messages, LogMessage

    timestamps()
  end

  @doc false
  def changeset(project, attrs) do
    project
    |> cast(attrs, [:name, :user_id, :guid])
    # |> cast_assoc(:user, required: true)
    |> validate_required([:name])
  end
end
