let app = require('../src/app');
let supertest = require('supertest');

let request = supertest(app)

test("API should answer on port 8080", () => {
    
    return request.get("/").then(res => {
        expect(res.statusCode).toEqual(200);
    })
})
