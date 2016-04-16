defmodule Vector.MobController do
  use Vector.Web, :controller

  alias Vector.Mob

  plug :scrub_params, "mob" when action in [:create, :update]

  def index(conn, _params) do
    mobs = Repo.all(Mob)
    render(conn, "index.html", mobs: mobs)
  end

  def new(conn, _params) do
    changeset = Mob.changeset(%Mob{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"mob" => mob_params}) do
    changeset = Mob.changeset(%Mob{}, mob_params)

    case Repo.insert(changeset) do
      {:ok, _mob} ->
        conn
        |> put_flash(:info, "Mob created successfully.")
        |> redirect(to: mob_path(conn, :index))
      {:error, changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    mob = Repo.get!(Mob, id)
    render(conn, "show.html", mob: mob)
  end

  def edit(conn, %{"id" => id}) do
    mob = Repo.get!(Mob, id)
    changeset = Mob.changeset(mob)
    render(conn, "edit.html", mob: mob, changeset: changeset)
  end

  def update(conn, %{"id" => id, "mob" => mob_params}) do
    mob = Repo.get!(Mob, id)
    changeset = Mob.changeset(mob, mob_params)

    case Repo.update(changeset) do
      {:ok, mob} ->
        conn
        |> put_flash(:info, "Mob updated successfully.")
        |> redirect(to: mob_path(conn, :show, mob))
      {:error, changeset} ->
        render(conn, "edit.html", mob: mob, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    mob = Repo.get!(Mob, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(mob)

    conn
    |> put_flash(:info, "Mob deleted successfully.")
    |> redirect(to: mob_path(conn, :index))
  end
end
