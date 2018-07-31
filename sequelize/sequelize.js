import Sequelize from "sequelize";

var sequelize = new Sequelize('jwt','jwt','1111',{
    host:'localhost',
    dialect:'postgres'
})

const User = sequelize.define('user',{
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
    },
    username : {
        type : Sequelize.STRING,
        unique : true,
        allowNull : false
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    },
},{
    tableName : 'user',
    timestamps : false
})

sequelize.sync({
    force : false
})

export default User