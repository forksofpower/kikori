defmodule LogManager.Repo.Migrations.AddGuidToProjects do
  use Ecto.Migration

  def change do
    alter table(:projects) do
      add(:guid, :uuid, default: fragment("uuid_generate_v4()"))
    end
  end
end
