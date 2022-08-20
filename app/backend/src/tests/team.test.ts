import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';
import { ITeam } from '../interfaces/ITeam';
// import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const teamsMock: ITeam[] = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
  {
    "id": 4,
    "teamName": "Corinthians"
  },
  {
    "id": 5,
    "teamName": "Cruzeiro"
  },
  {
    "id": 6,
    "teamName": "Ferroviária"
  },
  {
    "id": 7,
    "teamName": "Flamengo"
  },
  {
    "id": 8,
    "teamName": "Grêmio"
  },
  {
    "id": 9,
    "teamName": "Internacional"
  },
  {
    "id": 10,
    "teamName": "Minas Brasília"
  },
  {
    "id": 11,
    "teamName": "Napoli-SC"
  },
  {
    "id": 12,
    "teamName": "Palmeiras"
  },
  {
    "id": 13,
    "teamName": "Real Brasília"
  },
  {
    "id": 14,
    "teamName": "Santos"
  },
  {
    "id": 15,
    "teamName": "São José-SP"
  },
  {
    "id": 16,
    "teamName": "São Paulo"
  }
];

describe('Teams', () => {
  describe('/teams', () => {
    beforeEach(() => {
      sinon.stub(TeamModel, 'findAll').resolves(teamsMock as TeamModel[])
    })
    afterEach(() => {
      sinon.restore();
    })
    it('Desenvolva o endpoint /teams no back-end de forma que ele possa retornar todos os times corretamente, com status 200.', async () => {
      const response = await chai.request(app)
        .get('/teams');
      expect(response.status).to.be.equal(200);
    })
    it('Desenvolva o endpoint /teams no back-end de forma que ele possa retornar todos os times corretamente, retorna lista de times.', async () => {
      const response = await chai.request(app)
        .get('/teams');
      expect(response.body).to.be.deep.equal(teamsMock);
    })
  })
  describe('/teams/:id', () => {
    beforeEach(() => {
      sinon.stub(TeamModel, 'findByPk').resolves(teamsMock[11] as TeamModel)
    })
    afterEach(() => {
      sinon.restore();
    })
    it('Desenvolva o endpoint /teams/:id no back-end de forma que ele possa retornar dados de um time específico, com status 200.', async () => {
      const response = await chai.request(app)
        .get('/teams/12');
      expect(response.status).to.be.equal(200);
    })
    it('Desenvolva o endpoint /teams no back-end de forma que ele possa retornar todos os times corretamente, retorna lista de times.', async () => {
      const response = await chai.request(app)
        .get('/teams/12');
      expect(response.body).to.be.deep.equal(teamsMock[11]);
    })
    it('Desenvolva o endpoint /teams/:id no back-end de forma que ele possa retornar dados de um time específico, com status 404.', async () => {
      const response = await chai.request(app)
        .get('/teams/1001');
      expect(response.status).to.be.equal(200);
    })
    it('Desenvolva o endpoint /teams no back-end de forma que ele possa retornar todos os times corretamente, retorna lista de times.', async () => {
      const response = await chai.request(app)
        .get('/teams/1001');
      expect(response.body).to.be.deep.equal(teamsMock[11]);
    })
  })
  describe('/teams/:id', () => {
    beforeEach(() => {
      sinon.stub(TeamModel, 'findByPk').resolves(null)
    })
    afterEach(() => {
      sinon.restore();
    })
    it('Desenvolva o endpoint /teams/:id no back-end de forma que ele possa retornar um erro com status 404.', async () => {
      const response = await chai.request(app)
        .get('/teams/1001');
      expect(response.status).to.be.equal(404);
    })
    it('Desenvolva o endpoint /teams/:id no back-end de forma que ele possa retornar uma messagem de erro.', async () => {
      const response = await chai.request(app)
        .get('/teams/1001');
      expect(response.body.message).to.be.equal('There is no team with such id!');
    })
  })
})