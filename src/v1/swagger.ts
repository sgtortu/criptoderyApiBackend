const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Basic Meta Informations about our API
const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: "Criptodery API", version: "1.0.0" },
    },
    apis: ["./src/v1/routes/userRoutes.ts", "./src/database/User/User.ts"],
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app: any, port: any) => {
    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get("/api/v1/docs.json", (_req: any, res: any) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    console.log(
        `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
    );
};

module.exports = { swaggerDocs };
