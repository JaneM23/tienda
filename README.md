# Tienda de Videojuegos — JWT + OAuth + Carrito (Node/Express + Docker)

Aplicación demo con **autenticación JWT** y **OAuth (Google)**, un **carrito de compras** protegido y un **frontend** simple (HTML/CSS/JS).  
Se ejecuta en **Docker** con `docker-compose` y expone la app en `http://localhost:3000`.

---

## 🎯 Descripción breve

- **Login con usuario/contraseña** → emite **JWT**.
- **Login con Google OAuth 2.0** (opcional) → también termina emitiendo un **JWT** propio.
- **Rutas protegidas** con JWT (perfil y carrito).
- Carrito: **listar, agregar, actualizar, eliminar, vaciar y checkout**.
- Frontend SPA con token en `localStorage` e imágenes del catálogo.

---

## ✅ Pasos realizados (resumen)

1. Backend en **Express** con rutas:
   - `POST /api/login` (emite JWT).
   - `GET /api/perfil` (protegida).
   - Carrito:
     - `GET /api/carrito`
     - `POST /api/carrito/add`
     - `PUT /api/carrito/update/:id`
     - `DELETE /api/carrito/remove/:id`
     - `DELETE /api/carrito/clear`
     - `POST /api/carrito/checkout`
2. **Middleware JWT**: valida `Authorization: Bearer <token>` y carga `req.user`.
3. **OAuth Google** con `passport-google-oauth20`: tras callback se genera JWT y se guarda en el navegador.
4. **Frontend** (`public/index.html`): login + tienda + carrito, colores pastel, imágenes y manejo de token.
5. **Dockerización**:
   - `Dockerfile` (Node 20 alpine, multi-stage).
   - `docker-compose.yml` con `env_file: .env`, healthcheck y puerto mapeado.
6. **Pruebas** con Postman (flujos positivos/negativos) y desde el navegador.

