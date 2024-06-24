import server from "./src/server.js";
import { PORT } from "./src/config/config.js";
import { conn } from "./src/lib/connection.js";
import { loadUserAdmin } from "./src/scripts/seed.script.js";
const port = PORT ?? 3000;
conn
  .sync({ logging: false, force: true, alter: true })
  .then(() => {
    console.log("Base de datos conectada");
    server.listen(port, () => {
      console.log(`Server listening in: http://localhost:${port}`);
    });

    loadUserAdmin();
  })
  .catch((err) => {
    console.log(err);
    console.log("Error en la conexión: ", err.message);
  });
