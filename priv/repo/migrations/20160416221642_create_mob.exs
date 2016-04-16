defmodule Vector.Repo.Migrations.CreateMob do
  use Ecto.Migration

  def change do
    create table(:mobs) do
      add :name, :string
      add :x, :float
      add :y, :float
      add :attrs, :text

      timestamps
    end

  end
end
