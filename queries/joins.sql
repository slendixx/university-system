
-- Ver todas las asignaturas de todas las carreras
select carrera.nombre as "carrera",
asignatura.nombre as "asignatura",
carrera_asignatura.nivel as "año",
tipo_distribucion_anual.tipo_distribucion_anual as "distribucion"
from carrera_asignatura
inner join carrera
on id_carrera = carrera.id
inner join asignatura 
on id_asignatura = asignatura.id
inner join tipo_distribucion_anual
on id_distribucion_anual = tipo_distribucion_anual.id
where carrera.nombre like "licenciatura en administracion de empresas"
order by año asc;
