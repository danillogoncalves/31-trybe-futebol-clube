import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';
import { allTeamsMock, leaderboardAwayMock, leaderboardHomeMock, leaderboardMock, listMatchesInProgressFalseMock } from './mocks';
import MatchModel from '../database/models/MatchModel';

// import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard', () => {
  describe('/leaderboard', () => {
    beforeEach(() => {
      sinon.stub(TeamModel, 'findAll').resolves(allTeamsMock as TeamModel[]);
      sinon.stub(MatchModel, 'findAll').resolves(listMatchesInProgressFalseMock as unknown as MatchModel[]);
    })
    afterEach(() => {
      sinon.restore();
    })
    it('Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end com os dados iniciais do banco de dados', async () => {
      const response = await chai.request(app).get('/leaderboard')
      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.deep.equal(leaderboardMock);
    })
    it('Desenvolva o endpoint /leaderboard/away, de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end, com os dados iniciais do banco de dados', async () => {
      const response = await chai.request(app).get('/leaderboard/away')
      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.deep.equal(leaderboardAwayMock);
    })
    it('Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados', async () => {
      const response = await chai.request(app).get('/leaderboard/home')
      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.deep.equal(leaderboardHomeMock);
    })
  })
})