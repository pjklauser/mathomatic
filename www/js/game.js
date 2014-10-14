//http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object
function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

// merge copy's properties into obj
function merge(obj, copy) {
    // for all attributes of the copy clone it into the original obj
    if (obj instanceof Object) {
        for (var attr in obj) {
            if (copy.hasOwnProperty(attr)) obj[attr] = clone(copy[attr]);
        }
    } else {
        throw new Error("Unable to copy obj! Its type isn't supported.");
    }
}

function ReverseArray( array ) {
	return array.slice().reverse();
}

// the display of a number range
function InclusiveNumberRangeDisplay( num1, num2 ) {
	if ( num1 == num2 ) {
		return ''+num1;
	} else {
		return '['+num1+'..'+num2+']';
	}
}

// the display of multiplication
function IntegerMultiplicationDisplay( num1, num2 ) {
	return ''+num1 + 'x' +num2;
}
//the result of multiplication as a string
function IntegerMultiplicationResult( num1, num2 ) {
	return ''+(num1 * num2);
}
function IntegerDisplay( num1 ) {
	return ''+num1;
}
function DisplayEquals() {
	return '=';
}

function NumberOfDigits( number ) {
	var i = 1;
	var reduce = number;
	for( var reduce = number; reduce > 10; reduce = reduce / 10 ) {
		i++
	}
	return i;
}

function DisplayDuration( durationInSec ) {
	var hours   = Math.floor(durationInSec / 3600);
    var minutes = Math.floor((durationInSec - (hours * 3600)) / 60);
    var seconds = durationInSec - (hours * 3600) - (minutes * 60);

    // make sure double digits where appropriate
    var time = '';
    if( hours > 0 ) {
        if (hours < 10 ) {hours = '0'+hours;}
        time += hours + ':';
        // only if we have hours do we want the minutes to be MM format.
        if (minutes < 10) {minutes = '0'+minutes;}
    }
    if (seconds < 10) {seconds = "0"+seconds;}
    time    += minutes+':'+seconds;
    return time;
}

// inclusive bound http://stackoverflow.com/questions/4959975/generate-random-value-between-two-numbers-in-javascript
function RandomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function DisplayDate( timestamp ) {
	var d = new Date(timestamp) ;
	var day = d.getDate();
	var month = d.getMonth() + 1;
	var year = d.getFullYear();
	return ''+day+'-'+month+'-'+year;
}

// the result of a program in terms of questions.
function ProgramResult() {
	this.timestamp = new Date().getTime();
	this.durationMillis = 0;
	this.correct = 0;
	this.incorrect = 0;
	this.wrongAnswers = [];
	
	this.getPercentCorrect = function() {
		var percent = (this.correct * 100)/ (this.correct+this.incorrect);
		return Math.round(percent * 100) / 100
	};
	
	this.getDurationPerQuestion = function() {
		var rate= (this.durationMillis / 1000 ) / (this.correct+this.incorrect);
		return Math.round(rate * 100) / 100
	};
	
	this.getDurationTotal = function() {
		var durS= Math.round(this.durationMillis / 1000 );
		return DisplayDuration(durS);
	};
	
	this.addWrongAnswer = function ( wrongAnswer ) {
		this.wrongAnswers.push( wrongAnswer );
	};
	
}

// the calculator state shows a display text and optionally
// requests a result to be entered. If result is null, the
// next button is displayed.
function CalculatorState( displayText, answer ) {
	this.displayText = displayText;
	this.answer = answer;
}

// a calculator flow is a set of sequential states
function CalculatorFlow() {
	this.steps = [];
	this.enteredAnswer = null;
	
	this.addState = function ( step ) {
		this.steps.push( step );
	}
	
	this.setEnteredAnswer = function( enteredAnswer ) {
		this.enteredAnswer = enteredAnswer;
	}
}

// the program context contains the running time for the program and any
// state that the generator keeps in it.
function ProgramContext(totalTimeMillis) {
	this.result = new ProgramResult();
 
	this.totalTimeMillis = totalTimeMillis;
	this.isTimeExceeded = function() {
		return this.result.durationMillis > this.totalTimeMillis; 
	}
}

function SequentialMultiplicationConfig() {
	this.configType = "smp"

	this.id = 0;
	this.enabled = true;
	this.name = "Enter Name";
	this.skippable = true;
	this.durationInSec = 60;
	
	this.num1Integer = 1;
	this.num2Integer = 1;
	this.num3Integer = 1;
	this.num4Integer = 1;
}

function SequentialMultiplicationProgram() {
	
	this.config = function( config ) {
		this.name = config.name;
		this.skippable = config.skippable;
		this.durationInSec = config.durationInSec;
		this.num1Integer = config.num1Integer;
		this.num2Integer = config.num2Integer;
		this.num3Integer = config.num3Integer;
		this.num4Integer = config.num4Integer;
	};
	
	this.summary = function() {
		return IntegerMultiplicationDisplay(InclusiveNumberRangeDisplay(this.num1Integer,this.num2Integer),InclusiveNumberRangeDisplay(this.num3Integer,this.num4Integer));
	};
	
	this.duration = function() {
		return DisplayDuration(this.durationInSec);
	}
	
	this.init = function() {
		var ctx = new ProgramContext(this.durationInSec*1000);
		ctx.indexPos1 = this.num1Integer;
		ctx.indexPos2 = this.num3Integer;
		return ctx;
	};
	
	// get an array of CalculatorStates from 
	this.generate = function( context ) {
		if ( context.isTimeExceeded() ) {
			// time exceeded, go on to next program.
			return null;
		}
		if ( context.indexPos1 > this.num2Integer ) {
			context.indexPos1 = this.num1Integer;
			context.indexPos2 = context.indexPos2 + 1;
		}
		if ( context.indexPos2 > this.num4Integer ) {
			context.indexPos2 = this.num3Integer;
		}
		var flow = new CalculatorFlow();
		flow.addState( new CalculatorState(IntegerMultiplicationDisplay(context.indexPos1,context.indexPos2 ), IntegerMultiplicationResult(context.indexPos1, context.indexPos2)) );
		context.indexPos1 = context.indexPos1 + 1;
		return flow;
	}
}


function RndSelectMultiplicationConfig() {
	this.configType = "rsm"
		
	this.id = 0;
	this.enabled = true;
	this.name = "Enter Name";
	this.skippable = true;
	this.durationInSec = 60;
	
	this.num1Integer = 1;
	this.num2Integer = 1;
	this.num3Integer = 1;
	this.num4Integer = 1;
}

function RndSelectMultiplicationProgram() {
	this.config = function( config ) {
		this.name = config.name;
		this.skippable = config.skippable;
		this.durationInSec = config.durationInSec;
		this.num1Integer = config.num1Integer;
		this.num2Integer = config.num2Integer;
		this.num3Integer = config.num3Integer;
		this.num4Integer = config.num4Integer;
	};
	
	this.summary = function() {
		return 'RndSel('+IntegerMultiplicationDisplay(InclusiveNumberRangeDisplay(this.num1Integer,this.num2Integer),InclusiveNumberRangeDisplay(this.num3Integer,this.num4Integer))+')';
	};

	this.duration = function() {
		return DisplayDuration(this.durationInSec);
	};
	
	this.internalInit = function(context) {
		var questions = [];
		
		for( var i = this.num1Integer ; i <= this.num2Integer; i++ ) {
			for( var j = this.num3Integer; j <= this.num4Integer; j++ ) {
				var flow = new CalculatorFlow();
				flow.addState( new CalculatorState(IntegerMultiplicationDisplay(i, j), IntegerMultiplicationResult(i, j)) );
				questions.push(flow);
			}
		}
		context.questions = shuffle(questions);
		context.indexPos = 0;
	};
	
	this.init = function() {
		var memory = new ProgramContext(this.durationInSec*1000);
		this.internalInit(memory);
		return memory;
	};
	
	// get an array of CalculatorStates from 
	this.generate = function( context ) {
		if ( context.isTimeExceeded() ) {
			// time exceeded, go on to next program.
			return null;
		}

		if ( context.indexPos > context.questions.length ) {
			// completed all, go on to next program.
			console.log('Index exceeded ' + this.indexPos);
			this.internalInit(context);
		}
		var flow = context.questions[context.indexPos];
		context.indexPos = context.indexPos + 1;
		return flow;
	}
}


function TotalSumConfig() {
	this.configType = "ts"

	this.id = 0;
	this.enabled = true;
	this.name = "Enter Name";
	this.skippable = true;
	this.durationInSec = 60;
	
	this.num1Integer = 1;
	this.num2Integer = 99;
	this.num3Integer = 1;
	this.num4Integer = 9;
	this.numSums = 5;
}

function TotalSumProgram() {
	this.config = function( config ) {
		this.name = config.name;
		this.skippable = config.skippable;
		this.durationInSec = config.durationInSec;
		this.num1Integer = config.num1Integer;
		this.num2Integer = config.num2Integer;
		this.num3Integer = config.num3Integer;
		this.num4Integer = config.num4Integer;
		this.numSums = config.numSums;
	};
	
	this.summary = function() {
		return ''+InclusiveNumberRangeDisplay(this.num1Integer,this.num2Integer)+"{+"+InclusiveNumberRangeDisplay(this.num3Integer,this.num4Integer)+"}"+this.numSums;
	};
	
	this.duration = function() {
		return DisplayDuration(this.durationInSec);
	}
	
	this.init = function() {
		return new ProgramContext(this.durationInSec*1000);
	};
	
	// get an array of CalculatorStates from 
	this.generate = function( context ) {
		if ( context.isTimeExceeded() ) {
			// time exceeded, go on to next program.
			console.log('Duration exceeded ' + this.durationInSec);
			return null;
		}
		var flow = new CalculatorFlow();
		
		var sum = RandomIntFromInterval(this.num1Integer,this.num2Integer);
		flow.addState( new CalculatorState(IntegerDisplay(sum), null) );
		for( var i = 0; i < this.numSums-1; i++ ) {
			var nextInteger = RandomIntFromInterval(this.num3Integer,this.num4Integer);
			flow.addState( new CalculatorState('+'+IntegerDisplay(nextInteger) ,null) );
			sum += nextInteger;
		}
		var lastInteger = RandomIntFromInterval(this.num3Integer,this.num4Integer);
		sum += lastInteger;
		
		flow.addState( new CalculatorState('+'+IntegerDisplay(lastInteger)+DisplayEquals(), IntegerDisplay(sum) ));
		return flow;
	}
}


function UpperBoundedAdditionConfig() {
	this.configType = "ubadd"

	this.id = 0;
	this.enabled = true;
	this.name = "Enter Name";
	this.skippable = true;
	this.durationInSec = 60;
	
	this.num1Integer = 99;
}


function UpperBoundedAdditionProgram() {
	this.config = function( config ) {
		this.name = config.name;
		this.skippable = config.skippable;
		this.durationInSec = config.durationInSec;
		this.num1Integer = config.num1Integer; // max integer > 9
	};
	
	this.summary = function() {
		return '0 < X+Y < '+IntegerDisplay(this.num1Integer);
	};
	
	this.duration = function() {
		return DisplayDuration(this.durationInSec);
	}
	
	this.init = function() {
		return new ProgramContext(this.durationInSec*1000);
	};
	
	// get an array of CalculatorStates from 
	this.generate = function( context ) {
		if ( context.isTimeExceeded() ) {
			// time exceeded, go on to next program.
			console.log('Duration exceeded ' + this.durationInSec);
			return null;
		}
		var flow = new CalculatorFlow();
		
		var x = RandomIntFromInterval(1,this.num1Integer-1);
		var y = RandomIntFromInterval(1, this.num1Integer-x);
		var sum = x + y;
		flow.addState( new CalculatorState(IntegerDisplay(x)+'+'+IntegerDisplay(y), IntegerDisplay(sum)) );
		return flow;
	}
}

