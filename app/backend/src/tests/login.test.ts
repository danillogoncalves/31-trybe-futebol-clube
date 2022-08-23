import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';
import { IUser } from '../interfaces/IUser';
import UserModel from '../database/models/UserModel';

chai.use(chaiHttp);

const { expect } = chai;

const loginMock = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

const loginPasswordInvalidMock = {
  email: 'admin@admin.com',
  password: 'errou_password'
}

const loginEmptyEmailMock = {
  email: '',
  password: 'secret_admin'
}

const loginEmptyPasswordMock = {
  email: 'admin@admin.com',
  password: ''
}

const tokenMock = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2NjA5MzUyNDB9.T5PnN7t5excf9csbnaCEOo7E06UApM8v3fjQxcfZ9lc'
}

const userMock: IUser = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

describe('Login', () => {
  describe('Login', () => {
    beforeEach(() => {
      sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel);
    })
    afterEach(() => {
      sinon.restore();
    })
    it('Acesso com dados válidos no front-end, retorna status 200.', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(loginMock);
      expect(response.status).to.be.equal(200)
    })
    it('Acesso com dados válidos no front-end, retorna token correto.', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(loginMock);
      expect(response.body.token.split('.')[0]).to.be.equal(tokenMock.token.split('.')[0]);
    })
    it('Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso sem informar um email no front-end, retorna status 400.', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(loginEmptyEmailMock);
      expect(response.status).to.be.equal(400)
    })
    it('Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso sem informar um email no front-end, retorna messagem de erro.', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(loginEmptyEmailMock);
      expect(response.body.message).to.be.equal('All fields must be filled');
    })
    it('Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso sem informar um password no front-end, retorna status 400.', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(loginEmptyPasswordMock);
      expect(response.status).to.be.equal(400)
    })
    it('Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso sem informar um password no front-end, retorna messagem de erro.', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(loginEmptyPasswordMock);
      expect(response.body.message).to.be.equal('All fields must be filled');
    })
  })
  describe('Login', () => {
    beforeEach(() => {
      sinon.stub(UserModel, 'findOne').resolves(null);
    })
    afterEach(() => {
      sinon.restore();
    })
    it('Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso com um email inválido no front-end, retorno 401', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(loginMock);
      expect(response.status).to.be.equal(401)
    })
    it('Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso com um email inválido no front-end, retorno da messagem de erro,', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(loginMock);
      expect(response.body.message).to.be.equal('Incorrect email or password');
    })
  })
  describe('Login', () => {
    beforeEach(() => {
      sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel);
    })
    afterEach(() => {
      sinon.restore();
    })
    it('Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso com uma senha inválida no front-end, retorno 401', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(loginPasswordInvalidMock);
      expect(response.status).to.be.equal(401)
    })
    it('Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso com uma senha inválida no front-end, retorno da messagem de erro,', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(loginPasswordInvalidMock);
      expect(response.body.message).to.be.equal('Incorrect email or password');
    })
  })
})
