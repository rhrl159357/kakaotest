import {Sequelize} from 'sequelize'


const sequelize = new Sequelize('sqlite::momory:')

export default sequelize