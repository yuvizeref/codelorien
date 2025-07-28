import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load("./docs/swagger-api.yml");

const docsRouter = express.Router();

docsRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default docsRouter;
