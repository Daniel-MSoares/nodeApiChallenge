import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import z from "zod";
import { desc, eq } from "drizzle-orm";

export const getCourseByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/courses/:id",
    {
      schema: {
        tags: ["Courses"],
        description: "Retorna umcurso pelo seu Id",
        summary: "Obter curso por Id",
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            courses: z.object({
              id: z.uuid(),
              title: z.string(),
              description: z.string().nullable(),
            }),
          }),
          404: z.null().describe("Curso não encontrado"),
        },
      },
    },
    async (request, reply) => {
      const courseId = request.params.id;

      const result = await db
        .select()
        .from(courses)
        .where(eq(courses.id, courseId));

      if (result.length > 0) {
        return { courses: result[0] };
      }

      return reply.status(404).send();
    }
  );
};
