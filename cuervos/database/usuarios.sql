create table if not exists usuarios
(
  id       bigint auto_increment primary key,
  usuario  varchar(100)     not null,
  password varchar(255)     not null,
  estatus  bit default b'1' not null,
  constraint usuarios_usuario_uindex unique (usuario)
)
  engine = InnoDB
  collate = utf8mb4_general_ci;