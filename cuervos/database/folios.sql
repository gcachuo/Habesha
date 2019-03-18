create table if not exists folios
(
  id          bigint                              not null primary key,
  id_donacion bigint                              not null,
  fecha       timestamp default CURRENT_TIMESTAMP not null
);
INSERT INTO folios (id, id_donacion)
VALUES (0, 0);