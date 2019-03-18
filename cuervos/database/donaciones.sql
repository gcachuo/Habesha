create table if not exists donaciones
(
  id         bigint auto_increment primary key,
  id_donante bigint                                 null,
  tipo       varchar(100)                           null,
  cantidad   int                                    null,
  metodo     varchar(100)                           null,
  estatus    varchar(100) default 'CREADA'          not null,
  fecha      timestamp    default CURRENT_TIMESTAMP not null,
  constraint donaciones_donantes_id_fk foreign key (id_donante) references donantes (id) on update cascade on delete cascade
) ENGINE = InnoDB character set utf8mb4;

