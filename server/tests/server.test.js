const expect = require("expect");
const request = require("supertest");

const { app } = require("./../server");
const { Users } = require("./../models/users");

// beforeEach(done => {
//   Users.remove({}).then(() => done());
// });

describe("POST /users", done => {
  it("should create a new user", done => {
    const obj = {
      name: "Himanshu",
      email: "himanshu@gmail.com",
      password: "qwerty",
      userId: 1
    };

    request(app)
      .post("/users")
      .send(obj)
      .expect(200)
      .expect(res => {
        expect(res.body.name).toBe(obj.name);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Users.find().then(users => {
          expect(users[users.length - 1].name).toBe(obj.name);
          done();
        });
      });
  });

  it("should give 400 error", done => {
    request(app)
      .post("/users")
      .send({})
      .expect(400)
      .end(() => {
        done();
      });
  });
});
