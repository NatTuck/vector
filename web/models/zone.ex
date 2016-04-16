defmodule Vector.Zone do
  use Vector.Web, :model

  schema "zones" do
    field :name, :string
    field :attrs, :string

    timestamps
  end

  @required_fields ~w(name attrs)
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
