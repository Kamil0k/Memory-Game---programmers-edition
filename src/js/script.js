//START MODAL

const modalShadow = document.querySelector('.modal-shadow')
const startModal = document.querySelector('.start-modal')
const startModalIcon = document.querySelector('.start-modal__icon')
const startModalDescribe = document.querySelector('.start-modal__describe')
const startModalSlider = document.querySelector('.start-modal__slider')
const startModalBtn = document.querySelector('.start-modal__btn')

//MAIN GAME

const game = document.querySelector('.game')
const board = document.querySelector('.game__board')
const timeView = document.querySelector('.game__nav-box-time')

//END MODAL

const modalShadowEnd = document.querySelector('.modal-shadow--end')
const endModal = document.querySelector('.end-modal')
const endTime = document.querySelector('.end-modal__time')
const playAgainBtn = document.querySelector('.end-modal__btn')

let gameLevel = 0
let cardId = -50
let numberOfCards = [16, 20, 24, 36]
let randomNumbers

let round = true
let firstCardId, secondCardId
let firstCard, secondCard
let firstFrontCard, secondFrontCard
let firstBackCard, secondBackCard

let cardInterval, gameInterval
let cardTime = 0,
	gameTime = 0
let goals = 0
let minutes = 0,
	seconds = 0

let icons = [
	'null',
	'<i class="ti ti-brand-html5"></i>',
	'<i class="ti ti-brand-css3"></i>',
	'<i class="ti ti-brand-javascript"></i>',
	'<i class="ti ti-brand-sass"></i>',
	'<i class="ti ti-brand-tailwind"></i>',
	'<i class="ti ti-brand-mysql"></i>',
	'<i class="ti ti-brand-bootstrap"></i>',
	'<i class="ti ti-brand-wordpress"></i>',
	'<i class="ti ti-brand-react"></i>',
	'<i class="ti ti-brand-angular"></i>',
	'<i class="ti ti-brand-vue"></i>',
	'<i class="ti ti-brand-nextjs"></i>',
	'<i class="ti ti-brand-typescript"></i>',
	'<i class="ti ti-brand-php"></i>',
	'<i class="ti ti-brand-laravel"></i>',
	'<i class="ti ti-brand-symfony"></i>',
	'<i class="ti ti-brand-vscode"></i>',
	'<i class="ti ti-brand-github"></i>',
]
let titles = [
	'null',
	'html',
	'css',
	'javascript',
	'sass',
	'tailwind',
	'mysql',
	'bootstrap',
	'wordpress',
	'react',
	'angular',
	'vue.js',
	'next.js',
	'typescript',
	'php',
	'laravel',
	'symfony',
	'vs code',
	'github',
]
let colors = [
	'#ffffff',
	'#dd4b25',
	'#0096dc',
	'#f7d238',
	'#c66394',
	'#07b0ce',
	'#005e86',
	'#6f11ef',
	'#30353a',
	'#00d5f7',
	'#d93035',
	'#3fb27f',
	'#000000',
	'#2f74c0',
	'#4d588e',
	'#e8392c',
	'#000000',
	'#42a6ed',
	'#212121',
]

const updateGUI = () => {
	if (gameLevel == 0) {
		startModalIcon.innerText = '♟'
		startModalDescribe.innerHTML = 'Game level: junior<br>16 cards'
	} else if (gameLevel == 1) {
		startModalIcon.innerText = '♜'
		startModalDescribe.innerHTML = 'Game level: mid<br>20 cards'
	} else if (gameLevel == 2) {
		startModalIcon.innerText = '♞'
		startModalDescribe.innerHTML = 'Game level: senior<br>24 cards'
	} else {
		startModalIcon.innerText = '♛'
		startModalDescribe.innerHTML = 'Game level: master<br>36 cards'
	}
}

const closeModal = () => {
	startModal.classList.add('hide-start-modal')
	modalShadow.classList.add('hide-shadow')
	startModal.addEventListener('animationend', () => {
		modalShadow.style.zIndex = '-100'
	})
	createCards()
}

const createCards = () => {
	fixGrid()
	randomCards()
	for (let i = 0; i < numberOfCards[gameLevel]; i++) {
		const newCard = document.createElement('div')
		newCard.classList.add('game__board-card')
		newCard.setAttribute('id', randomNumbers[i])
		newCard.innerHTML = `<div class="game__board-card" onclick="showCard(${randomNumbers[i]})">
                <div class="game__board-card--front">
                    <i class="ti ti-code icon"></i>
                </div>
                <div class="game__board-card--back">
                    ${icons[Math.abs(randomNumbers[i])]}
                    <p>${titles[Math.abs(randomNumbers[i])]}</p>
                </div>
            </div>`
		newCard.style.color = colors[Math.abs(randomNumbers[i])]
		board.appendChild(newCard)
	}
	startTime()
}

const startTime = () => {
	gameInterval = setInterval(() => {
		timeView.innerText = generateTime()
	}, 1000)
}

const generateTime = () => {
	let time
	if (seconds < 9) {
		seconds++
		time = `${minutes}:0${seconds}`
	} else if (seconds >= 9 && seconds < 59) {
		seconds++
		time = `${minutes}:${seconds}`
	} else {
		minutes++
		seconds = 0
		time = `${minutes}:00`
	}

	return time
}

const showCard = id => {
	if (round) {
		firstCardId = id
		firstCard = document.getElementById(id)
		firstFrontCard = firstCard.childNodes[0].childNodes[1]
		firstBackCard = firstCard.childNodes[0].childNodes[3]
		firstCard.classList.remove('hide-card')
		firstFrontCard.classList.remove('hide-front')
		firstBackCard.classList.remove('show-back')
		firstCard.classList.add('show-card')
		firstFrontCard.classList.add('show-front')
		firstBackCard.classList.add('hide-back')
		firstCard.style.pointerEvents = 'none'
	} else {
		secondCardId = id
		secondCard = document.getElementById(id)
		secondFrontCard = secondCard.childNodes[0].childNodes[1]
		secondBackCard = secondCard.childNodes[0].childNodes[3]
		secondCard.classList.remove('hide-card')
		secondFrontCard.classList.remove('hide-front')
		secondBackCard.classList.remove('show-back')
		secondCard.classList.add('show-card')
		secondFrontCard.classList.add('show-front')
		secondBackCard.classList.add('hide-back')
		checkCards()
	}
	round = !round
}

const checkCards = () => {
	cardInterval = setInterval(() => {
		if (cardTime === 0) {
			firstCard.classList.remove('show-card')
			firstFrontCard.classList.remove('show-front')
			firstBackCard.classList.remove('hide-back')
			secondCard.classList.remove('show-card')
			secondFrontCard.classList.remove('show-front')
			secondBackCard.classList.remove('hide-back')
		} else if (cardTime === 1) {
			if (Math.abs(firstCardId) === Math.abs(secondCardId)) {
				firstCard.classList.add('delete-card')
				secondCard.classList.add('delete-card')
				goals++
			} else {
				firstCard.classList.add('hide-card')
				firstFrontCard.classList.add('hide-front')
				firstBackCard.classList.add('show-back')
				secondCard.classList.add('hide-card')
				secondFrontCard.classList.add('hide-front')
				secondBackCard.classList.add('show-back')
				firstCard.style.pointerEvents = 'auto'
			}
			firstCardId = 100
			secondCardId = -200
		} else if (cardTime === 2) {
			firstCard.classList.remove('hide-card')
			firstFrontCard.classList.remove('hide-front')
			firstBackCard.classList.remove('show-back')
			secondCard.classList.remove('hide-card')
			secondFrontCard.classList.remove('hide-front')
			secondBackCard.classList.remove('show-back')
			firstCard.classList.remove('show-card')
			firstFrontCard.classList.remove('show-front')
			firstBackCard.classList.remove('hide-back')
			secondCard.classList.remove('show-card')
			secondFrontCard.classList.remove('show-front')
			secondBackCard.classList.remove('hide-back')
		} else if (cardTime === 3) {
			clearInterval(cardInterval)
			cardTime = 0
			if (goals === numberOfCards[gameLevel] / 2) {
				clearInterval(gameInterval)
				endTime.innerText = 'Playing time: ' + timeView.textContent
				modalShadowEnd.style.display = 'block'
				window.scrollTo(0, 0)
				endModal.classList.add('show-start-modal')
				document.body.style.overflow = 'hidden'
			}
		}
		cardTime++
	}, 300)
}

const fixGrid = () => {
	if (gameLevel == 0) {
		board.style.gridTemplateRows = 'repeat (4, 1fr)'
		board.style.gridTemplateColumns = 'repeat (4, 1fr)'
	} else if (gameLevel == 1) {
		board.style.gridTemplateRows = 'repeat (5, 1fr)'
		board.style.gridTemplateColumns = 'repeat (4, 1fr)'
	} else if (gameLevel == 2) {
		board.style.gridTemplateRows = 'repeat (6, 1fr)'
		board.style.gridTemplateColumns = 'repeat (4, 1fr)'
	} else {
		board.style.gridTemplateRows = 'repeat (6, 1fr)'
		board.style.gridTemplateColumns = 'repeat (6, 1fr)'
	}
}

const randomCards = () => {
	randomNumbers = new Array(numberOfCards[gameLevel])
	let plusArray = new Array(numberOfCards[gameLevel] / 2 + 1)
	let minusArray = new Array(numberOfCards[gameLevel] / 2 + 1)
	let index = 0
	plusArray[0] = true
	minusArray[0] = true
	for (let i = 0; i < plusArray.length; i++) {
		plusArray[i] = false
		minusArray[i] = false
	}
	for (;;) {
		let tab = Math.floor(Math.random() * 2 + 1)
		let r = Math.floor(Math.random() * (numberOfCards[gameLevel] / 2) + 1)
		if (tab % 2 == 0) {
			if (plusArray[r] === false) {
				plusArray[r] = true
				randomNumbers[index] = r
				index++
			}
		} else {
			if (minusArray[r] === false) {
				minusArray[r] = true
				randomNumbers[index] = -r
				index++
			}
		}
		if (index == numberOfCards[gameLevel]) {
			break
		}
	}
}

startModalSlider.addEventListener('change', () => {
	gameLevel = startModalSlider.value
	updateGUI()
})
startModalBtn.addEventListener('click', closeModal)
playAgainBtn.addEventListener('click', () => {
	location.reload()
})
