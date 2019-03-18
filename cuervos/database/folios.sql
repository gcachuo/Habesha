create table if not exists folios
(
  id          bigint                              not null primary key,
  id_donacion bigint                              not null,
  fecha       timestamp default CURRENT_TIMESTAMP not null,
  constraint folios_ibfk_1
    foreign key (id_donacion) references donaciones (id)
      on update cascade on delete cascade
)
  engine = InnoDB
  collate = utf8mb4_general_ci;