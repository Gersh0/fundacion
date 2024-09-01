<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Parcial Ingeniería Web (Leer atentamente)

## Stack usado
* PostgreSQL
* Nest
* Docker

## Pasos para poner en funcionamiento

1. Clonar el repo

2. Duplicar el archivo __.env.template__ y renombrar la copia a __.env__

3. Llenar las variables de entorno definidas en el __.env__

4. Levantar el contenedor de docker
```
docker compose --env-file .env up --build -d
```

5. Reconstruir la base de datos con la semilla
```
http://localhost:3000/seed 
```