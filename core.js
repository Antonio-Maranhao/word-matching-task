// correctList = {'Discover','Project','Missions'};

console.log('loading this');
let wordOptions = [
	{label: 'Discover Banana Mechanic', value: 1},
	{label: 'Motivate Zealand Needles', value: 0},
	{label: 'Pinene Missions Superset', value: 0},
	{label: 'Religion Orange Missions', value: 1},
	{label: 'Summary Project Vacation', value: 1},
	{label: 'Arrival Flight Something', value: 0},
	{label: 'Kingdom Retired Missions', value: 1}
];


const executions = [];
let execLog = [];
let currentIteration = 1;

function startTask() {
	execLog.push({
		type: "start",
		ts: new Date(),
	});
}

function endTask() {
	execLog.push({
		type: "end",
		ts: new Date(),
	});
	executions.push({
		iteration: currentIteration,
		logs: execLog
	});
	currentIteration++;
	execLog = [];
}


function loadOptions() {
	console.log('going to load');
	const wordList = document.getElementById('wordList');
	wordOptions.forEach(el => {
		const newOption = document.createElement("option");
		newOption.text = el.label;
		newOption.value = el.value;
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
	execLog.push({
		type: "button-up",
		ts: new Date(),
	});
	moveToOption(-1);
}

function onButtonDown() {
	execLog.push({
		type: "button-down",
		ts: new Date(),
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
	loadOptions();
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
