import { test, expect } from "vitest";
import request from "supertest";
import { server } from "../app.ts";
import { makeCourse } from "../test/factories/make-course.ts";

test("get-course-by-id", async () => {
  await server.ready();

  const course = await makeCourse();

  const response = await request(server.server).get(`/courses/${course.id}`);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    courses: {
      id: expect.any(String),
      title: expect.any(String),
      description: null,
    },
  });
});

test("retuning 404 if course does not exist", async () => {
  await server.ready();

  const response = await request(server.server).get(
    `/courses/04565a26-ece9-44bb-9a5f-7c6b7933fa54`
  );

  expect(response.status).toEqual(404);
});
