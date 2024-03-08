const request = require("supertest")
const server = require("../index")

describe("Operaciones CRUD de cafes", () => {
    it("obteniendo un 200 ,y un arreglo con al menos 1 objeto", async () => {
        const response = await request(server).get("/cafes")
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toBeGreaterThan(0)
    })
    it("comprobando que se obtiene un codigo 404 al intentar eliminar un cafe con id que no existe", async () => {
        const jwt = "token"
        const idInvalido = "uno"
        const response = await request(server).delete(`/cafes/${idInvalido}`).set("Authorization", jwt)
        expect(response.status).toBe(404)
    })
    it("prueba que la ruta post agrega un nuevo cafe y devuelve un codigo 201", async () => {
        const response = await request(server).post("/cafes").send( {"id": "5","nombre": "Caramel Macchiato"} )
        expect(response.status).toBe(201)
        expect(response.body.length).toBeLessThan(6)
    })
    it("Prueba que la ruta put devuelva un status 400 al intentar actualizar un cafe con un id disntinto al del payload", async () => {
        const response = await request(server).put("/cafes/4").send({"id": "5","nombre": "Caramel Macchiato"})
        expect(response.status).toBe(400)
    })
})
