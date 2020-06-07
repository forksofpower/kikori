defmodule LogManager.Projects.Project do
  use Ecto.Schema
  import Ecto.Changeset

  alias LogManager.Accounts.User
  # @required_fields ~w(name user_id)a

  schema "projects" do
    field :name, :string
    belongs_to(:user, User, foreign_key: :user_id)

    timestamps()
  end

  @doc false
  def changeset(project, attrs) do
    project
    |> cast(attrs, [:name, :user_id])
    # |> cast_assoc(:user, required: true)
    |> validate_required([:name])
  end
end
