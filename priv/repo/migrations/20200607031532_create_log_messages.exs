defmodule LogManager.Repo.Migrations.CreateLogMessages do
  use Ecto.Migration

  def change do
    create table(:log_messages) do
      add :type, :string
      add :request_data, :text
      add :data, :text
      add :project_id, references(:projects, on_delete: :nothing)

      timestamps()
    end

    create index(:log_messages, [:project_id])
  end
end
