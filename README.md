# 🎨 Portafolio Neo-Brutalista - Jose Vega

Portfolio animado construido con **Next.js 16**, **React 19**, **Tailwind CSS v4**, **Framer Motion** y **GSAP ScrollTrigger**.

## 📋 Descripción

Portafolio profesional con estética **Neo-Brutalista** que combina:
- ✨ Animaciones exageradas y premium (hover effects, stagger, parallax)
- 🎯 Diseño minimalista pero impactante
- 🔴 Colores de alto contraste (blanco, negro, rojo)
- 🚀 Performance optimizado con Turbopack
- 📱 Totalmente responsive
- ♿ Accesible con focus states mejorados

## 🏗️ Estructura del Proyecto

```
/portafolio-retroui
├── app/
│   ├── page.tsx              # Página principal con todas las secciones
│   ├── layout.tsx            # Layout global
│   └── globals.css           # Estilos globales + paleta Neo-Brutalista
│
├── components/
│   ├── ui/                   # Componentes base personalizados
│   │   ├── button.tsx        # Botón Neo-Brutalista con variants
│   │   ├── card.tsx          # Card reutilizable
│   │   └── badge.tsx         # Badge para tags
│   │
│   ├── hero/                 # Sección Hero
│   │   └── Hero.tsx          # Presentación inicial con stagger animations
│   │
│   ├── skills/               # Sección de Skills
│   │   └── SkillsGrid.tsx    # Grid de skills con scroll-trigger
│   │
│   ├── projects/             # Sección de Proyectos
│   │   └── ProjectCard.tsx   # Tarjetas de proyectos animadas
│   │
│   ├── experience/           # Sección de Experiencia
│   │   └── Timeline.tsx      # Timeline animado con GSAP
│   │
│   └── common/               # Componentes globales
│       ├── About.tsx         # Sección About Me
│       └── Footer.tsx        # Footer con CTA
│
├── lib/
│   ├── animations.ts         # Configuración de animaciones (Framer Motion + GSAP)
│   └── utils.ts              # Utilidades generales (cn, etc)
│
├── data.ts                   # Datos en inglés (perfil, skills, experiencia, proyectos)
├── data_es.ts                # Datos en español
│
├── tailwind.config.ts        # Configuración Tailwind v4
├── tsconfig.json             # Configuración TypeScript
├── next.config.ts            # Configuración Next.js
├── postcss.config.mjs        # Configuración PostCSS con @tailwindcss/postcss
├── components.json           # Configuración shadcn/ui (backup)
└── package.json              # Dependencias
```

## 🎭 Características de Animaciones

### 1. **Hero Section**
- ✨ Stagger animations en textos
- 🔴 Badge con pop-in effect
- 🎯 Botones con hover brutal (shadow reveal + desplazamiento)
- 📍 Links con efecto hover suave

### 2. **Skills Grid**
- 🔄 Scroll-trigger reveal (aparecen al hacer scroll)
- 📊 Card con efecto hover (scale + rotate + shadow jump)
- 🏷️ Badges con tipos de variantes

### 3. **Projects Section**
- 📦 Tarjetas con stagger entrada (cascada)
- 🎪 Hover brutal: scale(1.02) + rotate(1deg) + shadow jump
- 🏷️ Tech stack badges
- 🔗 Links a proyectos

### 4. **Experience Timeline**
- 📍 Línea vertical animada (line-draw con GSAP)
- 🟢 Dots pulsantes en timeline
- 📄 Cards de experiencia con hover effect
- ✓ Achievement items con entrada escalonada

### 5. **About Section**
- 📝 Contenido en 2 columnas (desktop)
- 🎨 Card rojo brutal para visión
- 📍 Badge de ubicación

### 6. **Footer**
- 📞 CTA prominente
- 🔗 Links rápidos
- 📞 Información de contacto

## 🎨 Paleta de Colores Neo-Brutalista

```css
--color-brutal-black: #000000   /* Negro absoluto */
--color-brutal-white: #ffffff   /* Blanco puro */
--color-brutal-red: #ff0000     /* Rojo vibrante para CTAs */
--color-brutal-green: #00ff00   /* Verde para secundarios */
--color-brutal-dark: #1a1a1a    /* Gris oscuro */
--color-brutal-light: #f5f5f5   /* Gris claro */
```

## 🛠️ Stack Tecnológico

| Librería | Versión | Propósito |
|----------|---------|----------|
| **Next.js** | 16.2.9 | Framework React moderno con SSR/SSG |
| **React** | 19.2.7 | Librería UI |
| **TypeScript** | 6.0.3 | Type safety |
| **Tailwind CSS** | 4.3.1 | Estilos utilitarios (v4 con @theme) |
| **Framer Motion** | 12.40.0 | Animaciones declarativas |
| **GSAP** | 3.15.0 | Animaciones avanzadas + ScrollTrigger |
| **Class Variance Authority** | 0.7.1 | Variants para componentes |
| **clsx** | 2.1.1 | Utilidad para clases condicionales |

## ⚡ Instalación y Uso

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar servidor de desarrollo
```bash
npm run dev
```
Abrirá en `http://localhost:3000`

### 3. Construir para producción
```bash
npm run build
npm start
```

## 📱 Responsive Design

El portafolio es totalmente responsive:
- **Mobile**: 1 columna, fuente reducida, espaciado optimizado
- **Tablet**: 2-3 columnas dependiendo de la sección
- **Desktop**: Layout completo con todas las características

## 🎬 Animaciones Detalladas

### Stagger Container
```typescript
- Retraso entre children: 80ms
- Delay inicial: 100ms
- Duración: 600ms ease-out
```

### Button Hover (Pop & Shadow Reveal)
```typescript
- Scale: 0.95 → 1
- Shadow: 8px → 12px (exagerado)
- Duration: 120ms ease-out
```

### Card Hover (Brutal Effect)
```typescript
- Scale: 1 → 1.02
- Rotate: 0 → 1deg
- Shadow: 8px → 12px
- Y offset: 0 → -4px
- Duration: 200ms ease-out
```

### Scroll Reveal (Text Elements)
```typescript
- Opacity: 0 → 1
- Y: 20px → 0
- Trigger: top 85% del viewport
- Duration: 600ms ease-out
```

## 🔧 Configuración Tailwind v4

La paleta de colores está definida en `app/globals.css` usando `@theme`:

```css
@theme {
  --color-brutal-black: #000000;
  --color-brutal-white: #ffffff;
  --color-brutal-red: #ff0000;
  /* ... más colores ... */
}
```

Luego se usan como clases:
```jsx
<button className="bg-brutal-white text-brutal-black border-brutal-black">
```

## 📊 Páginas y Secciones

1. **Hero** - Presentación principal
2. **About** - Información personal + Visión
3. **Skills** - Grid de competencias organizadas
4. **Projects** - Proyectos destacados
5. **Experience** - Timeline de experiencia profesional
6. **Footer** - CTA y enlaces

## 🚀 Optimizaciones

- ✅ Turbopack para builds rápidos
- ✅ TypeScript strict mode
- ✅ Tailwind CSS v4 con bundle optimizado
- ✅ Image optimization lista (con Next.js Image)
- ✅ Font optimization con Google Fonts preload
- ✅ Scroll performance optimizado con GSAP

## 📝 Datos del Portfolio

Los datos del portafolio se importan de:
- `data.ts` - Versión en inglés
- `data_es.ts` - Versión en español

Ambos archivos contienen la misma estructura:
```typescript
export const profile = { ... }
export const skills = [ ... ]
export const experience = [ ... ]
export const projects = [ ... ]
```

## 🎯 Próximas Mejoras Potenciales

- [ ] Agregar soporte para español/inglés con i18n
- [ ] Dark mode toggle
- [ ] Contacto con formulario (EmailJS o similar)
- [ ] Blog section
- [ ] Analytics (Vercel Analytics)
- [ ] SEO enhancements

## 🤝 Contribuciones

Este es un proyecto personal. Para sugerencias, abre un issue o PR.

## 📄 Licencia

MIT - Libre para usar y modificar

---

**Construido por**: Jose Vega | Cloud Engineer & DevOps Specialist  
**Portfolio**: https://jessvega.me
