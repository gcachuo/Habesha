create table if not exists folios
(
  id          bigint                              not null primary key,
  id_donacion bigint                              not null,
  fecha       timestamp default CURRENT_TIMESTAMP not null,
  constraint foreign key folios_donaciones_id_fk (id_donacion) REFERENCES donaciones(id) on update cascade on delete cascade
) ENGINE = InnoDB character set utf8mb4;

