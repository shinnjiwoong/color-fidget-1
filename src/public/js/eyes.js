const gridContainer = document.getElementById('grid-container')

async function renderEyes(){
    const eyeWrapper = document.createElement('span')
    const eyeBgTop = document.createElement('span')
    const eyeCenter = document.createElement('span')
    const eyeLight = document.createElement('span')
    const eyeBgBottom = document.createElement('span')

    eyeWrapper.classList.add('eye-wrapper', 'color-item')
    eyeBgTop.classList.add('eye-bg-top')
    eyeCenter.classList.add('eye-center')
    eyeLight.classList.add('eye-light')
    eyeBgBottom.classList.add('eye-bg-bottom')

    eyeCenter.appendChild(eyeLight)
    eyeWrapper.append(eyeBgTop, eyeCenter, eyeBgBottom)

    gridContainer.appendChild(eyeWrapper)
}

export default renderEyes