import express from "express";
import cors from "cors";
import { pool } from "./db.js";
import user from "./routes/user.route.js";
import session from "express-session";
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
import redoc from 'redoc-express';

// Importar fs usando la sintaxis de import
import fs from 'fs';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const def = fs.readFileSync(path.join(__dirname, './swaggerOptions.json'), { encoding: 'utf8', flag: 'r' });
const readmeContent = fs.readFileSync(path.join(__dirname, './README.md'), { encoding: 'utf8', flag: 'r' });

const defObj = JSON.parse(def);
defObj.info.description = readmeContent;
const swaggerOptions = {
  definition: defObj,
  apis: [
    path.join(__dirname, "./app.js"),            // Ruta al archivo app.js (ruta raíz)
    path.join(__dirname, "./routes/user.route.js") // Ruta al archivo user.route.js
  ],
};

// Importar SwaggerTheme usando la sintaxis de import
import { SwaggerTheme } from 'swagger-themes';

const Theme = new SwaggerTheme('v3');
const Opcion = {
  explorer: true,
  customCss: Theme.getBuffer("dark"),
}

app.use(
  session({
    secret: "12x341|x", // Cambia esto a una cadena segura y secreta
    resave: false,
    saveUninitialized: true,
  })
);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Ruta de bienvenida base.
 *     description: Retorna un mensaje de bienvenida.
 *     responses:
 *       200:
 *         description: Retorna un objeto JSON con un mensaje de bienvenida.
 */
app.get("/", async (req, res) => {
  res.json({ message: "hola" });
});

app.use("/users", user);

// Mover estas líneas después de la definición de app
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs, Opcion));

app.use("/api-docs-json", (req, res) => {
  res.json(swaggerDocs);
});

app.get(
  '/api-docs-redoc',
  redoc({
    title: 'API Docs',
    specUrl: '/api-docs-json',
    nonce: '', // <= it is optional,we can omit this key and value
    // we are now start supporting the redocOptions object
    // you can omit the options object if you don't need it
    // https://redocly.com/docs/api-reference-docs/configuration/functionality/
    redocOptions: {
      theme: {
        colors: {
          primary: {
            main: '#6EC5AB'
          }
        },
        typography: {
          fontFamily: `"museo-sans", 'Helvetica Neue', Helvetica, Arial, sans-serif`,
          fontSize: '15px',
          lineHeight: '1.5',
          code: {
            code: '#87E8C7',
            backgroundColor: '#4D4D4E'
          }
        },
        menu: {
          backgroundColor: '#ffffff'
        }
      }
    }
  })
);

app.use((req, res, next) => {
  res.status(404).json({
    message: "endpoint not found",
  });
});

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

export default app;
