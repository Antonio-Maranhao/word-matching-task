
// Set to 'true' to print all events to the browser's console
const logEventToConsole = true;

const executions = [];
let execLog = [];
let currentIteration = 1;

function logEvent(event) {
	const eventWithTime = {
		...event,
		ts: new Date().toISOString(),
	};
	execLog.push(eventWithTime);
	if (logEventToConsole) {
		console.log(eventWithTime);
	}
}

function startTask() {
	logEvent({
		type: "start",
	});
	const startIndex = (currentIteration - 1) * 10;
	const subset = wordListLarge.slice(startIndex, startIndex + 10);
	loadOptions(subset);
	const taskNumberLabel = document.getElementById('taskNumberLb');
	taskNumberLabel.textContent = currentIteration;
}

function endTask() {
	const wordList = document.getElementById('wordList');
	logEvent({
		type: "end",
		selection: {
			index: wordList.selectedIndex,
			label: wordList.options[wordList.selectedIndex].label,
			isCorrect: wordList.options[wordList.selectedIndex].value,
		}
	});
	executions.push({
		iteration: currentIteration,
		logs: execLog
	});
	currentIteration++;
	execLog = [];
}


function loadOptions(options) {
	console.log('going to load');
	const wordList = document.getElementById('wordList');
	// Clear list before adding new items
	for (let i=wordList.options.length-1; i>=0; i--) {
		wordList.options[i].remove();
	}
	options.forEach(el => {
		const newOption = document.createElement("option");
		newOption.text = el.label;
		newOption.value = el.answer;
		wordList.add(newOption);
	});
	wordList.selectedIndex = 0;
}

function moveToOption(increment) {
	const wordList = document.getElementById('wordList');
	let newSelectedIndex = wordList.selectedIndex + increment;
	if (newSelectedIndex >= 0 && newSelectedIndex < wordList.options.length) {
		wordList.selectedIndex = newSelectedIndex;
	}
}
function onButtonUp() {
	// console.log('moving up');
	logEvent({
		type: "button-up",
	});
	moveToOption(-1);
}

function onButtonDown() {
	logEvent({
		type: "button-down",
	});
	moveToOption(+1);
}

function onButtonStart() {
	const startPanel = document.getElementById('startPanel');
	startPanel.style['display'] = 'none';
	const taskPanel = document.getElementById('taskPanel');
	taskPanel.style['display'] = 'block';
	startTask();
}

function onButtonSubmit() {
	const taskPanel = document.getElementById('taskPanel');
	taskPanel.style['display'] = 'none';
	const startPanel = document.getElementById('startPanel');
	startPanel.style['display'] = 'block';
	
	endTask();
	console.log(executions);
}


// Runs after page is loaded to setup event handler and any other
// initialization code.
function onWindowLoad() {
	document.getElementById("buttonUp").addEventListener('click', onButtonUp, false);
	document.getElementById("buttonDown").addEventListener('click', onButtonDown, false);
	document.getElementById("buttonSubmit").addEventListener('click', onButtonSubmit, false);
	document.getElementById("buttonStart").addEventListener('click', onButtonStart, false);
}

if (window.onload) {
  var curronload = window.onload;
  // Prevents overriding if onload is already set
  var newonload = function (evt) {
    curronload(evt);
    onWindowLoad();
  };
  window.onload = newonload;
} else {
  window.onload = onWindowLoad;
}

// console.log('got here');
// document.addEventListener('load', loadOptions);
