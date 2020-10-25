defmodule Kikori.ProjectsTest do
  use Kikori.DataCase

  alias Kikori.Projects

  describe "projects" do
    alias Kikori.Projects.Project

    @valid_attrs %{
      name: "Test Project"
    }
    @update_attrs %{name: "Updated Test Project"}
    @invalid_attrs %{name: nil}

    def project_fixture(attrs \\ %{}) do
      {:ok, project} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Projects.create_project()

      project
    end

    test "list_projects/0 returns all projects" do
      project = project_fixture()
      assert Projects.list_projects() == [project]
    end

    test "get_project!/1 returns the project with given id" do
      project = project_fixture()
      assert Projects.get_project!(project.id) == project
    end

    test "create_project/1 with valid data creates a project" do
      assert {:ok, %Project{} = project} = Projects.create_project(@valid_attrs)
      assert project.name == "Test Project"
    end

    test "create_project/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Projects.create_project(@invalid_attrs)
    end

    test "update_project/2 with valid data updates the project" do
      project = project_fixture()
      assert {:ok, %Project{} = project} = Projects.update_project(project, @update_attrs)
      assert project.name == "Updated Test Project"
    end

    test "update_project/2 with invalid data returns error changeset" do
      project = project_fixture()
      assert {:error, %Ecto.Changeset{}} = Projects.update_project(project, @invalid_attrs)
      assert project == Projects.get_project!(project.id)
    end

    test "delete_project/1 deletes the project" do
      project = project_fixture()
      assert {:ok, %Project{}} = Projects.delete_project(project)
      assert_raise Ecto.NoResultsError, fn -> Projects.get_project!(project.id) end
    end

    test "change_project/1 returns a project changeset" do
      project = project_fixture()
      assert %Ecto.Changeset{} = Projects.change_project(project)
    end
  end

  # describe "log_messages" do
  #   alias Kikori.Projects.LogMessage

  #   @valid_attrs %{data: "some data", request_data: "some request_data", type: "some type"}
  #   @update_attrs %{data: "some updated data", request_data: "some updated request_data", type: "some updated type"}
  #   @invalid_attrs %{data: nil, request_data: nil, type: nil}

  #   def log_message_fixture(attrs \\ %{}) do
  #     {:ok, log_message} =
  #       attrs
  #       |> Enum.into(@valid_attrs)
  #       |> Projects.create_log_message()

  #     log_message
  #   end

  #   test "list_log_messages/0 returns all log_messages" do
  #     log_message = log_message_fixture()
  #     assert Projects.list_log_messages() == [log_message]
  #   end

  #   test "get_log_message!/1 returns the log_message with given id" do
  #     log_message = log_message_fixture()
  #     assert Projects.get_log_message!(log_message.id) == log_message
  #   end

  #   test "create_log_message/1 with valid data creates a log_message" do
  #     assert {:ok, %LogMessage{} = log_message} = Projects.create_log_message(@valid_attrs)
  #     assert log_message.data == "some data"
  #     assert log_message.request_data == "some request_data"
  #     assert log_message.type == "some type"
  #   end

  #   test "create_log_message/1 with invalid data returns error changeset" do
  #     assert {:error, %Ecto.Changeset{}} = Projects.create_log_message(@invalid_attrs)
  #   end

  #   test "update_log_message/2 with valid data updates the log_message" do
  #     log_message = log_message_fixture()
  #     assert {:ok, %LogMessage{} = log_message} = Projects.update_log_message(log_message, @update_attrs)
  #     assert log_message.data == "some updated data"
  #     assert log_message.request_data == "some updated request_data"
  #     assert log_message.type == "some updated type"
  #   end

  #   test "update_log_message/2 with invalid data returns error changeset" do
  #     log_message = log_message_fixture()
  #     assert {:error, %Ecto.Changeset{}} = Projects.update_log_message(log_message, @invalid_attrs)
  #     assert log_message == Projects.get_log_message!(log_message.id)
  #   end

  #   test "delete_log_message/1 deletes the log_message" do
  #     log_message = log_message_fixture()
  #     assert {:ok, %LogMessage{}} = Projects.delete_log_message(log_message)
  #     assert_raise Ecto.NoResultsError, fn -> Projects.get_log_message!(log_message.id) end
  #   end

  #   test "change_log_message/1 returns a log_message changeset" do
  #     log_message = log_message_fixture()
  #     assert %Ecto.Changeset{} = Projects.change_log_message(log_message)
  #   end
  # end
end
