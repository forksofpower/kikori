defmodule LogManager.Projects do
  @moduledoc """
  The Projects context.
  """

  import Ecto.Query, warn: false
  alias LogManager.Repo

  alias LogManager.Projects.{Project,LogMessage}

  @doc """
  Returns the list of projects.

  ## Examples

      iex> list_projects()
      [%Project{}, ...]

  """
  def list_projects do
    Repo.all from p in Project, preload: [:user]
  end

  @doc """
  Gets a single project.

  Raises `Ecto.NoResultsError` if the Project does not exist.

  ## Examples

      iex> get_project!(123)
      %Project{}

      iex> get_project!(456)
      ** (Ecto.NoResultsError)

  """
  def get_project!(id) do
    Repo.get!(Project, id) |> Repo.preload(:user)
  end

  @doc """
  Creates a project.

  ## Examples

      iex> create_project(%{field: value})
      {:ok, %Project{}}

      iex> create_project(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_project(attrs \\ %{}) do
    %Project{}
    |> Project.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a project.

  ## Examples

      iex> update_project(project, %{field: new_value})
      {:ok, %Project{}}

      iex> update_project(project, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_project(%Project{} = project, attrs) do
    project
    |> Project.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a project.

  ## Examples

      iex> delete_project(project)
      {:ok, %Project{}}

      iex> delete_project(project)
      {:error, %Ecto.Changeset{}}

  """
  def delete_project(%Project{} = project) do
    Repo.delete(project)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking project changes.

  ## Examples

      iex> change_project(project)
      %Ecto.Changeset{data: %Project{}}

  """
  def change_project(%Project{} = project, attrs \\ %{}) do
    Project.changeset(project, attrs)
  end

  alias LogManager.Projects.LogMessage

  @doc """
  Returns the list of log_messages.

  ## Examples

      iex> list_log_messages()
      [%LogMessage{}, ...]

  """
  def list_log_messages do
    Repo.all from log in LogMessage, preload: [:project]
  end

  def list_project_log_messages(project_id) do
    Repo.get(Project, project_id)
      |> Ecto.assoc(:log_messages)
      |> Repo.all
  end

  @doc """
  Gets a single log_message.

  Raises `Ecto.NoResultsError` if the Log message does not exist.

  ## Examples

      iex> get_log_message!(123)
      %LogMessage{}

      iex> get_log_message!(456)
      ** (Ecto.NoResultsError)

  """
  def get_log_message!(id), do: Repo.get!(LogMessage, id) |> Repo.preload(:project)

  @doc """
  Creates a log_message.

  ## Examples

      iex> create_log_message(%{field: value})
      {:ok, %LogMessage{}}

      iex> create_log_message(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_log_message(attrs \\ %{}) do
    %LogMessage{}
    |> LogMessage.changeset(attrs)
    |> Repo.insert()
    # |> Repo.preload(:project)
  end

  @doc """
  Updates a log_message.

  ## Examples

      iex> update_log_message(log_message, %{field: new_value})
      {:ok, %LogMessage{}}

      iex> update_log_message(log_message, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_log_message(%LogMessage{} = log_message, attrs) do
    log_message
    |> LogMessage.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a log_message.

  ## Examples

      iex> delete_log_message(log_message)
      {:ok, %LogMessage{}}

      iex> delete_log_message(log_message)
      {:error, %Ecto.Changeset{}}

  """
  def delete_log_message(%LogMessage{} = log_message) do
    Repo.delete(log_message)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking log_message changes.

  ## Examples

      iex> change_log_message(log_message)
      %Ecto.Changeset{data: %LogMessage{}}

  """
  def change_log_message(%LogMessage{} = log_message, attrs \\ %{}) do
    LogMessage.changeset(log_message, attrs)
  end
end
