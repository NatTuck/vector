ExUnit.start

Mix.Task.run "ecto.create", ~w(-r Vector.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r Vector.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(Vector.Repo)

