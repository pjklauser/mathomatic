angular.module('mathstrainer.services', [])

.factory('faceService', [function() {
    var hf_1 = [
              	[1,1,1,1,1,1,1,1,1],
              	[1,0,0,1,1,1,0,0,1],
              	[1,0,0,1,1,1,0,0,1],
              	[1,1,1,1,0,1,1,1,1],
              	[1,1,1,1,0,1,1,1,1],
              	[1,0,1,1,1,1,1,0,1],
              	[1,0,1,1,1,1,1,0,1],
              	[1,0,0,0,0,0,0,0,1],
              	[1,1,1,1,1,1,1,1,1]
             ];
    var hf_2 = [
              	[1,1,1,1,1,1,1,1,1],
              	[1,0,0,1,1,1,0,0,1],
              	[1,0,0,1,1,1,0,0,1],
              	[1,1,1,1,0,1,1,1,1],
              	[1,1,1,1,0,1,1,1,1],
              	[1,0,0,1,1,1,0,0,1],
              	[1,0,1,1,1,1,1,0,1],
              	[1,0,0,0,0,0,0,0,1],
              	[1,1,1,1,1,1,1,1,1]
             ];
    var hf_3 = [
              	[1,1,1,1,1,1,1,1,1],
              	[1,0,0,1,1,1,0,0,1],
              	[1,0,1,1,1,1,1,0,1],
              	[1,0,0,1,0,1,0,0,1],
              	[1,1,1,1,1,1,1,1,1],
              	[1,0,1,1,1,1,1,0,1],
              	[1,0,1,1,1,1,1,0,1],
              	[1,0,0,0,0,0,0,0,1],
              	[1,1,1,1,1,1,1,1,1]
             ];
    var hf_4 = [
              	[1,1,1,1,1,1,1,1,1],
              	[1,0,0,1,1,1,0,0,1],
              	[1,0,1,1,1,1,1,0,1],
              	[1,1,1,1,0,1,1,1,1],
              	[1,1,1,1,0,1,1,1,1],
              	[1,0,1,1,1,1,1,0,1],
              	[1,0,0,1,1,1,0,0,1],
              	[1,0,0,0,0,0,0,0,1],
              	[1,1,1,1,1,1,1,1,1]
             ];
    var hf_5 = [
              	[1,1,1,1,1,1,1,1,1],
              	[1,0,0,1,1,1,0,0,1],
              	[1,0,1,1,1,1,1,0,1],
              	[1,0,0,1,0,1,0,0,1],
              	[1,1,1,1,0,1,1,1,1],
              	[1,1,1,1,0,1,1,1,1],
              	[1,0,1,1,1,1,1,0,1],
              	[1,0,0,0,0,0,0,0,1],
              	[1,1,1,1,1,1,1,1,1]
             ];
    var hf_6 = [
              	[1,1,1,1,1,1,1,1,1],
              	[1,1,1,1,1,1,1,1,1],
              	[1,0,0,1,1,1,0,0,1],
              	[1,0,0,1,1,1,0,0,1],
              	[1,1,1,1,0,1,1,1,1],
              	[1,1,1,1,1,1,1,1,1],
              	[1,0,1,1,1,1,1,0,1],
              	[1,0,0,0,0,0,0,0,1],
              	[1,1,1,1,1,1,1,1,1]
             ];
    var hf_7 = [
              	[1,1,1,1,1,1,1,1,1],
              	[1,1,1,1,1,1,1,1,1],
              	[1,0,0,1,1,1,0,0,1],
              	[1,0,1,1,1,1,1,0,1],
              	[1,1,1,1,0,1,1,1,1],
              	[1,1,1,1,0,1,1,1,1],
              	[1,0,1,1,1,1,1,0,1],
              	[1,0,0,0,0,0,0,0,1],
              	[1,1,1,1,1,1,1,1,1]
             ];
    var hf_8 = [
              	[1,1,1,1,1,1,1,1,1],
              	[1,0,0,1,1,1,0,0,1],
              	[1,0,0,1,1,1,0,0,1],
              	[1,1,1,1,0,1,1,1,1],
              	[1,1,1,1,1,1,1,1,1],
              	[1,0,0,0,0,0,0,0,1],
              	[1,0,1,1,1,1,1,0,1],
              	[1,1,0,0,0,0,0,1,1],
              	[1,1,1,1,1,1,1,1,1]
             ];
    var happyFaces = [ hf_1, hf_2, hf_3, hf_4, hf_5, hf_6, hf_7, hf_8 ];

    
    var sf_1 = [
              	[1,1,1,1,1,1,1,1,1],
              	[1,1,1,1,1,1,1,1,1],
              	[1,0,0,1,1,1,0,0,1],
              	[1,0,0,1,0,1,0,0,1],
              	[1,1,1,1,0,1,1,1,1],
              	[1,1,1,1,1,1,1,1,1],
              	[1,1,0,0,1,1,1,1,1],
              	[1,1,0,0,1,1,1,1,1],
              	[1,1,1,1,1,1,1,1,1]
             ];
    
    var sf_2 = [
              	[1,1,1,1,1,1,1,1,1],
              	[1,0,1,1,1,1,1,0,1],
              	[1,0,0,1,1,1,0,0,1],
              	[1,1,1,1,1,1,1,1,1],
              	[1,1,1,1,1,1,1,1,1],
              	[1,0,1,0,1,0,1,0,1],
              	[1,0,0,0,0,0,0,0,1],
              	[1,1,1,1,1,1,1,1,1],
              	[1,1,1,1,1,1,1,1,1]
             ];
    var sf_3 = [
              	[1,1,1,1,1,1,1,1,1],
              	[1,1,1,1,1,1,1,1,1],
              	[1,0,0,1,1,1,0,0,1],
              	[1,1,0,1,0,1,0,1,1],
              	[1,1,1,1,1,1,1,1,1],
              	[1,1,0,0,0,0,0,1,1],
              	[1,0,0,0,0,0,0,0,1],
              	[1,1,1,1,1,1,1,1,1],
              	[1,1,1,1,1,1,1,1,1]
             ];
    var sf_4 = [
              	[1,1,1,1,1,1,1,1,1],
              	[1,1,1,1,1,1,1,1,1],
              	[1,0,0,1,1,1,0,0,1],
              	[1,0,0,1,0,1,0,0,1],
              	[1,1,1,1,1,1,1,1,1],
              	[1,1,0,0,0,0,0,1,1],
              	[1,0,0,1,1,1,0,0,1],
              	[1,0,1,1,1,1,1,0,1],
              	[1,1,1,1,1,1,1,1,1]
             ];
    var sf_5 = [
              	[1,1,1,1,1,1,1,1,1],
              	[1,0,0,1,1,1,0,0,1],
              	[1,0,0,1,1,1,0,0,1],
              	[1,0,1,1,0,1,1,0,1],
              	[1,1,1,1,1,1,1,1,1],
              	[1,0,0,0,0,0,0,0,1],
              	[1,0,1,1,1,1,1,0,1],
              	[1,0,1,1,1,1,1,0,1],
              	[1,1,1,1,1,1,1,1,1]
             ];
    var sf_6 = [
              	[1,1,1,1,1,1,1,1,1],
              	[1,0,0,0,1,0,0,0,1],
              	[1,0,1,1,1,1,1,0,1],
              	[1,1,1,1,0,1,1,1,1],
              	[1,1,1,1,1,1,1,1,1],
              	[1,0,0,0,0,0,0,0,1],
              	[1,0,1,1,1,1,1,0,1],
              	[1,0,1,1,1,1,1,0,1],
              	[1,1,1,1,1,1,1,1,1]
             ];
    var sf_7 = [
              	[1,1,1,1,1,1,1,1,1],
              	[1,0,0,1,1,1,0,0,1],
              	[1,0,1,1,1,1,1,0,1],
              	[1,1,1,1,0,1,1,1,1],
              	[1,1,1,1,1,1,1,1,1],
              	[1,1,0,0,0,0,0,1,1],
              	[1,0,1,1,1,1,1,0,1],
              	[1,0,1,1,1,1,1,0,1],
              	[1,1,1,1,1,1,1,1,1]
             ];
    var sf_8 = [
              	[1,1,1,1,1,1,1,1,1],
              	[1,1,0,1,1,1,0,1,1],
              	[1,0,0,1,1,1,0,0,1],
              	[1,1,1,1,0,1,1,1,1],
              	[1,1,1,1,1,1,1,1,1],
              	[1,1,0,0,0,0,0,1,1],
              	[1,1,0,1,1,1,0,1,1],
              	[1,1,0,0,0,0,0,1,1],
              	[1,1,1,1,1,1,1,1,1]
             ];
    
    var sadFaces = [ sf_1, sf_2, sf_3, sf_4, sf_5, sf_6, sf_7, sf_8 ];
    return {

		 get: function(emotion, key) {
	      console.log('faceService#get('+emotion+','+key+') ');
	      
	      var list = (emotion == 'happy' )? happyFaces : sadFaces; 
	      var idx = Math.floor(key % list.length);
	      return list[idx];
	    }
	  }
	}]
)

.factory('Motivation', [function() {
	var motivations = [
	                   'Go for it!',
	                   'Good luck!',
	                   'Alright!',
	                   'Try hard now',
	                   'Keep trying!',
	                   'You are doing great!',
	                   'Come on now',
	                   'Super!',
	                   'Yeah man',
	                   'Wonderful',
	                   'Awesome dude',
	                   'Are you ready?',
	                   'Just do it!'
	  ];
	  return {
	    get: function() {
	    	var pos = RandomIntFromInterval(0,motivations.length-1);
	    	return motivations[pos];
	    }
	  }
	}]
)


.factory('LocalStorage', ['$window', function($window) {
	  return {
	    set: function(key, value) {
	      console.log('LocalStorage#set('+key+') ', value);
	      $window.localStorage[key] = value;
	    },
	    get: function(key, defaultValue) {
	      console.log('LocalStorage#get('+key+') ', defaultValue);
	      return $window.localStorage[key] || defaultValue;
	    },
	    setObject: function(key, value) {
	      console.log('LocalStorage#setObject('+key+') ', value);
	      $window.localStorage[key] = JSON.stringify(value);
	    },
	    getObject: function(key, defaultValue) {
		  console.log('LocalStorage#getObject('+key+') ', defaultValue);
	      return JSON.parse($window.localStorage[key] || JSON.stringify(defaultValue));
	    },
	    clear: function() {
	    	$window.localStorage.clear();	    	
	    }
	  }
	}]
)


/**
 * The Results
 */
.factory('Result', ['LocalStorage', function(LocalStorage) {

	  return {
	    getProgramResults: function(programName,mathoName) {
	    	var results = LocalStorage.getObject(programName+'-'+mathoName, []);
	    	var functionalResults = [];
	    	for( var i = 0; i < results.length; i++ ) {
	    		var p = new ProgramResult();
	    		merge(p,results[i]);
	    		functionalResults.push(p);
	    	}
	    	return functionalResults;
	    },
		addProgramResult: function(programName,mathoName, result) {
			console.log('Result#addProgramResult '+programName+'-'+mathoName, result);
			var results = this.getProgramResults(programName, mathoName);
			results.push(result);
			if ( results.length > 100 ) {
				console.log("trimming results < 100");
				results.shift();
			}
			LocalStorage.setObject(programName+'-'+mathoName, results);
			return results;
		}
	  }
}])

/**
 * A simple example service that returns some data.
 */
.factory('Config', ['LocalStorage', 'Result', function(LocalStorage, Result) {
	var model = {
		programs : {},
			          
		mathoname : 'Your Name',
		
		maxId : 0,
		
		pin : 0,
		
		pinEntered : false, // not persisted
		
		getTotalActiveTime : function () {
			var t = 0;
	  		for (var i = 0, len = this.programs.length; i < len; i++) {
	  			if ( this.programs[i].enabled && this.programs[i].hasOwnProperty('durationInSec') ) {
	  				t += this.programs[i].durationInSec;
	  			}
	  		}
			return DisplayDuration(t);
		},
	
		getNextId : function() {
		 	if ( this.maxId == 0 ) {
		  		// if uninitialized - get max id from existing programs
		  		for (var i = 0, len = this.programs.length; i < len; i++) {
		  			if ( this.programs[i].id > this.maxId ) {
		  				this.maxId = this.programs[i].id;
		  			}
		  		}
		  	}
			return ++this.maxId;
		},
		
		load : function() {
			var prog1 = new SequentialMultiplicationConfig();
			prog1.id = 1;
			prog1.name = "Practice Two Times Table";
			prog1.durationInSec = 60;
			prog1.num1Integer = 1;
			prog1.num2Integer = 10;
			prog1.num3Integer = 2;
			prog1.num4Integer = 2;

			var prog2 = new TotalSumConfig();
			prog2.id = 2;
			prog2.name = "Total Sum";
			prog2.durationInSec = 60;
			prog2.num1Digits = 1;
			prog2.num2Digits = 1;
			prog2.numSums = 2;
			
			var prog3 = new RndSelectMultiplicationConfig();
			prog3.id = 3;
			prog3.name = "Practice Time Tables";
			prog3.durationInSec = 60;
			prog3.num1Integer = 1;
			prog3.num2Integer = 10;
			prog3.num3Integer = 1;
			prog3.num4Integer = 10;
			
			var prog4 = new TotalSumConfig();
			prog4.id = 4;
			prog4.name = "Five Mental Additions";
			prog4.durationInSec = 60;
			prog4.num1Integer = 1;
			prog4.num2Integer = 99;
			prog4.num3Integer = 1;
			prog4.num4Integer = 9;
			prog4.numSums = 5;
			
			var prog5 = new UpperBoundedAdditionConfig();
			prog5.id = 5;
			prog5.name = "Additions in the 100 Range";
			prog5.durationInSec = 60;
			prog5.num1Integer = 99;
			
			var prog6 = new SubtractionConfig();
			prog6.id = 6;
			prog6.name = "Difference up to 10 in the 100 range";
			prog6.durationInSec = 60;
			prog6.num1Integer = 10;
			prog6.num2Integer = 99;
			prog6.num3Integer = 1;
			prog6.num4Integer = 10;
			
			var prog7 = new RndSelectDivisionConfig();
			prog7.id = 3;
			prog7.name = "Practice Division";
			prog7.durationInSec = 60;
			prog7.num1Integer = 1;
			prog7.num2Integer = 10;
			prog7.num3Integer = 1;
			prog7.num4Integer = 10;
			
			this.programs = LocalStorage.getObject('programs', [
			            			            prog1,
			            			            prog2,
			            			            prog3,
			            			            prog4,
			            			            prog5,
			            			            prog6,
			            			            prog7
			            			          ]);
			this.maxId = LocalStorage.get('maxId', 0);
			this.pin = LocalStorage.get('pin', '3.14');
		},
		
		save : function() {
			LocalStorage.setObject('programs',this.programs);
			LocalStorage.set('maxId', this.maxId);
			LocalStorage.set('pin', this.pin);
		}
		
	};
  
  function store() {
	  console.log('Config#store()');
	  model.save();
  };
  function load() {
		console.log('Config#load()');
	    model.load();
  };
  
  // initialize the Service
  load();
  
  return {
    getModel: function() {
      return model;
    },
    getMathoName: function() {
    	return model.mathoname;
    },
    getAllPrograms: function() {
        return model.programs;
    },
	getActivePrograms: function() {
		var activePrograms = [];
	      for( var i = 0; i < model.programs.length; i++ ) {
	    	  if ( model.programs[i].enabled ) {
	    		  activePrograms.push(model.programs[i]);
	    	  }
	      }
		return activePrograms;
	},
    getProgram: function(id) {
      for( var i = 0; i < model.programs.length; i++ ) {
    	  if ( model.programs[i].id == id ) {
    		  return model.programs[i];
    	  }
      }
      return null;
    },
	addProgram: function(program) {
		console.log('Config#addProgram', program);
		program.id = model.getNextId();
		
		model.programs.push(program);
		store();
	},
	reorderProgram: function(program, fromIndex, toIndex) {
		console.log('Config#reorderProgram['+fromIndex+']->['+toIndex+']', program);
	    model.programs.splice(fromIndex, 1);
	    model.programs.splice(toIndex, 0, program);
	    store();
	},
	deleteProgram: function(program) {
		console.log('Config#deleteProgram', program);
	    model.programs.splice(model.programs.indexOf(program), 1); 
	    store();
	},
	save: function() {
		console.log('Config#save');
		store();
	},
	reset: function() {
		console.log('Config#reset');
		LocalStorage.clear();
		load();
	}
  }
}])



/**
 * The Game
 */
.factory('Game', ['Config','Result', function(Config,Result) {

  var gamestate = {};

	return {

		initGame : function() { 
			console.log('GameState#initGame');
			gamestate.programNumber = 0;
			
			gamestate.programs = [];
			var activeProgs = Config.getActivePrograms();
			for( var i = 0; i < activeProgs.length; i++ ) {
				var conf = activeProgs[i];
				
		    	  if ( conf.configType == 'smp' ) {
		    		  var p = new SequentialMultiplicationProgram();
		    		  p.config(conf);
		    		  gamestate.programs.push(p);
		    	  } else if ( conf.configType == 'rsm' ) {
		    		  var p = new RndSelectMultiplicationProgram();
		    		  p.config(conf);
		    		  gamestate.programs.push(p);
		    	  } else if ( conf.configType == 'rsd' ) {
		    		  var p = new RndSelectDivisionProgram();
		    		  p.config(conf);
		    		  gamestate.programs.push(p);
		    	  } else if ( conf.configType == 'rsd' ) {
		    		  var p = new RndSelectDivisionProgram();
		    		  p.config(conf);
		    		  gamestate.programs.push(p);
		    	  } else if ( conf.configType == 'ts' ) {
		    		  var p = new TotalSumProgram();
		    		  p.config(conf);
		    		  gamestate.programs.push(p);
		    	  } else if ( conf.configType == 'ubadd' ) {
		    		  var p = new UpperBoundedAdditionProgram();
		    		  p.config(conf);
		    		  gamestate.programs.push(p);
		    	  } else if ( conf.configType == 'subtr' ) {
		    		  var p = new SubtractionProgram();
		    		  p.config(conf);
		    		  gamestate.programs.push(p);
		    	  }
		    	  
		    	  //TODO extend
		      }
			gamestate.programContext = null;
		},

		initProgram : function() {
			console.log('GameState#initProgram');
			var program = this.getProgram();
			if ( program == null ) {
				return; // end of program
			}
			gamestate.programContext = program.init();
		},

		getProgram : function() {
			if (typeof gamestate.programs != 'undefined') {
				if ( gamestate.programNumber < 0 || gamestate.programNumber > gamestate.programs.length ) {
					// game finished
					return null;
				}
				return gamestate.programs[gamestate.programNumber];
			}
			return null;
		},
		
		isGameFinished : function() {
			return this.getProgram() == null;
		},
		
		getResult : function() {
			if (gamestate.programContext != null && gamestate.programContext.hasOwnProperty('result')) {
				return gamestate.programContext.result;
			}
			return null;
		},
		
		nextProgram : function() {
			// step to next program
			gamestate.programNumber++;
			return this.getProgram();
		},
		
		successfullResult : function( timeMillis ) {
			console.log('GameState#successfullResult', timeMillis);
			gamestate.programContext.result.correct++;
			gamestate.programContext.result.durationMillis += timeMillis;
		},
		
		incorrectResult : function( timeMillis, wrongAnswer ) {
			console.log('GameState#incorrectResult '+ timeMillis, wrongAnswer);
			var result = this.getResult();
			result.incorrect++;
			result.durationMillis += timeMillis;
			result.addWrongAnswer(wrongAnswer);
		},
		
		nextQuestion : function() {
			console.log('GameState#nextQuestion', gamestate);

			var program = this.getProgram();
			if ( program == null ) {
				return null;
			}
			
			return program.generate( gamestate.programContext );
		}
	}
}]);


;
