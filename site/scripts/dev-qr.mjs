// Run `npm run dev:qr` — prints a QR code for your LAN URL and then
// starts `next dev` bound on 0.0.0.0 so your phone (on the same Wi-Fi)
// can hit the dev server and receive HMR updates in real time.

import qrcode from "qrcode-terminal";
import { networkInterfaces } from "node:os";
import { spawn } from "node:child_process";

const PORT = process.env.PORT ?? "3000";

function getLanIp() {
  const ifaces = networkInterfaces();
  for (const name of Object.keys(ifaces)) {
    for (const net of ifaces[name] ?? []) {
      if (net.family === "IPv4" && !net.internal) return net.address;
    }
  }
  return null;
}

const ip = getLanIp();
const url = ip ? `http://${ip}:${PORT}` : `http://localhost:${PORT}`;

console.log("");
console.log("\x1b[36m📱  Scan with your phone (must be on the same Wi-Fi):\x1b[0m");
console.log("");
qrcode.generate(url, { small: true });
console.log(`\x1b[1m${url}\x1b[0m`);
console.log("");
console.log("\x1b[2mEdits on your computer will hot-reload on the phone.\x1b[0m");
console.log("\x1b[2mWindows firewall may prompt the first time — allow private network access.\x1b[0m");
console.log("");

const child = spawn("npx", ["next", "dev", "--hostname", "0.0.0.0", "--port", PORT], {
  stdio: "inherit",
  shell: true,
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});

const cleanup = () => {
  if (!child.killed) child.kill();
};
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
