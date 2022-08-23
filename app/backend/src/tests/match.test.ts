import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import { listMatchesInProgressFalseMock, listMatchesInProgressTrueMock, listMatchesMock, requestCreateMatchMock, responseCreateMatchMock, updateGoals, userTokenInvalidMock, userTokenMock } from './mocks';
import TeamModel from '../database/models/TeamModel';

// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const test = [ 1 ]

describe('Matches', () => {
  describe('/matches', () => {
    beforeEach(() => {
      sinon.stub(MatchModel, 'findAll').resolves(listMatchesMock as unknown as MatchModel[])
    })
    afterEach(() => {
      sinon.restore();
    })
    it('Desenvolva o endpoint /matches de forma que seja possível filtrar as partidas em andamento na tela de partidas do front-end', async () => {
      const response = await chai.request(app).get('/matches')
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(listMatchesMock)
    })
  });
  describe('/matches?inProgress=true', () => {
    beforeEach(() => {
      sinon.stub(MatchModel, 'findAll').resolves(listMatchesInProgressTrueMock as unknown as MatchModel[])
    })
    afterEach(() => {
      sinon.restore();
    })
    it('Desenvolva o endpoint /matches de forma que seja possível filtrar as partidas em andamento na tela de partidas do front-end', async () => {
      const response = await chai.request(app).get('/matches?inProgress=true')
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(listMatchesInProgressTrueMock)
    })
  });
  describe('/matches?inProgress=false', () => {
    beforeEach(() => {
      sinon.stub(MatchModel, 'findAll').resolves(listMatchesInProgressFalseMock as unknown as MatchModel[])
    })
    afterEach(() => {
      sinon.restore();
    })
    it('Desenvolva o endpoint /matches de forma que seja possível filtrar as partidas finalizadas na tela de partidas do front-end', async () => {
      const response = await chai.request(app).get('/matches?inProgress=false')
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(listMatchesInProgressFalseMock)
    })
  });
  describe('/matches', () => {
    afterEach(() => {
      sinon.restore();
    })
    it('Desenvolva o endpoint /matches de modo que seja possível salvar uma partida com o status de inProgress como true no banco de dados', async () => {
      sinon.stub(MatchModel, 'create').resolves(responseCreateMatchMock as unknown as MatchModel)
      sinon.stub(TeamModel, 'findByPk').resolves(listMatchesMock[0] as unknown as TeamModel)
      const response = await chai.request(app)
        .post('/matches')
        .send(requestCreateMatchMock)
        .set('Authorization', userTokenMock.token)
      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal(responseCreateMatchMock)
    })
    it('Desenvolva o endpoint /matches de forma que não seja possível inserir uma partida com times iguais', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .send({
          "homeTeam": 8,
          "awayTeam": 8,
          "homeTeamGoals": 2,
          "awayTeamGoals": 2
        })
        .set('Authorization', userTokenMock.token)
      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('It is not possible to create a match with two equal teams')
    })
    it('Desenvolva o endpoint /matches de forma que não seja possível inserir uma partida com um time que não existe na tabela teams', async () => {
      sinon.stub(TeamModel, 'findByPk').resolves(null)
      const response = await chai.request(app)
        .post('/matches')
        .send({
          "homeTeam": 1001,
          "awayTeam": 8,
          "homeTeamGoals": 2,
          "awayTeamGoals": 2
        })
        .set('Authorization', userTokenMock.token)
      expect(response.status).to.be.equal(404);
      expect(response.body.message).to.be.equal('There is no team with such id!')
    })
    it('Desenvolva o endpoint /matches de forma que não seja possível inserir uma partida sem um token não existir', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .send(requestCreateMatchMock)
        .set('Authorization', '')
      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Token not found!')
    })
    it('Desenvolva o endpoint /matches de forma que não seja possível inserir uma partida sem um token válido', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .send(requestCreateMatchMock)
        .set('Authorization', userTokenInvalidMock.token)
      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Token must be a valid token')
    })
  });
  describe('/matches/:id/finish', () => {
    afterEach(() => {
      sinon.restore();
    })
    it('Desenvolva o endpoint /matches de forma que seja possível filtrar as partidas finalizadas na tela de partidas do front-end', async () => {
      sinon.stub(MatchModel, 'update').resolves([1] as unknown as [number, MatchModel[]])
      const response = await chai.request(app).patch('/matches/1/finish')
      expect(response.status).to.be.equal(200);
      expect(response.body.message).to.be.equal('Finished')
    })
    it('Desenvolva o endpoint /matches de forma que seja possível filtrar as partidas finalizadas na tela de partidas do front-end', async () => {
      sinon.stub(MatchModel, 'update').resolves([0] as unknown as [number, MatchModel[]])
      const response = await chai.request(app).patch('/matches/1001/finish')
      expect(response.status).to.be.equal(404);
      expect(response.body.message).to.be.equal('There is no match with such id or it\'s already been finished!')
    })
  });
  describe('/matches/:id', () => {
    afterEach(() => {
      sinon.restore();
    })
    it('Desenvolva o endpoint /matches/:id de forma que seja possível atualizar partidas em andamento', async () => {
      sinon.stub(MatchModel, 'update').resolves([1] as unknown as [number, MatchModel[]])
      const response = await chai.request(app).patch('/matches/49').send(updateGoals)
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(updateGoals)
    })
    it('Desenvolva o endpoint /matches/:id de forma que seja possível atualizar partidas em andamento', async () => {
      sinon.stub(MatchModel, 'update').resolves([0] as unknown as [number, MatchModel[]])
      const response = await chai.request(app).patch('/matches/1001')
      expect(response.status).to.be.equal(404);
      expect(response.body.message).to.be.equal('There is no match with such id or the goals are the same!')
    })
  });
})