# Arquitectura de envío de emails: Jobs, Queues y Fire-and-Forget

## El problema original

Cuando un usuario completa el formulario de presupuesto, el flujo era:

```
Usuario envía form
      ↓
API recibe el request
      ↓
Conecta al servidor SMTP
      ↓
Espera que el mail se envíe (puede tardar 1-3 segundos)
      ↓
Recién ahí responde "OK" al usuario
```

El usuario veía el spinner girando durante todo ese tiempo. Si el servidor de mail tardaba o fallaba, la experiencia era mala.

---

## Conceptos clave

### Sincrónico vs Asincrónico

**Sincrónico (`await`)**: el código espera a que la operación termine antes de continuar.

```ts
// El cliente espera hasta que el mail se envíe
await transporter.sendMail({...});
return NextResponse.json({ ok: true }); // responde DESPUÉS del mail
```

**Asincrónico (fire-and-forget)**: el código dispara la operación y sigue sin esperar.

```ts
// El mail se envía "en paralelo"
transporter.sendMail({...}).catch(err => console.error(err));
return NextResponse.json({ ok: true }); // responde INMEDIATAMENTE
```

---

### ¿Qué es un Job Queue?

Un **Job Queue** (cola de trabajos) es un sistema donde:

1. Una parte del código **encola** una tarea ("mandá este mail")
2. Un **worker** separado toma esas tareas de la cola y las ejecuta
3. Si falla, el worker puede **reintentar** automáticamente
4. Las tareas sobreviven aunque el servidor se reinicie (persistencia)

```
Request HTTP → Encolar tarea → Responder OK al cliente
                    ↓
              Worker (proceso separado)
                    ↓
              Ejecutar tarea (enviar mail)
                    ↓
              Si falla → reintentar en X segundos
```

Es el equivalente en Node.js a los **Jobs de Laravel** con `Queue::push()`.

---

### ¿Por qué Laravel tiene Jobs nativos y Node.js no?

**Laravel** fue diseñado para correr en servidores tradicionales (PHP-FPM + workers persistentes). Tiene soporte nativo para:
- `php artisan queue:work` — un worker que escucha la cola
- Drivers: database, Redis, SQS, beanstalkd
- Reintentos, delays, prioridades, todo integrado

**Node.js / Next.js** fue diseñado pensando en:
- Servidores **stateless** (sin estado)
- Arquitecturas **serverless** (funciones que se apagan solas)
- No asume que hay un proceso persistente corriendo

Por eso no hay un equivalente nativo — depende del entorno de deploy.

---

## La decisión según el entorno de deploy

### Escenario A: Serverless (Vercel, AWS Lambda, etc.)

El proceso **muere** cuando termina el request. No hay workers en background.

```
Request llega → función se enciende → responde → función se apaga
```

Opciones:
- **Inngest** — servicio managed que recibe eventos y ejecuta funciones en background
- **Trigger.dev** — similar a Inngest
- **AWS SQS + Lambda** — cola de Amazon + función que la consume

### Escenario B: VPS con proceso persistente (nuestro caso)

PM2 mantiene el proceso de Next.js **siempre activo**. El proceso no muere entre requests.

```
Request llega → Node.js procesa → responde → Node.js sigue vivo
                                       ↓
                              El mail se sigue enviando
                              en el mismo proceso
```

Opciones (de menor a mayor complejidad):

| Solución | Reintentos | Persistencia | Complejidad |
|---|---|---|---|
| **Fire-and-forget** | No | No | Mínima |
| **p-queue** (in-memory) | Manual | No (se pierde si reinicia) | Baja |
| **BullMQ + Redis** | Sí | Sí | Media |
| **Inngest/Trigger.dev** | Sí | Sí (externo) | Baja (managed) |

---

## La solución aplicada: Fire-and-Forget

Para el volumen de solicitudes de una empresa de fumigaciones (bajo-medio), la solución más pragmática es fire-and-forget:

```ts
// Dispara el mail sin esperar
transporter.sendMail({...}).catch(err => console.error("Error sending email:", err));

// Responde inmediatamente al cliente
return NextResponse.json({ ok: true });
```

**Por qué funciona aquí:**
- El servidor es un VPS gestionado por PM2 → proceso siempre vivo
- Si el mail falla, queda registrado en los logs de PM2
- El usuario recibe respuesta instantánea
- Cero dependencias extra, cero infraestructura adicional

**Cuándo NO usarlo:**
- Volumen alto donde cada mail es crítico (e-commerce, transaccional)
- Entorno serverless (el proceso muere antes de que termine)
- Se necesitan reintentos automáticos garantizados

---

## ¿Cuándo conviene agregar BullMQ?

Si en el futuro el negocio crece y se necesita:
- Enviar cientos de mails por día
- Garantizar que ningún mail se pierda aunque el servidor se reinicie
- Colas con prioridades (urgente vs. informativo)
- Monitoreo visual de la cola

**Stack a agregar:**

```
Redis (en el mismo VPS) + BullMQ (librería Node.js)
```

```ts
// Encolar
await emailQueue.add('send-presupuesto', { nombre, email, ... });

// Worker (proceso separado)
emailQueue.process('send-presupuesto', async (job) => {
  await transporter.sendMail({...});
});
```

Redis pesa ~50MB en memoria y es trivial de instalar en el mismo VPS.

---

## Resumen de la arquitectura actual del proyecto

```
Cliente (Browser)
      ↓ POST /api/presupuesto
Next.js API Route (VPS + PM2)
      ├── Valida datos (Zod)
      ├── Rate limiting (in-memory Map)
      ├── Dispara mail en background (fire-and-forget)
      └── Responde { ok: true } inmediatamente
                    ↓
              nodemailer → SMTP (DonWeb)
                    ↓
              Mail llega a la bandeja de entrada
```

**GTM / Analytics:**
```
Evento en browser (click, form submit)
      ↓ window.dataLayer.push(...)
GTM intercepta → evalúa triggers
      ↓
GA4 recibe el evento con parámetros
      ↓
Google Ads puede importar "generate_lead" como conversión
```
