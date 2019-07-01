let mainBoard = document.querySelector('.checkers-board');
let checker = {};
let confirmedMove = false;
let tempCheck = false;
allowedPositions = [0, 1, 13, 26, 38, 51, 63, 76, 88, 25, 50, 75];
let minPos  = Math.min(...allowedPositions);
let maxPos = Math.max(...allowedPositions);

const isCloseEnough = (a, b) => {
	return Math.abs(a - b) < 1;
};
const roundTo = check => {
	allowedPositions.forEach(allow => {
		if (isCloseEnough(check.posTop, allow)) {
			check.posTop = allow;
		}
		if (isCloseEnough(check.posLeft, allow)) {
			check.posLeft = allow;
		}
	});
};
const whiteCheckers = [
	{ id: 'white-check-1', posTop: 0.5, posLeft: 0.5 }, //12, 25
	{ id: 'white-check-2', posTop: 0.5, posLeft: 25.7 },
	{ id: 'white-check-3', posTop: 0.5, posLeft: 50.7 },
	{ id: 'white-check-4', posTop: 0.5, posLeft: 75.7 },
	{ id: 'white-check-5', posTop: 13.2, posLeft: 13.2 },
	{ id: 'white-check-6', posTop: 13.2, posLeft: 38.2 },
	{ id: 'white-check-7', posTop: 13.2, posLeft: 63.2 },
    { id: 'white-check-8', posTop: 13.2, posLeft: 88.2 },
    { id: 'white-check-9', posTop: 25.7, posLeft: 0.5 }, //12, 25
	{ id: 'white-check-10', posTop: 25.7, posLeft: 25.7 },
    { id: 'white-check-11', posTop: 25.7, posLeft: 50.7 },
	{ id: 'white-check-12', posTop: 25.7, posLeft: 75.7 }
];
const blackCheckers = [
	{ id: 'black-check-1', posTop: 88.5, posLeft: 13 }, //12, 25
	{ id: 'black-check-2', posTop: 88.5, posLeft: 38 },
	{ id: 'black-check-3', posTop: 88.5, posLeft: 63 },
	{ id: 'black-check-4', posTop: 88.5, posLeft: 88 },
	{ id: 'black-check-5', posTop: 76, posLeft: 0 },
	{ id: 'black-check-6', posTop: 76, posLeft: 26 },
	{ id: 'black-check-7', posTop: 76, posLeft: 51 },
    { id: 'black-check-8', posTop: 76, posLeft: 76 },
    { id: 'black-check-9', posTop: 63.5, posLeft: 13 },
    { id: 'black-check-10', posTop: 63.5, posLeft: 38 },
    { id: 'black-check-11', posTop: 63.5, posLeft: 63 },
	{ id: 'black-check-12', posTop: 63.5, posLeft: 88 }

];
window.onload = () => {
	whiteCheckers.forEach(whiteCheck => {
		return drawCheck(whiteCheck, (color = 'white'), whiteCheck.id, confirmedMove = false, tempCheck=false,);
	});
	blackCheckers.forEach(blackCheck => {
		return drawCheck(blackCheck, (color = 'black'), blackCheck.id, confirmedMove = false, tempCheck=false);
	});
};
const createChecker = color => {
	checker = document.createElement('div');
	color === 'white' && !tempCheck
		? (checker.classList = 'checker white-checker')
		: (checker.classList = 'checker black-checker');
	checker.setAttribute('data-color', color);
	checker.style.position = 'absolute';
};

const drawCheck = (item, color, checkId, tempCheck) => {
	if (!document.querySelector(`#${item.id}`) && !tempCheck) {
		createChecker(color);
	} else if (tempCheck) {
		createChecker(color);
		checker.classList = `checker possible`;
		checker.style.backgroundColor = `gray`;
		checker.setAttribute('data-id', checkId);
	} else {
		checker = document.querySelector(`#${item.id}`);
	}
	checker.id = item.id;
	checker.style.top = `${item.posTop}%`;
	checker.style.left = `${item.posLeft}%`;
	tempCheck = false;
	mainBoard.appendChild(checker);

	if (confirmedMove) {
		let elem = document.querySelectorAll('.possible');
		elem.forEach(el => el.parentNode.removeChild(el));
        possibleMoves = [];
        confirmedMove = false;
	}
};

document.addEventListener(
	'click',
	function(event) {
		if (
			event.target.matches('.checker') &&
			!event.target.matches('.possible')
		) {
			chooseCheck(event.target);
		}
		if (event.target.matches('.possible')) {
			confirmMove(event.target);
		}
	},
	false
);
document.addEventListener('touchstart',
function(event) {
    if (
        event.target.matches('.checker') &&
        !event.target.matches('.possible')
    ) {
        chooseCheck(event.target);
    }
    if (event.target.matches('.possible')) {
        confirmMove(event.target);
    }
},
false
);

const chooseCheck = item => {
	const chosenCheck = document.querySelector(`#${item.id}`);
	let tempCheckOne = {};
	let tempCheckTwo = {};
	let tempIndex = '';
	tempCheck = true;

	chosenCheck.classList.toggle('chosen-checker');
	const color = chosenCheck.attributes['data-color'].value;
    let diff = 12.5;

	if (color === 'white') {
		tempIndex = whiteCheckers.findIndex(item => item.id == chosenCheck.id);
        let whiteId = whiteCheckers[tempIndex];
		tempCheckOne = {
			id: 'tempCheckOne',
			posTop: whiteId.posTop + diff,
			posLeft: whiteId.posLeft + diff
		};
		tempCheckTwo = {
			id: 'tempCheckTwo',
			posTop: whiteId.posTop + diff,
			posLeft: whiteId.posLeft - diff
        };
        whiteCheckers.forEach(
            el => {
                if (parseInt(el.posTop) == parseInt(tempCheckOne.posTop)){
                    tempCheckOne.posTop+=diff;
                    tempCheckOne.posLeft+=diff;
                }
                if (parseInt(el.posTop) == parseInt(tempCheckTwo.posTop)){
                    tempCheckTwo.posTop+=diff;
                    tempCheckTwo.posLeft-=diff;
                }
            }
        )
		roundTo(tempCheckOne);
		roundTo(tempCheckTwo);

		drawCheck(tempCheckOne, color, whiteId.id, tempCheck);
		drawCheck(tempCheckTwo, color, whiteId.id, tempCheck);
    }
     if (color === 'black') {
        tempIndex = blackCheckers.findIndex(item => item.id == chosenCheck.id);
        let blackId = blackCheckers[tempIndex];
		tempCheckOne = {
			id: 'tempPos1',
			posTop: blackId.posTop - diff,
			posLeft: blackId.posLeft - diff
		};
		tempCheckTwo = {
			id: 'tempPos2',
			posTop: blackId.posTop - diff,
			posLeft: blackId.posLeft + diff
		};

        blackCheckers.forEach(
            el => {
                if (parseInt(el.posTop) == parseInt(tempCheckOne.posTop)){
                    tempCheckOne.posTop-=diff;
                    tempCheckOne.posLeft-=diff;
                }
                if (parseInt(el.posTop) == parseInt(tempCheckTwo.posTop)){
                    tempCheckTwo.posTop-=diff;
                    tempCheckTwo.posLeft+=diff;
                }
            }
        )

		roundTo(tempCheckOne);
		roundTo(tempCheckTwo);

		drawCheck(tempCheckOne, color, blackId.id, tempCheck);
        drawCheck(tempCheckTwo, color, blackId.id, tempCheck);
	}
};

const confirmMove = item => {
    color = `${item.attributes['data-color'].value}`;
    let confirmedId = item.attributes['data-id'].value;
    confirmedMove = true;

	let tempItem = {
		id: `${confirmedId}`,
		posTop: parseInt(item.style.top),
		posLeft: parseInt(item.style.left)
	};
	if (color === 'white') {
		let tempIndex = whiteCheckers.findIndex(
			check => check.id == confirmedId
        );
        whiteCheckers.splice(tempIndex, 1, tempItem);
	} else {
		let tempIndex = blackCheckers.findIndex(
			check => check.id == confirmedId
		);
		blackCheckers.splice(tempIndex, 1, tempItem);
	}
	drawCheck(tempItem, color, confirmedId, tempCheck=false);
};
