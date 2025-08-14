import fastify from "fastify";
import { fastifySwagger } from "@fastify/swagger";
import scalarAPIReference from "@scalar/fastify-api-reference";
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";

import { getCoursesRoute } from "./src/routes/get-courses.ts";
import { getCourseByIdRoute } from "./src/routes/get-course-by-id.ts";
import { createCourseRoute } from "./src/routes/create-course.ts";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>();

server.setSerializerCompiler(serializerCompiler);
server.setValidatorCompiler(validatorCompiler);

if (process.env.NODE_ENV === "development") {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Desafio Node JS",
        description: "API para gerenciar cursos",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });

  server.register(scalarAPIReference, {
    routePrefix: "/docs",
  });
}

server.register(createCourseRoute);
server.register(getCoursesRoute);
server.register(getCourseByIdRoute);

server.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
