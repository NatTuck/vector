defmodule Vector.Router do
  use Vector.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Vector do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/play", PageController, :play

    resources "/mobs", MobController
    resources "/zones", ZoneController
  end

  scope "/api", Vector do
    pipe_through :api
  end
end
