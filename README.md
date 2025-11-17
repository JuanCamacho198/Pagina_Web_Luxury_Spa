**Luxury SPA Web**

**Autores:**
Juan  Camacho
Julian Galeano
Vanessa Benitez

**Descripción**
 - **Proyecto**: Aplicación frontend de un sitio para un spa de lujo, creada con React y Vite.
 - **Funcionalidad principal**: navegación pública/privada, registro e inicio de sesión (Firebase), gestión de citas, catálogo de servicios, carrito y proceso de pago simulado.

**Estado**
 - **Branch**: `main`
 - **Status**: Desarrollo (puede contener datos de ejemplo y configuración local de Firebase).

**Tecnologías**
 - **Frontend**: React, Vite
 - **Enrutamiento**: `react-router-dom`
 - **UI / Utilidades**: `react-icons`, `react-datepicker`
 - **Autenticación / BBDD ligera**: Firebase

**Características**
 - **Autenticación**: Registro y login (Firebase Auth).
 - **Gestión de citas**: Vista para crear y listar citas.
 - **Servicios**: Listado y detalle de servicios.
 - **Carrito y Checkout**: Contexto de carrito, checkout y modal de confirmación.

**Requisitos**
 - **Node.js**: v16+ (recomendado v18+)
 - **npm** o **pnpm/yarn**

**Instalación y ejecución (PowerShell)**
```powershell
# Instalar dependencias
npm install

# Levantar entorno de desarrollo (Vite)
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint
```

**Configuración de Firebase**
 - El proyecto usa Firebase. La configuración se encuentra en `src/firebase/firebaseConfig.js`.
 - Crea un proyecto en Firebase (Auth, Firestore si aplica) y sustituye los valores en `firebaseConfig.js` con tus credenciales.
 - Alternativamente, puedes usar variables de entorno si adaptas el proyecto para ello.

**Variables de entorno (Vite)**
 - Para seguridad y flexibilidad, la configuración de Firebase ahora se lee desde variables de entorno prefijadas `VITE_`.
 - Crea un archivo local `.env.local` en la raíz del proyecto con las claves: 
 
```text
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
VITE_FIREBASE_MEASUREMENT_ID=tu_measurement_id
```

 - He incluido un archivo de ejemplo `./.env.example` que puedes copiar a `.env.local` y rellenar.
 - Importante: no subas `.env.local` al repositorio. Añádelo a `.gitignore` si aún no está incluido.

**Estructura relevante**
 - **`src/`**: Código fuente principal.
 - **`src/views/`**: Vistas principales (Home, Login, Services, Citas, Payment, etc.).
 - **`src/views/components/`**: Componentes reutilizables (NavBar, Footer, Cart, TimePicker, etc.).
 - **`src/models/`**: Modelos para manejar datos y llamadas a Firebase.
 - **`src/controllers/`**: Lógica de negocio / controladores que conectan modelos con la UI.
 - **`src/firebase/firebaseConfig.js`**: Configuración de Firebase.

**Scripts (extraídos de `package.json`)**
 - **`dev`**: `vite` — arranca servidor de desarrollo
 - **`build`**: `vite build` — construye la app para producción
 - **`preview`**: `vite preview` — previsualiza build localmente
 - **`lint`**: `eslint .` — ejecuta ESLint


**Contribuciones**
 - Abre un issue o un pull request describiendo los cambios.


