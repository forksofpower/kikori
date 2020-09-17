defmodule Kikori.Statistics.Server do
  use GenServer
  # import IEx
  alias Kikori.Projects
  alias Kikori.Statistics.State
  # alias Kikori.Repo

  def start_link(_) do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  def get(_pid) do
    GenServer.call(__MODULE__, :get)
  end

  def increment(pid, amount) do
    GenServer.call(pid, {:add, amount})
  end


  @impl true
  def init(_args) do
    Process.send_after(self(), :started, 0)
    {:ok, %{log_message_count: 0}}
  end

  @impl true
  def handle_info(:started, %{}) do
    # state = %State{}
    # IEx.pry
    data = Projects.log_message_count_estimate()

    count = data.rows |> List.flatten |> Enum.at(0) |> Kernel.trunc
    state = %{log_message_count: count}
    {:noreply, state}
  end

  @impl true
  def handle_call(:get, _from, state) do
    {:reply, state}
  end

  @impl true
  def handle_call(:pop, _from, [head | tail]) do
    {:reply, head, tail}
  end

  @impl true
  def handle_cast({:push, element}, state) do
    {:noreply, [element | state]}
  end
end
