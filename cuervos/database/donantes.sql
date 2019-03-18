create table if not exists donantes
(
  id        bigint auto_increment primary key,
  nombre    varchar(100)                           not null,
  apellidos varchar(100)                           not null,
  telefono  varchar(100)                           null,
  correo    varchar(100)                           not null,
  ciudad    varchar(200)                           null,
  estado    varchar(200)                           null,
  pais      varchar(200)                           null,
  estatus   varchar(100) default 'CREADO'          not null,
  fecha     timestamp    default CURRENT_TIMESTAMP not null,
  constraint folios_correo_uindex unique (correo)
) ENGINE = InnoDB
  character set utf8mb4;

