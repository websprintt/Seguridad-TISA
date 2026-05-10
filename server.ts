import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API contact route
  app.post("/api/contact", (req, res) => {
    const { nombre, telefono, cp, propiedad, horario, prioridad } = req.body;
    
    console.log("-----------------------------------------");
    console.log("NUEVA SOLICITUD DE CONTACTO (SIMULADA)");
    console.log(`Para: corp.tisa@gmail.com`);
    console.log(`De: ${nombre} (${telefono})`);
    console.log(`CP: ${cp}`);
    console.log(`Propiedad: ${propiedad}`);
    console.log(`Horario: ${horario}`);
    console.log(`Urgencia: ${prioridad}`);
    console.log("-----------------------------------------");

    // En un entorno real aquí usaríamos Nodemailer o un servicio de email
    res.status(200).json({ success: true, message: "Solicitud recibida" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
