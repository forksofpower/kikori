defmodule LogManagerWeb.ProjectView do
  use LogManagerWeb, :view
  alias LogManagerWeb.ProjectView

  def render("index.json", %{projects: projects}) do
    %{projects: render_many(projects, ProjectView, "project.json")}
  end

  def render("show.json", %{project: project}) do
    %{project: render_one(project, ProjectView, "project.json")}
  end

  def render("project.json", %{project: project}) do
    %{id: project.id,
      name: project.name}
  end
end
