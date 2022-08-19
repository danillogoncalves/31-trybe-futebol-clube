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

describe('login/validate', () => {
  describe('/login/validate', () => {
    beforeEach(() => {
      sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel);
    })
    afterEach(() => {
      sinon.restore();
    })
    it('Desenvolva o endpoint /login/validate no back-end de maneira que ele retorne os dados corretamente no front-end, retorna status 200.', async () => {
      const response = await chai.request(app)
        .get('/login/validate').set('Authorization', tokenMock.token);
      expect(response.status).to.be.equal(200)
    })
    it('Desenvolva o endpoint /login/validate no back-end de maneira que ele retorne os dados corretamente no front-end, retorna messagem.', async () => {
      const response = await chai.request(app)
        .get('/login/validate').set('Authorization', tokenMock.token);
      expect(response.body.role).to.be.equal('admin')
    })
  })
})