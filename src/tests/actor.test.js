const request = require('supertest');
const app = require('../app');

let id;

test('GET /actors debe traer los actores', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors debe crear los actores', async () => {
    const actor = {
        firstName: "Wesley",
        lastName: "Snipes",
        nationality: "United state",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqyuJbhvE_sz5Yucq2Q19coso0lhZwYZ3NGvMbbuzosOYRGY0V",
        birthday: "1962-07-31"
    }
    const res = await request(app).post('/actors').send(actor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(actor.name);
    expect(res.body.id).toBeDefined();
});

test('PUT /actors/:id debe actualizar el actor con un id dado', async () => {
    const actor = {
        birthday: "1962-07-31",
    }
    const res = await request(app).put(`/actors/${id}`).send(actor);
    expect(res.status).toBe(200);
    expect(res.body.birthday).toBe(actor.birthday);
});

test('DELETE /actors/:id debe eliminar un actor con el id dado', async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});