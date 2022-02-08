use university;
-- asignaturas dictadas por cada profesor
SELECT CONCAT(usuario.nombre," ",usuario.apellido ) AS "Profesor",
asignatura.nombre as "asignatura" from profesor_asignatura
inner join asignatura
on profesor_asignatura.id_asignatura = asignatura.id
inner join usuario
on profesor_asignatura.id_profesor = usuario.id
where usuario.tipo_usuario = 11;

-- todos los profesores
/*
SELECT nombre, apellido FROM usuario
WHERE tipo_usuario = 11;
*/