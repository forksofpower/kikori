defmodule Kikori.Repo.Migrations.CreateLogMessages do
  use Ecto.Migration

  def change do
    create table(:log_messages) do
      add :type, :string
      add :request_data, :text
      add :message, :text
      add :level, :string
      add :project_id, references(:projects, on_delete: :nothing)

      timestamps()
    end

    create index(:log_messages, [:project_id])
  end
end
