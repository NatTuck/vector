defmodule Vector.ZoneTest do
  use Vector.ModelCase

  alias Vector.Zone

  @valid_attrs %{attrs: "some content", name: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Zone.changeset(%Zone{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Zone.changeset(%Zone{}, @invalid_attrs)
    refute changeset.valid?
  end
end
