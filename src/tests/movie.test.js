const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models')

let id;

test('GET /movies debe traer las peliculas', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies debe crear las peliculas', async () => {
    const movie = {
        name: "Blade II",
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSKZC5gJG_S8r3lcKZeLNk7iKUERywLvECO6K0kI0tTeUWSKRog",
        synopsis: "Sinopsis de la película Blade",
        releaseYear: 2002
    }
    const res = await request(app).post('/movies').send(movie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(movie.name);
    expect(res.body.id).toBeDefined();
});

test('PUT /movies/:id debe actualizar una pelicula con un id dado', async () => {
    const movie = {
        name: "Blade II",
    }
    const res = await request(app).put(`/movies/${id}`).send(movie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
});

test('POST /movies/:id/actors', async () => {
    const actor = await Actor.create({
        firstName: "Wesley",
        lastName: "Snipes",
        nationality: "United state",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqyuJbhvE_sz5Yucq2Q19coso0lhZwYZ3NGvMbbuzosOYRGY0V",
        birthday: "1962-07-31"
    })
    const res = await request(app)
        .post(`/movies/${id}/actors`)
        .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /movies/:id/directors', async () => {
    const director = await Director.create({
        firstName: "Guillermo",
        lastName: "del Toro",
        nationality: "Mexican",
        image: "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcTxtbRXP8Pevq74Fj-zlOBdbnM7BNkb4zGjR54H7jSom2Q4Fq0TB58VE4uzLS-OdLVX",
        birthday: "1964-10-09"
    })
    const res = await request(app)
        .post(`/movies/${id}/directors`)
        .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /movies/:id/genres', async () => {
    const genre = await Genre.create({
        name: "Acción",
    })
    const res = await request(app)
        .post(`/movies/${id}/genres`)
        .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});


test('DELETE /movies/:id deb eliminar una pelicula con un id dado', async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});