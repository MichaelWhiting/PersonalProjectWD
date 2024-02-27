import { DataTypes, Model } from 'sequelize';
import util from 'util';

import connectToDB from './db.js'; // references the function that connects our db to the server
export const db = await connectToDB('postgresql:///gamesdb'); // creates a DB instance from the function with a connection to the postgresql db

class User extends Model { // extends model makes it so we can add the .hasMany & .belongsTo later on
    [util.inspect.custom]() { // this just organizes the json in the console, just to keep it organized
        return this.toJSON();
    }
}

User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        modelName: 'user', // tells sequelize what the models name is going to be
        sequelize: db // tells sequelize what db to get this from/store it 
    }
)

class Score extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
    }
}

Score.init(
    {
        scoreId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        gameName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        modelName: 'score',
        sequelize: db
    }
)

class Game extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
    }
}

Game.init(
    {
        gameName: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        scoreIds: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false 
        }
    },
    {
        modelName: 'game',
        sequelize: db
    }
)

// Table Relationships // foreignKey is the primaryKey of the one that HAS.

// Scores to users: // One-Many, A score is only tied to one user, but a user can have multiple scores
User.hasMany(Score, { foreignKey: "userId" });
Score.belongsTo(User, { foreignKey: "userId" });

// Scores to Games // One-Many, A score belongs to a game, but a game has multiple scores
Game.hasMany(Score, { foreignKey: "gameName" });
Score.belongsTo(Game, { foreignKey: "gameName" });

// export the newly made classes so that we can use them in the seed.js file to create instances to populate the database
export { User, Score, Game };