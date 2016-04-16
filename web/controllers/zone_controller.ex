defmodule Vector.ZoneController do
  use Vector.Web, :controller

  alias Vector.Zone

  plug :scrub_params, "zone" when action in [:create, :update]

  def index(conn, _params) do
    zones = Repo.all(Zone)
    render(conn, "index.html", zones: zones)
  end

  def new(conn, _params) do
    changeset = Zone.changeset(%Zone{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"zone" => zone_params}) do
    changeset = Zone.changeset(%Zone{}, zone_params)

    case Repo.insert(changeset) do
      {:ok, _zone} ->
        conn
        |> put_flash(:info, "Zone created successfully.")
        |> redirect(to: zone_path(conn, :index))
      {:error, changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    zone = Repo.get!(Zone, id)
    render(conn, "show.html", zone: zone)
  end

  def edit(conn, %{"id" => id}) do
    zone = Repo.get!(Zone, id)
    changeset = Zone.changeset(zone)
    render(conn, "edit.html", zone: zone, changeset: changeset)
  end

  def update(conn, %{"id" => id, "zone" => zone_params}) do
    zone = Repo.get!(Zone, id)
    changeset = Zone.changeset(zone, zone_params)

    case Repo.update(changeset) do
      {:ok, zone} ->
        conn
        |> put_flash(:info, "Zone updated successfully.")
        |> redirect(to: zone_path(conn, :show, zone))
      {:error, changeset} ->
        render(conn, "edit.html", zone: zone, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    zone = Repo.get!(Zone, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(zone)

    conn
    |> put_flash(:info, "Zone deleted successfully.")
    |> redirect(to: zone_path(conn, :index))
  end
end
