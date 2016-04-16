defmodule Vector.MobTest do
  use Vector.ModelCase

  alias Vector.Mob

  @valid_attrs %{attrs: "some content", name: "some content", x: "120.5", y: "120.5"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Mob.changeset(%Mob{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Mob.changeset(%Mob{}, @invalid_attrs)
    refute changeset.valid?
  end
end
