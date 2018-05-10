import { expect } from "chai";
import request from "supertest";
import { getApp } from "../../app";
import { getUserRouter } from "../../backend/controllers/user_controller";
import { connecToDatabase } from "../../db";


describe('POST /users', ()=>{
    it('should created a new user ', async()=>{
        await connecToDatabase();
        const user = {
            email: "yosephBuitrago.01@gmail.com",
            password: "123"
        };
        const app = await getApp;
        await request(app).post("/api/v1/users")
            .set('Accept', 'application/json')
            .send(user)
            .expect('Content-Type',/json/)
            .expect(201)
            .then((res)=>{
                expect(res.body.email).to.eql(user.email);
                expect(res.body.password).to.eqls(user.password);
            });
    });
});