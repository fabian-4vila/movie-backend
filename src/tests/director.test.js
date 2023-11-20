const request = require('supertest');
const app = require('../app');
require('../models')

let id;

test('GET /directors debe traer los directores', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /directors debe crear los directores', async () => {
    const director = {
        firstName: "Guillermo",
        lastName: "del Toro",
        nationality: "Mexican",
        image: "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcTxtbRXP8Pevq74Fj-zlOBdbnM7BNkb4zGjR54H7jSom2Q4Fq0TB58VE4uzLS-OdLVX",
        birthday: "1964-10-09"
    }
    const res = await request(app).post('/directors').send(director);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(director.name);
    expect(res.body.id).toBeDefined();
});

test('PUT /directors/:id debe actualizar el director con un id dado', async () => {
    const director = {
        birthday: "1964-10-09",
    }
    const res = await request(app).put(`/directors/${id}`).send(director);
    expect(res.status).toBe(200);
    expect(res.body.birthday).toBe(director.birthday);
});

test('DELETE /directors/:id deb eliminar un director con el id dado', async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});