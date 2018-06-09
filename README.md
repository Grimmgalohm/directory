# Directory CLI
## ¿Qué debes hacer?
1. Clona este repositorio `git clone https://github.com/CodeRoomMX/coffee-shop-cli.git`.

2. Crea tu propio repositorio en Github.

3. Cambia la dirección remota de tu repositorio local de origin a upstream: `git remote rename origin upstream`.

4. Agrega la dirección remota de tu nuevo repositorio de Github a tu repositorio local: `git remote add origin https://github.com/{tu_usuario}/{tu_repositorio}`.

5. En la terminal ve a la carpeta clonada y configura tu package.json con el siguiente comando: `npm init`.

6. Usando el comando `npm install`, instala las bibliotecas de código necesarias:
  * [**mongoose**](https://www.npmjs.com/package/mongoose)
  * [**inquirer**](https://www.npmjs.com/package/inquirer)
  * [**commander**](https://www.npmjs.com/package/commander)
  * [**colors**](https://www.npmjs.com/package/colors)

7. Usa las bibliotecas antes mencionadas para que ejecutando el comando `./index.js` podamos tener dos comandos, `create` crear un nuevo contacto, `all` para leer la lista de contactos guardados. 

Todos los contactos deben contener las siguientes propiedades:
  * Nombre y apellidos
  * Correo electrónico
  * Password(confirmar que el password sea el que el usuario desea antes de guardar)
  * Lista de teléfonos *(Móvil: 55555555, Casa: 55555555)*

## Bonus!!!
1. Crea un nuevo comando `one --name <name>` para obtener sólo el contacto con el nombre que le pasamos al comando en el parámetro name.
2. Usa la biblioteca `bcryptjs` para encriptar el password en la base datos y que nadie que no sea el propietario de la cuenta pueda saber cual es el valor real del password.
3. ¿Con los datos ya guardados, cuales crees que serían los pasos a seguir para crear un login?
