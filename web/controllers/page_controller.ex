defmodule Vector.PageController do
  use Vector.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
