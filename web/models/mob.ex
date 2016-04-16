defmodule Vector.Mob do
  use Vector.Web, :model

  schema "mobs" do
    field :name, :string
    field :x, :float
    field :y, :float
    field :attrs, :string

    timestamps
  end

  @required_fields ~w(name x y attrs)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
