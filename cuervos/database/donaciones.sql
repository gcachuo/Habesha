create table if not exists donaciones
(
  id         bigint auto_increment primary key,
  id_donante bigint                                 null,
  tipo       varchar(100)                           null,
  cantidad   int                                    null,
  metodo     varchar(100)                           null,
  estatus    varchar(100) default 'CREADA'          not null,
  fecha      timestamp    default CURRENT_TIMESTAMP not null
);