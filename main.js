const startBtn = document.querySelector('.play')
const pauseBtn = document.querySelector('.pause')
const stopBtn = document.querySelector('.stop')
const resetBtn = document.querySelector('.reset')
const archiveBtn = document.querySelector('.archive')
const closeModalBtn = document.querySelector('.modal__btn--close')

const stopWatch = document.querySelector('.watch__time')
const lastTime = document.querySelector('.watch__time--last')
const info = document.querySelector('.watch__info')
const modalShadow = document.querySelector('.modal--shadow')
const timeList = document.querySelector('.time-list')
const colorsBox = document.querySelector('.watch__themes')

let countTime
let seconds = 0
let minutes = 0

let flag = true
let timeArr = []

const palette = document.querySelector('.watch__color')
const colorPanel = document.querySelector('.watch__themes')
const defaultColor = document.querySelector('.watch__theme--default')
const oneColor = document.querySelector('.watch__theme--one')
const twoColor = document.querySelector('.watch__theme--two')
const threeColor = document.querySelector('.watch__theme--three')
const fourColor = document.querySelector('.watch__theme--four')
const allColors = colorPanel.querySelectorAll('.watch__theme')
let root = document.documentElement


const handleStart = () => {
	if (flag) {
		countTime = setInterval(() => {
			if (seconds < 9) {
				seconds++
				stopWatch.textContent = `${minutes}:0${seconds}`
			} else if (seconds >= 9 && seconds < 59) {
				seconds++
				stopWatch.textContent = `${minutes}:${seconds}`
			} else {
				minutes++
				seconds = 0
				stopWatch.textContent = `${minutes}:0${seconds}`
			}
		}, 1000)
	}
	flag = false
}

const handleStop = () => {
	lastTime.textContent = `Last time: ${stopWatch.textContent}`

	if (stopWatch.textContent !== '0:00') {
		lastTime.style.visibility = 'visible'
		timeArr.push(stopWatch.textContent)
	}

	clearData()
	flag = true
}

const resetAll = () => {
	clearData()
	timeArr = []
	lastTime.style.visibility = 'hidden'
}

const clearData = () => {
	clearInterval(countTime)
	stopWatch.textContent = '00:00'
	timeList.textContent = ''
	seconds = 0
	minutes = 0
}

const showInfo = () => {
	if (!(modalShadow.style.display === 'block')) {
		modalShadow.style.display = 'block'
	} else {
		modalShadow.style.display = 'none'
	}
	modalShadow.classList.toggle('modal--animation')
}

const handleArchive = () => {
	timeList.textContent = ''

	let num = 1
	timeArr.forEach((time) => {
		const newTime = document.createElement('li')
		newTime.innerHTML = `Result ${num}. <span class="time-list-result">${time}</span>`
		num++
		timeList.appendChild(newTime)
	})
}


startBtn.addEventListener('click', handleStart)
pauseBtn.addEventListener(
	'click',
	() => clearInterval(countTime)(flag = true)
)
stopBtn.addEventListener('click', handleStop)
resetBtn.addEventListener('click', resetAll)
archiveBtn.addEventListener('click', handleArchive)

info.addEventListener('click', showInfo)
closeModalBtn.addEventListener('click', showInfo)
window.addEventListener('click', (e) =>
	e.target === modalShadow ? showInfo() : false
)


palette.addEventListener('click', () => colorPanel.classList.toggle('watch__themes--slide'))
allColors.forEach(color => color.addEventListener('click', () => colorPanel.classList.remove('watch__themes--slide')))
defaultColor.addEventListener('click', () => {
	root.style.setProperty('--dark','#22223b' )
	root.style.setProperty('--middle', '#4a4e69' )
	root.style.setProperty('--light', '#9a8c98')
})
oneColor.addEventListener('click', () => {
	root.style.setProperty('--dark','#0d1b2a' )
	root.style.setProperty('--middle', '#415a77' )
	root.style.setProperty('--light', '#778da9')
})
twoColor.addEventListener('click', () => {
	root.style.setProperty('--dark','#216869' )
	root.style.setProperty('--middle', '#dde7c7' )
	root.style.setProperty('--light', '#edeec9')
})
threeColor.addEventListener('click', () => {
	root.style.setProperty('--dark','#5e0b15' )
	root.style.setProperty('--middle', '#8c7a6b' )
	root.style.setProperty('--light', '#d9cab3')
})
fourColor.addEventListener('click', () => {
	root.style.setProperty('--dark','#595959' )
	root.style.setProperty('--middle', '#a5a5a5' )
	root.style.setProperty('--light', '#f2f2f2')
})