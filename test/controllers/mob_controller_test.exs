defmodule Vector.MobControllerTest do
  use Vector.ConnCase

  alias Vector.Mob
  @valid_attrs %{attrs: "some content", name: "some content", x: "120.5", y: "120.5"}
  @invalid_attrs %{}

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, mob_path(conn, :index)
    assert html_response(conn, 200) =~ "Listing mobs"
  end

  test "renders form for new resources", %{conn: conn} do
    conn = get conn, mob_path(conn, :new)
    assert html_response(conn, 200) =~ "New mob"
  end

  test "creates resource and redirects when data is valid", %{conn: conn} do
    conn = post conn, mob_path(conn, :create), mob: @valid_attrs
    assert redirected_to(conn) == mob_path(conn, :index)
    assert Repo.get_by(Mob, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, mob_path(conn, :create), mob: @invalid_attrs
    assert html_response(conn, 200) =~ "New mob"
  end

  test "shows chosen resource", %{conn: conn} do
    mob = Repo.insert! %Mob{}
    conn = get conn, mob_path(conn, :show, mob)
    assert html_response(conn, 200) =~ "Show mob"
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, mob_path(conn, :show, -1)
    end
  end

  test "renders form for editing chosen resource", %{conn: conn} do
    mob = Repo.insert! %Mob{}
    conn = get conn, mob_path(conn, :edit, mob)
    assert html_response(conn, 200) =~ "Edit mob"
  end

  test "updates chosen resource and redirects when data is valid", %{conn: conn} do
    mob = Repo.insert! %Mob{}
    conn = put conn, mob_path(conn, :update, mob), mob: @valid_attrs
    assert redirected_to(conn) == mob_path(conn, :show, mob)
    assert Repo.get_by(Mob, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    mob = Repo.insert! %Mob{}
    conn = put conn, mob_path(conn, :update, mob), mob: @invalid_attrs
    assert html_response(conn, 200) =~ "Edit mob"
  end

  test "deletes chosen resource", %{conn: conn} do
    mob = Repo.insert! %Mob{}
    conn = delete conn, mob_path(conn, :delete, mob)
    assert redirected_to(conn) == mob_path(conn, :index)
    refute Repo.get(Mob, mob.id)
  end
end
