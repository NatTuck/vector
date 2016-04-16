defmodule Vector.Repo.Migrations.CreateZone do
  use Ecto.Migration

  def change do
    create table(:zones) do
      add :name, :string
      add :attrs, :text

      timestamps
    end

  end
end
