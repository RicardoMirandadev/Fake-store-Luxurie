# Luxurie

Catálogo de tienda hecho con React y Vite que consume la FakeStore API. La
aplicación muestra productos reales (electrónica, joyería y ropa) y permite
buscarlos, filtrarlos por categoría, agregarlos a un carrito con checkout
simulado, guardarlos como favoritos y consultar el detalle de cada uno. El
footer incluye modales informativos y la navegación está adaptada tanto a
escritorio como a móvil.

Práctica Calificada 2 - Ricardo Miranda.

## Sobre la autoría

Este proyecto lo programé y diseñé en su mayoría yo. Tomé todas las decisiones
de arquitectura (cómo separar componentes, dónde guardar el estado, cómo nombrar
las rutas) y de diseño visual (la paleta, el layout, los íconos y el flujo de
pantallas). Usé herramientas de inteligencia artificial como apoyo puntual: para
resolver dudas concretas, depurar errores y entender mejor algunos conceptos,
pero pidiendo siempre que me explicaran el porqué de cada cambio para poder
aprender a construir un proyecto desde cero y no solo copiar código. El resultado
y el criterio detrás de cada parte son míos.

## Tecnologías

- React 19 para construir la interfaz por componentes.
- Vite 8 como empaquetador y servidor de desarrollo.
- Tailwind CSS 4 para los estilos.
- React Router 7 para la navegación entre páginas.
- Axios para las peticiones a la FakeStore API.
- Context API de React para el estado global del carrito y los favoritos.

## Cómo se construye un proyecto así desde cero

Estos son los pasos generales que seguí, por si sirven de guía para repetir el
proceso en otro proyecto:

1. Crear el proyecto base con Vite usando la plantilla de React
   (`pnpm create vite`), que deja listo el entorno de desarrollo con recarga en
   caliente.
2. Instalar las dependencias que no vienen por defecto: React Router para las
   rutas, Axios para consumir la API y Tailwind para los estilos.
3. Configurar Tailwind e importarlo en el CSS principal.
4. Definir la estructura de carpetas para no perderse cuando el proyecto crece:
   `components` para piezas reutilizables, `pages` para las pantallas, `context`
   para el estado global y `hooks` para la lógica reutilizable.
5. Crear el estado global con Context API. Aquí vive lo que muchas pantallas
   necesitan compartir: el carrito, los favoritos, el texto de búsqueda y la
   categoría seleccionada.
6. Escribir un hook propio para consumir la API (`useAPIConsultor`), de modo que
   cualquier página pueda pedir datos y recibir de vuelta el resultado, el estado
   de carga y los errores sin repetir código.
7. Definir las rutas en `App.jsx` con React Router, incluyendo una ruta con
   parámetro (`/products/:id`) para el detalle y una ruta comodín para el 404.
8. Construir cada página y componente, conectándolos al contexto cuando necesitan
   leer o modificar el estado compartido.
9. Aplicar los estilos con Tailwind y dejar el diseño responsivo.
10. Probar en local con `pnpm dev` y generar la versión final con `pnpm build`.
11. Subir el código a GitHub y desplegar en Vercel, agregando un `vercel.json`
    para que las rutas de la SPA funcionen al recargar la página.

## Proceso de desarrollo y problemas resueltos

A lo largo del proyecto fui resolviendo problemas reales. Dejo la bitácora para
que se entienda el trabajo que llevó cada parte.

### 1. Layout del Header en móvil

El menú superior se desbordaba en pantallas pequeñas y rompía la cuadrícula. Lo
resolví con las clases utilitarias de Tailwind, ocultando los elementos más
pesados en móvil (`hidden md:flex`) y manteniendo una navegación táctil limpia.

### 2. Contadores del carrito en tiempo real

Los indicadores numéricos del Header no se actualizaban al añadir un producto
desde la vista de detalle. Conecté los componentes al contexto global
(`CarritoContext`) con `useContext`, de forma que leer el arreglo compartido
dispara el re-renderizado inmediato del contador de productos y del de favoritos.

### 3. Fondo cortado en el detalle de producto

En pantallas verticales, la regla rígida `min-h-screen` hacía que el footer se
encimara o dejara una franja blanca abajo, partiendo el fondo `/FondoTar.jpg`.
La reemplacé por un cálculo dinámico de altura (`min-h-[calc(100vh-4rem)]`) que
descuenta exactamente el alto del Header, y el bloque quedó parejo de extremo a
extremo.

### 4. Resaltado de la categoría activa

Al hacer clic en una categoría del Header, el filtro funcionaba por dentro pero
el botón volvía visualmente a gris y se perdía la referencia de dónde estaba el
usuario. Modifiqué el `.map()` que genera los botones para evaluar si el id de la
categoría iterada coincide con la categoría seleccionada del estado; cuando
coincide, fijo el color azul intenso (`text-blue-900 font-bold`).

### 5. Git y entorno local

Al ejecutar `git add`, aparecieron avisos sobre formatos de fin de línea
(LF y CRLF). Son el comportamiento normal de Git al traducir saltos de línea
entre Linux y Windows, así que el commit se completó sin problema. También me
topé con un `ERR_CONNECTION_REFUSED` cuando el servidor de Vite se había cerrado;
se soluciona volviendo a levantarlo con `pnpm dev`. Por último, revisé una alerta
de desarrollo en `Carrito.jsx` relacionada con `createContext` y Fast Refresh:
confirmé que es solo informativa y decidí no tocarla, porque alterarla rompería
el estado global.

### 6. Rutas en producción y despliegue

Las aplicaciones de una sola página (SPA) suelen dar error 404 cuando el usuario
recarga en una ruta secundaria. Para evitarlo creé el archivo `vercel.json` en la
raíz, que reescribe todas las peticiones hacia `index.html`. Conecté el
repositorio de GitHub a Vercel para que compile automáticamente desde la rama
`main`.

### 7. Footer modular con modales

El footer tenía enlaces vacíos que no aportaban interactividad. Mantuve mi formato
de comentarios y la lógica de la barra de navegación inferior en móvil, pero quité
los enlaces rotos y creé el componente `ModalFooter.jsx`, que centraliza la lógica
de varios modales (centro de ayuda con formulario, política de envíos, devoluciones,
seguimiento de pedido y los términos legales). Vinculé la columna de Soporte a los
estados que abren cada modal, le puse `type="submit"` al formulario del boletín para
que dispare el modal de términos al presionar "Subscribirse", y dirigí los íconos de
redes a mis perfiles públicos de GitHub.

## Estructura del proyecto

    src/
      components/   Piezas reutilizables (Header, Footer, ProductoCard, Cesta, ModalFooter)
      context/      Carrito.jsx, el estado global de carrito y favoritos
      hooks/        useAPIConsultor.js, el hook propio para pedir datos a la API
      pages/        Pantallas (Inicio, Explorar, PagProducto, Favoritos, Perfil, NoVendemos)
      App.jsx       Definición de las rutas
      main.jsx      Punto de arranque que monta la aplicación

## Instalación y uso

Requiere Node.js y pnpm.

    pnpm install     instala las dependencias
    pnpm dev         levanta el servidor de desarrollo
    pnpm build       genera la versión de producción

Al ejecutar `pnpm dev`, la aplicación queda disponible en la dirección que
aparece en la terminal (por defecto http://localhost:5173).

## Enlaces

Repositorio: https://github.com/RicardoMirandadev/Fake-store-Luxurie
Producción: https://fake-store-luxurie.vercel.app
