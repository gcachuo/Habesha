drop trigger after_donaciones_update;
create trigger after_donaciones_update
  after UPDATE
  on donaciones
  for each row
begin
  if (NEW.estatus = 'COMPLETA') then
    if (NEW.tipo = 'unica') then
      set @div = 200;
    elseif (NEW.tipo = 'recurrente') then
      set @div = 10;
    end if;
    set @total = NEW.cantidad / @div;
    set @i = 0;
    folio:
      LOOP
        if (@i < @total) then
          set @max = (select max(id) + 1 from folios);
          insert into folios(id, id_donacion) VALUES (@max, NEW.id);
          set @i = @i + 1;
          iterate folio;
        end if;
        leave folio;
      end loop;
  end if;
end;