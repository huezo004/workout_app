var express = require('express');
var Workouts= require('./workouts-db.js'); 
var Races= require('./races-db.js');
var Users= require('./users-db.js');  
var path= require("path"); 
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 9000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
 extended: true
}));

app.use(bodyParser.text());

app.use(bodyParser.json({
  type: "application/vnd.api+json"

}));

app.get("/", function(req, res){

	res.sendFile(path.join(__dirname, "view.html")); 

 }); 

app.get("/add_race", function(req, res) {

  res.sendFile(path.join(__dirname, "add_race.html"));

});

app.get("/add_workout", function(req, res) {

  res.sendFile(path.join(__dirname, "add_workout.html"));

});

app.post("/newuser", function(req, res){

	a = Object.keys(req.body)[0]; 

	Users.create({

		User_name: a		

    }).then(function(){
	
	Users.findAll({

                where:{
                  
                     User_name: a			
		      }

	    }).then(function(results){		   
		    		  		    	  		  
             var userId= results[0].Uid; 
		
             Workouts.create({

		            uid: userId
	         
			        });

		     Races.create({

		           uid: userId 
		      
			       });
		}); 

	}); 

        res.end(); 	    
 }); 


app.get("/:user", function(req, res){

	var user = req.params.user;  

	Users.findAll({
		where:{		

		    User_name:user					    
		}

	 }).then(function(results){
	    
	    var userId = results[0].Uid; 		 		 

	    console.log(userId); 
	    
	    Races.findAll({

		where:{		    
		    uid:userId					    
		}
	             }).then(function(results){		 
		
			     res.send(results); 
	
			 });		   

	    Workouts.findAll({
		    where:{
			uid:userId
		       }
	            }).then(function(results){

			}); 

	     }); 

    });

app.get("/races/:user", function(req, res){

	var user = req.params.user; 
	
	Users.findAll({

                where:{

                    User_name:user
			}

	    }).then(function(results){

		    var userId = results[0].Uid;		   

		    Races.findAll({

			    where:{

				uid:userId

				    }

			}).then(function(results){

				console.log(results); 

				res.send(results);

			 });
		}); 
}); 

app.get("/workouts/:user", function(req, res){

	var user = req.params.user; 

	Users.findAll({
                where:{

                    User_name:user

                      }
            }).then(function(results){

                  var userId = results[0].Uid;

                  Workouts.findAll({

                      where:{

                           uid: userId

                        }

		      }).then(function(results){

	              res.json(results);

			 });      
		});    

    });

app.post("/new_workout/:user",  function(req, res){
        
    var user = req.params.user;  

    var newWorkout = req.body;

    Users.findAll({

              where:{
                  
                       User_name: user         
             }

        }).then(function(results){         
                      
          var userId= results[0].Uid; 
                         
          //Adding workout 
          Workouts.create({

          uid: userId, 

          activity: newWorkout.name, 

          duration: newWorkout.role, 

          date: Date(newWorkout.date), 

          complete: newWorkout.complete

             });

        }); //end then 

        res.end();      
    });

app.post("/new_race/:user", function(req, res){
        
    var user = req.params.user;  

    var newRace = req.body;

    console.log(newRace);

    Users.findAll({

                where:{
                  
                        User_name: user         
           }

        }).then(function(results){         
                      
          var userId= results[0].Uid; 
                          
          //Adding race 
          Races.create({

          uid: userId, 

          race: newRace.name, 

          placemet: newRace.role, 

          date: Date(newRace.date), 

          complete: newRace.complete
              
                  });

        });//end then  

        res.end();      
    
    });

app.listen(port, function(){

	console.log('WorkOut app listening on port ' + port);
 
   });




