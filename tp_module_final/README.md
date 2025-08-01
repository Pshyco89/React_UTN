<h1 align="center">Welcome to Ronald Ecommerce 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

> E-commerce de Ronald

# tp_module_final

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto localmente:

1. Clona el repositorio en tu máquina local:

2. Accede a la carpeta del proyecto:

3. Instala las dependencias:

4. Configura las variables de entorno de Firebase en el archivo correspondiente (por ejemplo, `.env`).
5. Inicia el proyecto en modo desarrollo:

6. Abre tu navegador y accede a `http://localhost:5173` (o el puerto indicado en la consola).

---

## Configuración de la base de datos Firebase

1. Accede a [Firebase Console](https://console.firebase.google.com/) y crea un nuevo proyecto.
2. En el panel de Firebase, habilita **Firestore Database**.
3. Crea las siguientes colecciones necesarias para el proyecto:
   - `users`
   - `products`
   - `categories`
   - `carts`
   - `sales`
   - `typeUsers`
   - `counters`
4. En la colección `counters`, crea los documentos:
   - `users` con el campo `current` inicializado en `0`
   - `products` con el campo `current` inicializado en `0`
   Esto permite el autoincremento de IDs para usuarios y productos.
5. Configura las reglas de seguridad de Firestore según tus necesidades:
   - Para desarrollo puedes usar el modo de prueba.
   - Para producción, usa reglas estrictas que validen la autenticación y los permisos.
6. Obtén las credenciales de Firebase y colócalas en tu archivo de configuración (por ejemplo, `.env` o `src/Config/firebaseConfig.js`).

---

## Despliegue en servidor

1. Construye el proyecto para producción:
   
2. Sube la carpeta `dist` generada al servidor web (Apache, Nginx, Vercel, Netlify, Firebase Hosting, etc.).
3. Configura el servidor para servir archivos estáticos desde la carpeta `dist`.
4. Si usas Firebase Hosting:
   - Configura el archivo `firebase.json` según tus necesidades.
   - Ejecuta:
     
5. Verifica que las variables de entorno y la configuración de Firebase estén correctamente establecidas en el entorno de producción.

---

## Author

👤 **Ronald Rodriguez**

* Website: Ronald Rodriguez
* Github: [@Pshyco89](https://github.com/Pshyco89)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_