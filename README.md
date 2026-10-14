# CaixaBank España - Plataforma de Banca Digital

Aplicación web bancaria moderna y reactiva diseñada para CaixaBank España con panel de cliente privado y consola de administración y auditoría en tiempo real.

## 🚀 Características Principales

### 👤 Área de Cliente (User Space)
- **Autenticación Segura**: Registro e inicio de sesión en español con validación en tiempo real.
- **Gestión de Cuentas y Saldos**: Consulta de saldo disponible, cuentas corrientes y movimientos en EUR (€).
- **Tarjetas Bancarias Reales**:
  - Registro de tarjetas bancarias reales con validación de numeración, fecha de caducidad y CVV.
  - Estado en tiempo real: *Pendiente de aprobación*, *Aprobada* o *Rechazada* por el administrador.
  - Cero tarjetas ficticias o mensajes simulados.
- **Transferencias SEPA**: Envíos nacionales e internacionales con cálculo de comisión bancaria reducida al 2%.
- **Solicitud de Créditos y Préstamos**: Simulador financiero con cálculo de cuotas y estado de solicitud.
- **Registro de Actividad**: Historial detallado de todas las operaciones realizadas.

### 🛡️ Consola de Administración (Admin Space)
- **Ficha Integral 360° de Clientes**: Consulta completa de datos de contacto, saldos y credenciales.
- **Inspección de Tarjetas Reales**:
  - Visualización del número completo, fecha, titular y código CVV registrado por el cliente.
  - Validación directa en un clic: Aprobación inmediata y desbloqueo operativo SEPA o rechazo con motivo.
- **Auditoría en Tiempo Real**: Monitor de actividades en vivo de cada usuario (inicios de sesión, tarjetas, transferencias, préstamos).
- **Control de Créditos**: Aprobación o denegación de préstamos con impacto directo sobre el saldo del cliente.

---

## 🛠️ Tecnologías

- **React 19** con hooks modernos
- **TypeScript**
- **Vite 8**
- **Tailwind CSS**
- **Lucide React** (iconografía bancaria oficial)

---

## 📦 Instalación y Desarrollo Local

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Compilar para producción
npm run build
```

---

## 🌐 Despliegue en Netlify

El proyecto incluye la configuración lista para Netlify:
- `netlify.toml`: define el comando de compilación (`npm run build`), directorio de salida (`dist`) y reglas de redirección SPA.
- `public/_redirects`: regla `/* /index.html 200` para evitar páginas en blanco o errores 404 en rutas directas.

---

## 📤 Instrucciones para GitHub

Para subir este proyecto a su repositorio GitHub:

```bash
# 1. Vincular su repositorio remoto (reemplace USERNAME y REPO con sus datos)
git remote add origin https://github.com/USERNAME/REPO.git

# 2. Enviar los cambios
git push -u origin main
```
