const supertest = require("supertest")
const server = require("../server")
const db = require("../config")

afterAll(async () => {
    await db.destroy() // closes database connection after testing is done
})

describe("users integration tests", () => {

    // GET TESTS /////////////////////////////////////////////////////////////////////////////

    it("GET / => status to be 200", async () => {
        const res = await supertest(server).get("/")
        expect(res.statusCode).toBe(200)
    })

    it("GET / => return content type of application/json", async () => {
        const res = await supertest(server).get("/")
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    })

    // POSTS TESTS ///////////////////////////////////////////////////////////////////////////////

    it("POST / => returns status 201 whne we create a user", async () => {
		const res = await supertest(server)
			.post("/")
            .send({ name: "bilbo" })
        expect(res.statusCode).toBe(201)
    })

    it("POST / => returns newly created user", async () => {
		const res = await supertest(server)
			.post("/")
            .send({ name: "dan" })
        expect(res.statusCode).toBe(201)
        expect(res.body.name).toBe("dan")
    })

    // DELETE TESTS //////////////////////////////////////////////////////////////////////////////

    it("DELETE /:id => returns status 200 when created", async () => {
		const res = await supertest(server)
			.delete("/2")
        expect(res.statusCode).toBe(200)
    })

    it("DELETE /:id => returns deleted user", async () => {
		const res = await supertest(server)
			.delete("/11") // CHANGE THIS TO 12 WHEN DOING ONE ON ONE WITH TL
        expect(res.body.id).toBe(11)
    })
})

