# Rest-server-node

# Endpoints from server - node
 - info https://documenter.getpostman.com/view/12935750/2s8ZDcxJv7

#### Creating user

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>http://localhost:8081/api/usuarios</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | Nombre      |  required | String  | N/A  |
> | Edad        | not required | String  | N/A  |
> | Correo      |  required | String  | N/A  |
> | Password      |  required | String  | N/A  |
> | Rol      |  required | String  | N/A  |
 
 
##### Responses
 
>| http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"usuario:{some user}"}`                             |
> | `400`         | `application/json`                | `{"msj":"El nombre es obligatorio","message":"Bad Request"}`                            |
> | `400`         | `application/json`                | `{"msg": "El correo no es válido","message":"Bad Request"}`                            |
 > | `400`         | `application/json`                | `{"msg": "El correo ya esta registrado","message":"Bad Request"}`                            |
 > | `400`         | `application/json`                | `{"msg": "El password debe de ser mas de 6 letras","message":"Bad Request"}`                            |
 > | `400`         | `application/json`                | `{ "msg": "El rol  no esta registrado en la BD","message":"Bad Request"}`                            |


</details>
