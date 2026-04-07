#!/usr/bin/env node
/**
 * Agenda os 3 lembretes do evento "Lucro Real em 30 Minutos" para hoje:
 * - 18:00 → lembrete 1h antes
 * - 18:50 → lembrete 10min antes
 * - 19:00 → estamos ao vivo
 *
 * Roda em background. Não feche o terminal!
 */

import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SENDER = join(__dirname, "send-event-reminder.mjs");

// Horários de hoje (timezone local do Mac = BRT)
const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();

const SCHEDULE = [
  { timing: "1h",      at: new Date(y, m, d, 18, 0, 0) },
  { timing: "10min",   at: new Date(y, m, d, 18, 50, 0) },
  { timing: "ao-vivo", at: new Date(y, m, d, 19, 0, 0) },
];

function fmt(date) {
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function runSender(timing) {
  console.log(`\n🚀 [${fmt(new Date())}] Disparando lembrete "${timing}"...\n`);
  const proc = spawn("node", [SENDER, timing], { stdio: "inherit" });
  proc.on("exit", (code) => {
    console.log(`\n[${fmt(new Date())}] Lembrete "${timing}" finalizou com código ${code}\n`);
  });
}

console.log("\n📅 AGENDADOR DE LEMBRETES — IJA Live\n");
console.log(`Agora: ${fmt(new Date())}\n`);
console.log("Agendamentos:");

const now = Date.now();
let scheduled = 0;

for (const job of SCHEDULE) {
  const delay = job.at.getTime() - now;
  if (delay <= 0) {
    console.log(`  ⏭  ${fmt(job.at)} → "${job.timing}" — JÁ PASSOU, pulando`);
    continue;
  }
  const minutes = Math.round(delay / 60000);
  console.log(`  ⏰ ${fmt(job.at)} → "${job.timing}" (em ~${minutes} min)`);
  setTimeout(() => runSender(job.timing), delay);
  scheduled++;
}

if (scheduled === 0) {
  console.log("\n⚠️  Nenhum lembrete a agendar. Saindo.");
  process.exit(0);
}

console.log(`\n✅ ${scheduled} lembrete(s) agendado(s). Aguardando...\n`);
console.log("⚠️  IMPORTANTE: NÃO FECHE ESTE TERMINAL até 19h05!\n");

// Mantém o processo vivo
setInterval(() => {
  // heartbeat silencioso
}, 60000);
