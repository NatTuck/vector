defmodule Vector.ZoneControllerTest do
  use Vector.ConnCase

  alias Vector.Zone
  @valid_attrs %{attrs: "some content", name: "some content"}
  @invalid_attrs %{}

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, zone_path(conn, :index)
    assert html_response(conn, 200) =~ "Listing zones"
  end

  test "renders form for new resources", %{conn: conn} do
    conn = get conn, zone_path(conn, :new)
    assert html_response(conn, 200) =~ "New zone"
  end

  test "creates resource and redirects when data is valid", %{conn: conn} do
    conn = post conn, zone_path(conn, :create), zone: @valid_attrs
    assert redirected_to(conn) == zone_path(conn, :index)
    assert Repo.get_by(Zone, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, zone_path(conn, :create), zone: @invalid_attrs
    assert html_response(conn, 200) =~ "New zone"
  end

  test "shows chosen resource", %{conn: conn} do
    zone = Repo.insert! %Zone{}
    conn = get conn, zone_path(conn, :show, zone)
    assert html_response(conn, 200) =~ "Show zone"
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, zone_path(conn, :show, -1)
    end
  end

  test "renders form for editing chosen resource", %{conn: conn} do
    zone = Repo.insert! %Zone{}
    conn = get conn, zone_path(conn, :edit, zone)
    assert html_response(conn, 200) =~ "Edit zone"
  end

  test "updates chosen resource and redirects when data is valid", %{conn: conn} do
    zone = Repo.insert! %Zone{}
    conn = put conn, zone_path(conn, :update, zone), zone: @valid_attrs
    assert redirected_to(conn) == zone_path(conn, :show, zone)
    assert Repo.get_by(Zone, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    zone = Repo.insert! %Zone{}
    conn = put conn, zone_path(conn, :update, zone), zone: @invalid_attrs
    assert html_response(conn, 200) =~ "Edit zone"
  end

  test "deletes chosen resource", %{conn: conn} do
    zone = Repo.insert! %Zone{}
    conn = delete conn, zone_path(conn, :delete, zone)
    assert redirected_to(conn) == zone_path(conn, :index)
    refute Repo.get(Zone, zone.id)
  end
end
