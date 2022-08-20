import { INTEGER, Model } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

class MatchModel extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: number;
}

MatchModel.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

TeamModel.hasMany(MatchModel, { foreignKey: 'homeTeam', as: 'macthes' });
MatchModel.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'teams' });

TeamModel.hasMany(MatchModel, { foreignKey: 'awayTeam', as: 'macthes' });
MatchModel.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'teams' });
