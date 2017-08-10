process.env.NODE_ENV = 'test'

import { expect } from 'chai';
import { should } from 'chai';
import supertest from 'supertest';
import app from '../server/index';
import mockdata from '../server/utils/mockdata';
import jwt from 'jsonwebtoken';
require('dotenv').config();

const testApp = supertest(app);
const secret = process.env.SECRET;
let userToken;
let adminToken;

/**
 * @desc describes and tests the home route
 * @return 200 succes
 */

describe('Homepage', () => {
  it('Should return welcome to libary api', (done) => {
    testApp
    .get('/api')
    .set('Accept', 'Application/json')
    .expect(200, done);
  });
});

/**
 * @desc describes and tests the signup api route
 * @return 200 succes
 */

 describe('User signup', (done) => {

  // test for success with valid data for user
  it('should be able to signup - User', (done) => {
    testApp
    .post('/api/users/signup')
    .set('Accept', 'Application/json')
    .send(mockdata.user1)
    .expect(200, done) 
    });

    // test for success with valid data for admin
  it('Should be able to signup - Admin', (done) => {
    testApp
    .post('/api/users/signup')
    .set('Accept', 'Application/json')
    .send(mockdata.adminData)
    .expect(200, done) 
    });

 });

 describe('User signin', (done) => {

  // test for user sign in
  it('Should be able to sign it and get a token - User', (done) => {
    testApp
    .post('/api/users/signin')
    .set('Accept', 'Application/json')
    .send(mockdata.user1Login)
    .end((error, res) =>{
      userToken = res.body.data.token;
    done();
      }); 
    });

    // test for admin sign in
  it('Should be able to sign it and get a token - Admin', (done) => {
    testApp
    .post('/api/users/signin')
    .set('Accept', 'Application/json')
    .send(mockdata.adminLogin)
    .end((error, res) =>{
      adminToken = res.body.data.token;
    done();
      }); 
    });
 });


describe('Unathorized User' , () => {
 it('Should not be able to access this page', (done) => {
    testApp
    .post('/api/books')
    .set('Authorization', userToken)
    .send(mockdata.bookdata)
    .expect(401)
    .end((error, res) => {
        if(error) return done(error);
        done();
    });
   });
 }); 
describe('Upload books' , () => {
 it('Should be able to upload books', (done) => {
    testApp
    .post('/api/books')
    .set('Authorization', adminToken)
    .send(mockdata.bookdata)
    .expect(201, done);
   });
});
describe('Get books - Admin' , () => {
 it('Should be able to get books without signing in', (done) => {
    testApp
    .get('/api/books')
    .set('Authorization', adminToken)
    .expect('Content-Type', /json/)
    .expect(200, done);
   });
});
describe('Modify books - Admin' , () => {
 it('Should be able to modify books', (done) => {
    testApp
    .put('/api/books/1')
    .set('Authorization', adminToken)
    .send(mockdata.modifyBookData)
    .expect('Content-Type', /json/)
    .expect(200, done);
   });
});
describe('Get books - User' , () => {
 it('Should be able to get books without signing in', (done) => {
    testApp
    .get('/api/books')
    .set('Authorization', userToken)
    .expect('Content-Type', /json/)
    .expect(200, done);
   });
});
describe('Get books - User' , () => {
 it('Should be able to get books after signing in', (done) => {
    testApp
    .get('/api/users/:id/books')
    .set('Authorization', userToken)
    .send(mockdata.userID)
    .expect('Content-Type', /json/)
    .expect(200, done);
   });
});
describe('Borrow Books' , () => {
 it('Should allow users borrow books', (done) => {
    testApp
    .post('/api/users/:id/books')
    .set('Authorization', userToken)
    .send(mockdata.borrowBook)
    .expect('Content-Type', /json/)
    .expect(201, done);
   });
});
describe('Unauthorized Access' , () => {
 it('Should not allow users without token to borrow books', (done) => {
    testApp
    .post('/api/users/:id/books')
    .set('Authorization', '')
    .send(mockdata.borrowBook)
    .expect('Content-Type', /json/)
    .expect(401, done);
   });
});
describe('Return Books' , () => {
 it('Should allow users return books', (done) => {
    testApp
    .put('/api/users/:id/books')
    .set('Authorization', userToken)
    .send(mockdata.borrowBook)
    .expect('Content-Type', /json/)
    .expect(200, done);
   });
});
describe('Unauthorized Access' , () => {
 it('Should not allow users without token to return books', (done) => {
    testApp
    .put('/api/users/:id/books')
    .set('Authorization', '')
    .send(mockdata.borrowBook)
    .expect('Content-Type', /json/)
    .expect(401, done);
   });
});
// delete book should bere




















