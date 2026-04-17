import fs from "fs";
import selfsigned from "selfsigned";

// Générer certificat auto-signé pour localhost
const attrs = [{ name: "commonName", value: "localhost" }];
const pems = selfsigned.generate(attrs, { days: 365 });

// Créer le dossier ssl si nécessaire
if (!fs.existsSync("./ssl")) {
  fs.mkdirSync("./ssl");
}

// Écrire key.pem et cert.pem
fs.writeFileSync("./ssl/key.pem", pems.private);
fs.writeFileSync("./ssl/cert.pem", pems.cert);

console.log("✅ Certificat auto-signé généré dans ./ssl !");
