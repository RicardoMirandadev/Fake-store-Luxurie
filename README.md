# 🛍️ Luxurie — Catálogo de Tienda (Fake Store)

Tienda en línea de catálogo construida con **React + Vite**, que consume la API pública
[FakeStore API](https://fakestoreapi.com/) para mostrar productos reales (electrónica, joyería y ropa).
Incluye carrito de compras, favoritos, búsqueda, filtrado por categorías y un checkout simulado.

> Proyecto de la Práctica Calificada 2 — Autor: **Ricardo Miranda**

## 🌐 Demo en vivo

👉 **https://fake-store-luxurie.vercel.app**

Repositorio: https://github.com/RicardoMirandadev/Fake-store-Luxurie

## ✨ Funcionalidades

- **Inicio** con portada (hero) y sección de "Nuevos Ingresos".
- **Catálogo** completo con búsqueda en tiempo real y filtro por categoría.
- **Detalle de producto**: página individual que lee el `id` desde la URL.
- **Carrito de compras**: agregar, cambiar cantidades (+/−), eliminar y vaciar.
- **Checkout simulado**: modal con formulario de pago de prueba.
- **Favoritos**: marcar/desmarcar productos con el corazón (estado global).
- **Perfil** de usuario simulado.
- **Modales de soporte y legales** en el footer.
- **Página 404** para rutas que no existen.
- **Diseño responsivo** (barra de navegación inferior en móvil).

## 🧱 Tecnologías

| Herramienta | Para qué |
|---|---|
| **React 19** | Librería de interfaz (componentes) |
| **Vite 8** | Empaquetador y servidor de desarrollo rápido |
| **Tailwind CSS 4** | Estilos con clases utilitarias |
| **React Router 7** | Navegación entre páginas (rutas) |
| **Axios** | Peticiones a la FakeStore API |
| **Context API** | Estado global del carrito y favoritos |

## 📂 Estructura del proyecto

```
src/
├── components/      → Piezas reutilizables (Header, Footer, ProductoCard, Cesta, ModalFooter...)
├── context/         → Carrito.jsx (estado global: carrito y favoritos)
├── hooks/           → useAPIConsultor.js (hook propio para pedir datos a la API)
├── pages/           → Páginas (Inicio, Explorar, PagProducto, Favoritos, Perfil, NoVendemos)
├── App.jsx          → Define las rutas de la app
└── main.jsx         → Punto de arranque (monta la app)
```

## 🚀 Cómo correr el proyecto

Necesitas tener instalado [Node.js](https://nodejs.org/) y [pnpm](https://pnpm.io/).

```bash
# 1. Instalar las dependencias
pnpm install

# 2. Levantar el servidor de desarrollo
pnpm dev

# 3. (Opcional) Generar la versión de producción
pnpm build
```

Luego abre en el navegador la dirección que aparece en la terminal (por defecto `http://localhost:5173`).

## 📝 Notas

- Los datos provienen de la **FakeStore API**, un servicio gratuito de demostración.
  Si en algún momento la página se queda cargando, puede ser que la API esté temporalmente caída.
- El pago y el cierre de sesión son **simulados** (no procesan datos reales).
