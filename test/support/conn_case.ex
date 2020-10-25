defmodule KikoriWeb.ConnCase do
  @moduledoc """
  This module defines the test case to be used by
  tests that require setting up a connection.

  Such tests rely on `Phoenix.ConnTest` and also
  import other functionality to make it easier
  to build common data structures and query the data layer.

  Finally, if the test case interacts with the database,
  we enable the SQL sandbox, so changes done to the database
  are reverted at the end of every test. If you are using
  PostgreSQL, you can even run database tests asynchronously
  by setting `use KikoriWeb.ConnCase, async: true`, although
  this option is not recommended for other databases.
  """

  use ExUnit.CaseTemplate

  using do
    quote do
      # Import conveniences for testing with connections
      import Plug.Conn
      import Phoenix.ConnTest
      import KikoriWeb.ConnCase

      alias KikoriWeb.Router.Helpers, as: Routes

      # The default endpoint for testing
      @endpoint KikoriWeb.Endpoint
    end
  end

  setup tags do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(Kikori.Repo)

    unless tags[:async] do
      Ecto.Adapters.SQL.Sandbox.mode(Kikori.Repo, {:shared, self()})
    end

    {conn, user} = if tags[:authenticated] do
      {:ok, user} = Kikori.Accounts.create_user(%{username: "forksofpower", email: "forksofpower@god.com", password: "TestPassword11!", password_confirmation: "TestPassword11!"})

      conn = conn
      |> Plug.Session.call(@)
    else
      {Phoenix.ConnTest.build_conn(), nil}
    end

    {:ok, conn: conn, user: user}
  end
end
