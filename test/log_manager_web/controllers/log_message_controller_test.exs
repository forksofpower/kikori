defmodule LogManagerWeb.LogMessageControllerTest do
  use LogManagerWeb.ConnCase

  alias LogManager.Projects
  alias LogManager.Projects.LogMessage

  @create_attrs %{
    data: "some data",
    request_data: "some request_data",
    type: "some type"
  }
  @update_attrs %{
    data: "some updated data",
    request_data: "some updated request_data",
    type: "some updated type"
  }
  @invalid_attrs %{data: nil, request_data: nil, type: nil}

  def fixture(:log_message) do
    {:ok, log_message} = Projects.create_log_message(@create_attrs)
    log_message
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all log_messages", %{conn: conn} do
      conn = get(conn, Routes.log_message_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create log_message" do
    test "renders log_message when data is valid", %{conn: conn} do
      conn = post(conn, Routes.log_message_path(conn, :create), log_message: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.log_message_path(conn, :show, id))

      assert %{
               "id" => id,
               "data" => "some data",
               "request_data" => "some request_data",
               "type" => "some type"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.log_message_path(conn, :create), log_message: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update log_message" do
    setup [:create_log_message]

    test "renders log_message when data is valid", %{conn: conn, log_message: %LogMessage{id: id} = log_message} do
      conn = put(conn, Routes.log_message_path(conn, :update, log_message), log_message: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.log_message_path(conn, :show, id))

      assert %{
               "id" => id,
               "data" => "some updated data",
               "request_data" => "some updated request_data",
               "type" => "some updated type"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, log_message: log_message} do
      conn = put(conn, Routes.log_message_path(conn, :update, log_message), log_message: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete log_message" do
    setup [:create_log_message]

    test "deletes chosen log_message", %{conn: conn, log_message: log_message} do
      conn = delete(conn, Routes.log_message_path(conn, :delete, log_message))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.log_message_path(conn, :show, log_message))
      end
    end
  end

  defp create_log_message(_) do
    log_message = fixture(:log_message)
    %{log_message: log_message}
  end
end
