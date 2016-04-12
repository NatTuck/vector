defmodule Vector.PageController do
  use Vector.Web, :controller

  def index(conn, _params) do
    Vector.Endpoint.broadcast_from! self(), "sessions:demo", "state", %{foo: "bar"} 
    render conn, "index.html"
  end

  def play(conn, _params) do
    render conn, "play.html"
  end
end
