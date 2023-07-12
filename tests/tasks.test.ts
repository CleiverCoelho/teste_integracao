import supertest from "supertest";

import {app} from "../src/index";

const api = supertest(app);

describe("Dona Marlene Fruit Test", () => {
    
//   it("should get health information about server", async () => {
//     const { status, body } = await api.get("/health");
//     expect(status).toBe(200);
//     console.log(body);
//     expect(body).toEqual({message: "ok!"});
//   })

  it("should return 201 when inserting a fruit", async () => {
    const { status, body } = await api.post("/fruits").send({
      name: "fruta teste",
      price: 3
    });

    expect(status).toBe(201);
  });

  it("should return 409 when inserting a fruit that is already registered", async () => {
    const { status, body } = await api.post("/fruits").send({
      name: "fruta teste",
      price: 3
    });

    expect(status).toBe(409);
  });

  it("should return 422 when inserting a fruit with data missing", async () => {
    const { status, body } = await api.post("/fruits").send({
      name: "fruta teste sem preco"
    });

    expect(status).toBe(422);
  });

  it("shoud return 404 when trying to get a fruit that doesn't exists", async () => {
    const { status, body } = await api.get("/fruits/4");
    expect(status).toBe(404);
  });

  it("should return 400 when id param is not valid", async () => {
    const { status, body } = await api.get("/fruits/ç");
    expect(status).toBe(400);
  });

  it("should return a fruit given an id", async () => {
    const { status, body } = await api.get("/fruits/1");
    expect(body).toEqual({
        id: 1,
        name: "fruta teste",
        price: 3
    })
  });

  it("should return all fruits", async () => {
    const { status, body } = await api.get("/fruits");
    expect(body).toEqual(
		expect.arrayContaining([
			expect.objectContaining({
                id: expect.any(Number),
				name: expect.any(String),
				price: expect.any(Number)
			})
		])
	)
  });

});