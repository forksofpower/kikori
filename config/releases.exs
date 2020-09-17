import Config

secret_key_base = System.get_env("SECRET_KEY_BASE")
app_port = System.get_env("APP_PORT")
app_hostname = System.get_env("APP_HOSTNAME")
db_user = System.get_env("DB_USER")
db_password = System.get_env("DB_PASSWORD")
db_host = System.get_env("DB_HOST")

config :kikori, Kikori.Endpoint,
  server: true,
  http: [:inet6, port:  4000],
  secret_key_base: secret_key_base

config :kikori,
  app_port: app_port

config :kikori,
  app_hostname: app_hostname

# Configure your database
# config :kikori, Kikori.Repo,
#   username: db_user,
#   password: db_password,
#   database: "kikori_prod",
#   hostname: db_host,
#   pool_size: 10
