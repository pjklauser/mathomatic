angular.module('mathstrainer.controllers', ['mathstrainer.services'])

.filter('reverse', function() {
	  return function(items) {
	    return items.slice().reverse();
	  };
})

.filter('duration', function() {
	  return function(durationInSec) {
	    return DisplayDuration(durationInSec);
	  };
})

.filter('todate', function() {
	  return function(timestamp) {
	    return DisplayDate(timestamp);
	  };
})

.filter('skippable', function() {
	  return function(isSkippable) {
	    return isSkippable ? '' : '!';
	  };
})

.controller('FaceCtrl', function( $scope, $window, $location, $ionicViewService, Game, Config) {
	  console.log('FaceCtrl ', $scope);

})


.controller('StartCtrl', function( $scope, $window, $location, $ionicViewService, Game, Config) {
	  console.log('StartCtrl ', $scope);

	$ionicViewService.clearHistory();
	
	$scope.model = Config.getModel();
	
	$scope.onClickStart = function() {
		console.log('StartCtrl#onClickStart ', Game);
		Game.initGame();
		$location.path('/program');
	};

	$scope.onClickEdit = function(program) {
		console.log('StartCtrl#onClickEdit ', Game);
		$location.path('/tab/config/pin');
	};
})


.controller('ProgramCtrl', function( $scope, $window, $location, $ionicViewService, Game, Config, Motivation) {
	console.log('ProgramCtrl ', $scope);

	$ionicViewService.clearHistory();
	
	$scope.program = Game.getProgram();
	$scope.motivation = Motivation.get();
	
	if ( $scope.program == null ) {
    	$location.path('/start');
	};
	
	$scope.onClickPlay = function() {
		console.log('StartCtrl#play');
		Game.initProgram(); // we enter the play screen with initialized Program.
		$location.path('/play');
	};
	$scope.onClickSkip = function() {
		console.log('StartCtrl#skip');
		$scope.program = Game.nextProgram();
		
		if ( Game.isGameFinished() ) {
			$location.path('/tab/results');
			return;
		}
	};
})

.controller('PlayCtrl', function( $scope, $window, $location, Game, $timeout) {
	console.log('PlayCtrl ', $scope);

	$scope.showSuccess = false;
	$scope.showFailure = false;
	$scope.showAnswer = false;
	$scope.stepNumber = 0;
	$scope.question = null;
	$scope.startTimeMillis = 0;
	$scope.stopTimeMillis = 0;
	$scope.durationMillis = 0;
	$scope.displayText = "";
	$scope.answer = null;
	$scope.enteredAnswer = "";
	$scope.textclass = 'small-question';
	
	$scope.initDisplay = function() {
		console.log('PlayCtrl#initDisplay', $scope);
		if ( $scope.question != null ) {
			$scope.displayText = $scope.question.steps[$scope.stepNumber].displayText;
			$scope.answer = $scope.question.steps[$scope.stepNumber].answer;
		} else {
			$scope.displayText = "";
			$scope.answer = null;
		}
		$scope.enteredAnswer = "";
		$scope.showSuccess = false;
		$scope.showFailure = false;
		$scope.showAnswer = false;
	};

	$scope.initQuestion = function() {
		console.log('PlayCtrl#initQuestion', $scope);
		$scope.stepNumber = 0;
		$scope.question = Game.nextQuestion();
		$scope.startTimeMillis = new Date().getTime();
		$scope.stopTimeMillis = 0;
		$scope.initDisplay();

		if ( $scope.question == null ) {
	    	$location.path('/score');
		}
		var maxTextLen = $scope.displayText.length;
		if ( $scope.answer != null && $scope.answer.length > maxTextLen ) {
			maxTextLen = $scope.answer.length;
		}
		if ( maxTextLen <= 4 ) {
			$scope.textclass = 'large-question';
		} else if ( maxTextLen <= 8 ) {
			$scope.textclass = 'medium-question';
		} else {
			$scope.textclass = 'small-question';
		}
	};
	
	$scope.initQuestion();
	
	$scope.doClickRetry = function() {
		console.log('PlayCtrl#doClickRetry', $scope);
		if ( $scope.showFailure ) {
			$scope.stepNumber = 0;
			$scope.initDisplay();
		}
	};
	
	$scope.doClickShow = function() {
		console.log('PlayCtrl#doClickShow', $scope);
		if ( $scope.showFailure ) {
			$scope.showAnswer = true;
			$scope.enteredAnswer = $scope.answer; // assign to show correct answer. 
		}
	};
	
	$scope.doClickEnter = function() {
		console.log('PlayCtrl#doClickEnter', $scope);
		if ( $scope.showAnswer || $scope.showSuccess || $scope.showFailure ) {
			// continue to next question
			$scope.durationMillis = 0;
			$scope.initQuestion();
			return;
		}
		if ( $scope.question == null ) {
			// if we're at the end of the questions and somehow still hit return
			if ( $scope.question == null ) {
		    	$location.path('/score');
				return;
			}
		}
		if ( $scope.answer == null ) {
			// just go to next step
			$scope.stepNumber += 1;
			$scope.initDisplay();
		} else {
			// we require an answer and it's been entered
			$scope.stopTimeMillis = new Date().getTime();
			
			if ( $scope.durationMillis != 0 ) {
				// we've had a result before
				if ( $scope.enteredAnswer === $scope.answer ) {
					// - continue to next question
					$scope.durationMillis = 0;
					$scope.initQuestion();
				} else {
					$scope.showFailure = true;
				}
			} else {
				$scope.durationMillis = $scope.stopTimeMillis - $scope.startTimeMillis;
				if ( $scope.enteredAnswer === $scope.answer ) {
					// correct, register result 
					Game.successfullResult( $scope.durationMillis );
					// - continue to next question
					$scope.showSuccess = true;
					$timeout( function() {
						$scope.durationMillis = 0;
						$scope.initQuestion();
					}, 1000 );
				} else {
					// wrong answer, register result
					$scope.question.setEnteredAnswer( $scope.enteredAnswer );
					Game.incorrectResult( $scope.durationMillis, $scope.question );

					$scope.showFailure = true;
				}
			}
			
		}
	};
	
	$scope.doClickDelete = function() {
		console.log('PlayCtrl#doClickDelete', $scope);
		if ( $scope.enteredAnswer.length > 0 ) {
			$scope.enteredAnswer = $scope.enteredAnswer.substring(0, $scope.enteredAnswer.length - 1);
		}
	};
	
	$scope.doClick = function( $buttonValue ) {
		console.log('PlayCtrl#doClick', $scope);
		console.log('Buttonvalue', $buttonValue);

	    $scope.enteredAnswer += $buttonValue;
	};	

    $scope.$watch( 'enteredAnswer', function(newValue, oldValue ) {
  	  console.log('PlayCtrl#watch oldValue', oldValue);
  	  console.log('PlayCtrl#watch newvalue', newValue);
  	    if(oldValue !== newValue && newValue != null && $scope.answer != null && !($scope.showAnswer || $scope.showSuccess || $scope.showFailure) && newValue.length >= $scope.answer.length ) {
  	    	$scope.doClickEnter();
   	    }
    	  }, true);

})

.controller('ScoreCtrl', function( $scope, $window, $location, Game, Config, Result) {
	console.log('ScoreCtrl ', $scope);

	$scope.currentProgram = Game.getProgram();
	$scope.result = Game.getResult();
	$scope.nextProgram = Game.nextProgram();
	$scope.finished = Game.isGameFinished(); 
	if ($scope.result != null && $scope.currentProgram != null ) {

		// save the previous gamestate.programContext.result
		Result.addProgramResult($scope.currentProgram.name, Config.getMathoName(), $scope.result);

		$scope.history = ReverseArray(Result.getProgramResults($scope.currentProgram.name, Config.getMathoName())); 
		
		
	} else {
    	$location.path('/start');
	}
	
})

.controller('ResultsCtrl', function($scope, $ionicViewService, Config, Result) {
    console.log('ResultsCtrl ', $scope);
    
	$ionicViewService.clearHistory();

	$scope.model = Config.getModel();
    
	$scope.getLastResultPercent = function(programName) {
		console.log('getLastResultPercent '+programName);
		
		var results = Result.getProgramResults(programName,Config.getMathoName());
		if ( results.length > 0 ) {
			var lastResult = results[results.length-1];
			return lastResult.getPercentCorrect();
		}
		return 'n/a';
	};
	$scope.getLastDurationPerQuestion = function(programName) {
		console.log('getLastDurationPerQuestion '+programName);
		
		var results = Result.getProgramResults(programName,Config.getMathoName());
		if ( results.length > 0 ) {
			var lastResult = results[results.length-1];
			return lastResult.getDurationPerQuestion();
		}
		return 'n/a';
	};
})

.controller('ResultDetailCtrl', function($scope, $stateParams, Config, Result) {
    console.log('ResultDetailCtrl ', $scope);
    
	$scope.programName = $stateParams.programId;
	$scope.results = ReverseArray(Result.getProgramResults($scope.programName,Config.getMathoName()));
    
})

.controller('ResultGraphCtrl', function($scope, $stateParams, Config, Result) {
    console.log('ResultGraphCtrl ', $scope);
    
	$scope.programName = $stateParams.programId;
	
	$scope.history = ReverseArray(Result.getProgramResults($scope.programName, Config.getMathoName()));
    
})


.controller('ConfigPinCtrl', function($scope, $ionicViewService, Config) {
    console.log('ConfigPinCtrl ', $scope);
	
	$ionicViewService.clearHistory();

    var PI = '3.14';
    var PI_msg = 'PI to 2 decimal places';
    
	  $scope.model = Config.getModel();
	  $scope.pinReset = $scope.model.pin == PI;
	  $scope.enteredPin = '';
	  
	  $scope.data = {
			   showDelete: false
	  };
			  
	  $scope.moveItem = function(item, fromIndex, toIndex) {
		  Config.reorderProgram(item,fromIndex,toIndex);
	  };

	  $scope.onItemDelete = function(item) {
	    Config.deleteProgram(item);
	  };

      $scope.checkPin = function(value) {
   	   	  console.log('checkPin', value);
		  if ( value == $scope.model.pin ) {
			  $scope.model.pinEntered = true;
		  } else {
			  $scope.model.pinEntered = false;
		  }
	  };
	  
	  $scope.resetPin = function() {
   	   	  console.log('ConfigPinCtrl#resetPin');
		  $scope.enteredPin = '';
		  $scope.model.pin = PI;
		  $scope.pinReset = true;
	  };
	  
	  $scope.factoryReset = function() {
   	   	  console.log('ConfigPinCtrl#factoryReset');
		  Config.reset();
	  };
	  
      $scope.$watch( 'model.pin', function(newValue, oldValue ) {
  	    if(oldValue !== newValue ) {
   	   	  console.log('PIN Changed', newValue);
   	      $scope.pinReset = $scope.model.pin == PI;
   	   Config.save();
   	    }
        }, true);
      
	  
      $scope.$watch( 'model.programs', function(newValue, oldValue) {
  	    if(oldValue !== newValue ) {
   	    	  console.log('Config Changed ', newValue);
   	    	Config.save()
   	    }
    	  }, true);
      
})

.controller('AddConfigCtrl', function($scope, Config) {
	  console.log('AddConfigCtrl ', $scope);
})

.controller('AddModifySequentialMultiplicationConfigCtrl', function($scope, $stateParams, Config) {
	  console.log('AddModifySequentialMultiplicationConfigCtrl ', $scope);

	  $scope.program = ('programId' in $stateParams) ? clone(Config.getProgram($stateParams.programId)) : null;
	  if ( $scope.program == null ) {
		  $scope.program = new SequentialMultiplicationConfig();
	  };
	  $scope.dirty = false;
	  $scope.valid = false;
	  $scope.error = '';
	  
	  $scope.add = function() {
		  Config.addProgram($scope.program);
	  };  
	  $scope.save = function() {
		  var c = Config.getProgram($scope.program.id);
		  merge(c, $scope.program);
		  Config.save();
		  $scope.dirty = false;
	  };  
	  $scope.validate = function() {
		  if ( $scope.program.durationInSec <= 0 ) {
			  $scope.valid = false;
			  $scope.error = 'Duration cannot be <= 0';
			  return;
		  }
		  if ( $scope.program.num1Integer <= 0 ) {
			  $scope.valid = false;
			  $scope.error = 'Range 1 Start cannot be <= 0';
			  return;
		  }
		  if ( $scope.program.num2Integer <= 0 ) {
			  $scope.valid = false;
			  $scope.error = 'Range 1 End cannot be <= 0';
			  return;
		  }
		  if ( $scope.program.num3Integer <= 0 ) {
			  $scope.valid = false;
			  $scope.error = 'Range 2 Start cannot be <= 0';
			  return;
		  }
		  if ( $scope.program.num4Integer <= 0 ) {
			  $scope.valid = false;
			  $scope.error = 'Range 2 End cannot be <= 0';
			  return;
		  }
		  if ( $scope.program.num2Integer < $scope.program.num1Integer ) {
			  $scope.valid = false;
			  $scope.error = 'Range 1 End < Range 1 Start';
			  return;
		  }
		  if ( $scope.program.num4Integer < $scope.program.num3Integer ) {
			  $scope.valid = false;
			  $scope.error = 'Range 2 End < Range 2 Start';
			  return;
		  }
		  $scope.valid = true;
		  $scope.error = '';
	  };
      $scope.$watch( 'program', function(newValue, oldValue ) {
    	    if(oldValue !== newValue ) {
     	    	console.log('Config Changed ', newValue);
     	    	
     	    	$scope.validate();
     	    	
     	    	if ( $scope.program.id > 0 ) {
         	    	$scope.dirty = true;
     	    	}
     	    }
      	  }, true);
})


.controller('AddModifyRandomSelectMultiplicationConfigCtrl', function($scope, $stateParams, Config) {
	  console.log('AddModifyRandomSelectMultiplicationConfigCtrl ', $scope);

	  $scope.program = ('programId' in $stateParams) ? clone(Config.getProgram($stateParams.programId)) : null;
	  if ( $scope.program == null ) {
		  $scope.program = new RndSelectMultiplicationConfig();
	  };
	  $scope.dirty = false;
	  $scope.valid = false;
	  $scope.error = '';
	  
	  $scope.add = function() {
		  Config.addProgram($scope.program);
	  };  
	  $scope.save = function() {
		  var c = Config.getProgram($scope.program.id);
		  merge(c, $scope.program);
		  Config.save();
		  $scope.dirty = false;
	  };  
	  $scope.validate = function() {
		  if ( $scope.program.durationInSec <= 0 ) {
			  $scope.valid = false;
			  $scope.error = 'Duration cannot be <= 0';
			  return;
		  }
		  if ( $scope.program.num1Integer <= 0 ) {
			  $scope.valid = false;
			  $scope.error = 'Range 1 Start cannot be <= 0';
			  return;
		  }
		  if ( $scope.program.num2Integer <= 0 ) {
			  $scope.valid = false;
			  $scope.error = 'Range 1 End cannot be <= 0';
			  return;
		  }
		  if ( $scope.program.num3Integer <= 0 ) {
			  $scope.valid = false;
			  $scope.error = 'Range 2 Start cannot be <= 0';
			  return;
		  }
		  if ( $scope.program.num4Integer <= 0 ) {
			  $scope.valid = false;
			  $scope.error = 'Range 2 End cannot be <= 0';
			  return;
		  }
		  if ( $scope.program.num2Integer < $scope.program.num1Integer ) {
			  $scope.valid = false;
			  $scope.error = 'Range 1 End < Range 1 Start';
			  return;
		  }
		  if ( $scope.program.num4Integer < $scope.program.num3Integer ) {
			  $scope.valid = false;
			  $scope.error = 'Range 2 End < Range 2 Start';
			  return;
		  }
		  $scope.valid = true;
		  $scope.error = '';
	  };
     $scope.$watch( 'program', function(newValue, oldValue ) {
    	    if(oldValue !== newValue ) {
     	    	console.log('Config Changed ', newValue);
     	    	
     	    	$scope.validate();
     	    	
     	    	if ( $scope.program.id > 0 ) {
         	    	$scope.dirty = true;
     	    	}
     	    }
      	  }, true);
})

.controller('AddModifyTotalSumConfigCtrl', function($scope, $stateParams, Config) {
	  console.log('AddModifyTotalSumConfigCtrl ', $scope);

	  $scope.program = ('programId' in $stateParams) ? clone(Config.getProgram($stateParams.programId)) : null;
	  if ( $scope.program == null ) {
		  $scope.program = new TotalSumConfig();
	  };
	  $scope.dirty = false;
	  $scope.valid = false;
	  $scope.error = '';
	  
	  $scope.add = function() {
		  Config.addProgram($scope.program);
	  };  
	  $scope.save = function() {
		  var c = Config.getProgram($scope.program.id);
		  merge(c, $scope.program);
		  Config.save();
		  $scope.dirty = false;
	  };  
	  $scope.validate = function() {
		  if ( $scope.program.durationInSec <= 0 ) {
			  $scope.valid = false;
			  $scope.error = 'Duration cannot be <= 0';
			  return;
		  }
		  if ( $scope.program.num1Integer <= 0 ) {
			  $scope.valid = false;
			  $scope.error = 'Range 1 Start cannot be <= 0';
			  return;
		  }
		  if ( $scope.program.num2Integer <= 0 ) {
			  $scope.valid = false;
			  $scope.error = 'Range 1 End cannot be <= 0';
			  return;
		  }
		  if ( $scope.program.num3Integer <= 0 ) {
			  $scope.valid = false;
			  $scope.error = 'Range 2 Start cannot be <= 0';
			  return;
		  }
		  if ( $scope.program.num4Integer <= 0 ) {
			  $scope.valid = false;
			  $scope.error = 'Range 2 End cannot be <= 0';
			  return;
		  }
		  if ( $scope.program.num2Integer < $scope.program.num1Integer ) {
			  $scope.valid = false;
			  $scope.error = 'Range 1 End < Range 1 Start';
			  return;
		  }
		  if ( $scope.program.num4Integer < $scope.program.num3Integer ) {
			  $scope.valid = false;
			  $scope.error = 'Range 2 End < Range 2 Start';
			  return;
		  }
		  if ( $scope.program.numSums <= 0 ) {
			  $scope.valid = false;
			  $scope.error = 'Number of Sums cannot be <= 0';
			  return;
		  }
		  $scope.valid = true;
		  $scope.error = '';
	  };
      $scope.$watch( 'program', function(newValue, oldValue ) {
    	    if(oldValue !== newValue ) {
     	    	console.log('Config Changed ', newValue);
     	    	
     	    	$scope.validate();
     	    	
     	    	if ( $scope.program.id > 0 ) {
         	    	$scope.dirty = true;
     	    	}
     	    }
      	  }, true);
})


.controller('AddModifyUpperBoundedAdditionConfigCtrl', function($scope, $stateParams, Config) {
	  console.log('AddModifyUpperBoundedAdditionConfigCtrl ', $scope);

	  $scope.program = ('programId' in $stateParams) ? clone(Config.getProgram($stateParams.programId)) : null;
	  if ( $scope.program == null ) {
		  $scope.program = new UpperBoundedAdditionConfig();
	  };
	  $scope.dirty = false;
	  $scope.valid = false;
	  $scope.error = '';
	  
	  $scope.add = function() {
		  Config.addProgram($scope.program);
	  };  
	  $scope.save = function() {
		  var c = Config.getProgram($scope.program.id);
		  merge(c, $scope.program);
		  Config.save();
		  $scope.dirty = false;
	  };  
	  $scope.validate = function() {
		  if ( $scope.program.durationInSec <= 0 ) {
			  $scope.valid = false;
			  $scope.error = 'Duration cannot be <= 0';
			  return;
		  }
		  if ( $scope.program.num1Integer <= 9 ) {
			  $scope.valid = false;
			  $scope.error = 'Maximum Sum cannot be <= 10';
			  return;
		  }
		  $scope.valid = true;
		  $scope.error = '';
	  };
      $scope.$watch( 'program', function(newValue, oldValue ) {
    	    if(oldValue !== newValue ) {
     	    	console.log('Config Changed ', newValue);
     	    	
     	    	$scope.validate();
     	    	
     	    	if ( $scope.program.id > 0 ) {
         	    	$scope.dirty = true;
     	    	}
     	    }
      	  }, true);
})


;
