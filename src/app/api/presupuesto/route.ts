import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const rateStore = new Map<string, { count: number; reset: number }>();
const RATE_WINDOW = 5 * 60 * 1000;
const RATE_MAX = 3;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateStore.get(ip);
  if (!entry || now > entry.reset) {
    rateStore.set(ip, { count: 1, reset: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_MAX) return false;
  entry.count++;
  return true;
}

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const TIPO_VALUES = ["Casa", "Departamento", "Comercio", "Empresa", "Industrial", "Otro"] as const;
const LIMITS = { nombre: 100, email: 100, telefono: 20, plaga: 100, zona: 100, comentario: 500 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Intente en unos minutos." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { nombre, email, telefono, plaga, zona, tipo, comentario } = body;

    if (!nombre || !email || !telefono || !plaga || !zona || !tipo) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    if (
      typeof nombre !== "string" ||
      typeof email !== "string" ||
      typeof telefono !== "string" ||
      typeof plaga !== "string" ||
      typeof zona !== "string" ||
      typeof tipo !== "string" ||
      (comentario !== undefined && typeof comentario !== "string")
    ) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    if (
      nombre.length > LIMITS.nombre ||
      email.length > LIMITS.email ||
      telefono.length > LIMITS.telefono ||
      plaga.length > LIMITS.plaga ||
      zona.length > LIMITS.zona ||
      (comentario && comentario.length > LIMITS.comentario)
    ) {
      return NextResponse.json({ error: "Un campo supera el largo máximo permitido" }, { status: 400 });
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    if (!(TIPO_VALUES as readonly string[]).includes(tipo)) {
      return NextResponse.json({ error: "Tipo de espacio inválido" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8" /><title>Nuevo presupuesto</title></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#f8fafc; padding: 32px;">
  <div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
    <div style="background: #15803d; padding: 28px 32px;">
      <h1 style="color: white; margin: 0; font-size: 20px; font-weight: 700;">Nueva solicitud de presupuesto</h1>
      <p style="color: #bbf7d0; margin: 4px 0 0; font-size: 14px;">Fumigaciones Norte — sitio web</p>
    </div>
    <div style="padding: 32px;">
      <table style="width: 100%; border-collapse: collapse;">
        ${[
          ["Nombre", nombre],
          ["Email", email],
          ["Teléfono", telefono],
          ["Plaga / Problema", plaga],
          ["Zona / Barrio", zona],
          ["Tipo de espacio", tipo],
          ["Comentarios", comentario || "—"],
        ]
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; font-weight: 600; width: 40%; vertical-align: top;">${esc(label as string)}</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px;">${esc(value as string)}</td>
          </tr>`
          )
          .join("")}
      </table>
      <div style="margin-top: 24px; padding: 16px; background: #f0fdf4; border-radius: 10px; border: 1px solid #bbf7d0;">
        <p style="margin: 0; color: #15803d; font-size: 13px; font-weight: 600;">Responder a: <a href="mailto:${esc(email)}" style="color: #15803d;">${esc(email)}</a></p>
      </div>
    </div>
    <div style="padding: 16px 32px; background: #f8fafc; border-top: 1px solid #f1f5f9;">
      <p style="margin: 0; color: #94a3b8; font-size: 12px;">© Fumigaciones Norte · fumigacionesnorte.com.ar</p>
    </div>
  </div>
</body>
</html>`;

    transporter.sendMail({
      from: `"Fumigaciones Norte" <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `Nueva solicitud de presupuesto — ${nombre}`,
      html,
    }).catch(err => console.error("Error sending email:", err));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error sending email:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
