defmodule LogManager.Statistics do
  use GenServer

  alias LogManager.Projects
  alias LogManager.Statistics.State
  # alias LogManager.Repo

  def start_link(_) do
    GenServer.start_link(__MODULE__, %{})
  end

  @impl true
  def init(_args) do
    Process.send_after(self(), :started, 0)
    {:ok, %State{}}
  end

  @impl true
  def handle_info(:started, %{}) do
    state = %State{}

    with {:ok, %Postgrex.Result{} = data} <- Projects.log_message_count_estimate() do
      IO.inspect(data)

      # count = List.flatten data[:rows]
    end
    # state = %State{log_message_count: count}
    # IO.inspect(state)
    {:noreply, %{}}
  end

  @impl true
  def handle_call(:pop, _from, [head | tail]) do
    {:reply, head, tail}
  end

  # @impl true
  # def handle_call(:get, _state) do

  # end

  @impl true
  def handle_cast({:push, element}, state) do
    {:noreply, [element | state]}
  end
end
