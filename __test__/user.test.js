
const mongoose = require('mongoose');
const request = require('supertest');
const helper = require('../helpers/user.helper');

const app = require('../index');
const { text } = require('express');
require('dotenv').config();

beforeEach(async() => {
    await mongoose.connect(process.env.MONGODB_URI);
})

afterEach(async() => {
    await mongoose.connection.close();
})

describe("Check User's route requests", () => {

    test("Get all users", async() => {

        const res = await request(app).get('/api/users');

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.length).toBeGreaterThan(0);

    }, 10000);

    test("Get a user", async() => {

        const result = await helper.findLastInsertedUser();
        
        const res = await request(app).get("/api/users/" + result.username);

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.username).toBe(result.username);
        expect(res.body.data.email).toBe(result.email);
    })
    
    test("Post create a user", async() => {

        const res = await request(app)
        .post('/api/users')
        .send({
            username: "test4",
            password: "1234",
            name: "name for test4",
            surname: "surname for test4",
            email: "test@aueb.gr"
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
    })

    test("Post create user that already exists", async() => {

        const result = await helper.findLastInsertedUser();

        const res = await request(app)
        .post('/api/users')
        .send({
            username: result.username,
            password: "1234",
            name: "new name",
            surname: "new surname",
            email: "new@aueb.gr"
        })

        expect(res.statusCode).toBe(400);
        expect(res.body.status).toBeFalsy();
    })

    test("Patch update a user", async() => {

        const result = await helper.findLastInsertedUser();

        const res = await request(app)
        .patch('/api/users/' + result.username)
        .send({
            username: result.username,
            name: "new updated name",
            surname: "new updated surname",
            email: "new@aueb.gr",
            address: {
                area: "xxx",
                road: "xxx",
                phone: [
                    {
                        type: "mobile",
                        number: "123654"
                    }
                ]
            }
        })

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();

    })

    test("Delete delete a user", async() => {

        const result = await helper.findLastInsertedUser();

        const res = await request(app).delete("/api/users/" + result.user);

        expect(res.statusCode).toBe(200);
    })
})