
var Sequelize= require("sequelize"); 

var sequelize= require("./connection.js"); // cambiar a direct. 

var Races = sequelize.define('races', {

	uid:{
	    type: Sequelize.INTEGER, 

	},

	race:{
	    type: Sequelize.STRING, 

	}, 

	placemet:{
	    type: Sequelize.INTEGER, 

	} , 

	date:{
	    type:Sequelize.DATE, 
	}, 

	complete:{

	    type: Sequelize.BOOLEAN, 
	}

    }, 

    {
	timestamps: false
    }); 

Races.sync();

module.exports= Races; 