import { appendFile, mkdir } from "fs/promises";
import path from "path";

const LOG_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_DIR, "presupuesto.log");

type Outcome =
  | "sent"
  | "blocked_rate_limit"
  | "blocked_honeypot"
  | "blocked_too_fast"
  | "blocked_invalid";

type LogEntry = {
  outcome: Outcome;
  ip: string;
  reason?: string;
  nombre?: string;
  email?: string;
  tipo?: string;
  zona?: string;
};

// Se usa fire-and-forget (sin await) desde el route handler para no sumar latencia a la respuesta.
export function logAttempt(entry: LogEntry): void {
  mkdir(LOG_DIR, { recursive: true })
    .then(() => {
      const line = JSON.stringify({ ts: new Date().toISOString(), ...entry }) + "\n";
      return appendFile(LOG_FILE, line);
    })
    .catch((err) => console.error("Error writing spam log:", err));
}
