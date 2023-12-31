import renderEyes from './eyes.js';
import colorsData from '../colors.js' 

const colorBlocks = document.querySelectorAll('.color-section');

const startBtn = document.getElementById('start-btn')

const colorCodeText = document.getElementById('color-code');
const footer = document.getElementById('footer-wrapper');
const optionBtn = document.getElementById('option-btn')
const colorThemeBtn = document.querySelectorAll('.color-theme-btn')
const introPage = document.getElementById('desktop-msg')
const coloredText = document.querySelectorAll('.colored-text')
const desktopHideText = document.getElementById('desktop-hide-msg')
const gridContainer = document.getElementById('grid-container')

let colors = Array(16).fill('#ffffff')
let colorOption = 'RANDOM'
let vh = (window.innerHeight) * 0.01;

document.documentElement.style.setProperty('--vh', `${vh}px`);

// Event-Listeners

window.onload = async () => {
    for(let i = 0; i < 16; i++){
        await renderEyes()
    }
    const colorItems = document.querySelectorAll('.color-item');
    const eyeCenters = document.querySelectorAll('.eye-center')
    colorItems.forEach((e, index) => {
        const eyeTop = e.querySelector('.eye-bg-top')
        const eyeBottom = e.querySelector('.eye-bg-bottom')
    
        e.addEventListener('click', ()=>{
            navigator.clipboard.writeText(colors[index])
            
            eyeTop.style.animation = 'blink 0.5s ease-in-out'
            eyeBottom.style.animation = 'blink 0.5s ease-in-out'
    
            eyeTop.addEventListener('animationend', ()=>{
                eyeTop.style.animation = 'none'
            } )
            eyeBottom.addEventListener('animationend', ()=>{
                eyeBottom.style.animation = 'none'
            } )
    
            const eyeballTexts = ['찌르지 마!', '그만 찔러!', '아파!', '그만 해!', '아야!']
            colorCodeText.innerText = eyeballTexts[Math.floor(Math.random()*eyeballTexts.length)]
            colorCodeText.style.animation = 'textBlink 0.5s ease-in-out'
    
            colorCodeText.addEventListener('animationend', ()=>{
                colorCodeText.style.removeProperty('animation')
            })
        })
    })
    window.addEventListener('mousemove', (e)=>{
        const mouseX = e.clientX
        const mouseY = e.clientY
    
        eyeCenters.forEach((e)=>{
            const eyeRect = e.getBoundingClientRect()
            const centerX = eyeRect.left + eyeRect.width/2
            const centerY = eyeRect.top + eyeRect.height/2
            const widthRatio = (mouseX-centerX)*100/window.innerWidth
            const heightRatio = (mouseY-centerY)*100/window.innerHeight
    
            e.style.transform = `translate(${widthRatio}%,${heightRatio}%)`
        })
    })
    setInterval(()=>{
        for(let i = 0; i <= eyeCenters.length - 2; i = i + 2){
            const translateX = Math.random() * 40 - 20
            const translateY = Math.random() * 40 - 20
    
            const randDelay = Math.random() + 0.3
    
            eyeCenters[i].style.transitionDelay = `${randDelay}s`
            eyeCenters[i+1].style.transitionDelay = `${randDelay}s`
        
            eyeCenters[i].style.transform = `translate(${translateX}%, ${translateY}%)`
            eyeCenters[i+1].style.transform = `translate(${translateX}%, ${translateY}%)`
        }
    }, 1000)
}

window.addEventListener('resize', ()=>{
    let vh = (window.innerHeight) * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
})

optionBtn.addEventListener('click', ()=>{
    footer.classList.toggle('footer-show')
})

startBtn.addEventListener('click', async ()=>{
    await requestOrientationPermission();
    introPage.style.opacity = '0'
    setTimeout(function(){
        introPage.style.display = 'none'
    }, 500)
});

colorThemeBtn.forEach((e, index) => {
    const colorThemeText = e.querySelector('.color-theme-text')
    e.addEventListener('click', ()=>{
        colorOption = colorThemeText.innerText
        for(let i = 0; i < colorThemeBtn.length; i++){
            if(i == index){
                colorThemeBtn[i].classList.add('selected')
                colorThemeText.style.textDecoration = 'underline 1px black'
            }else{
                colorThemeBtn[i].classList.remove('selected')
                colorThemeText.style.textDecoration = 'none'
            }
        }
        
        spin();
        console.log(colorOption)
    })
})

setInterval(async ()=>{
    let color = await generateColor()
    coloredText.forEach(async e => {
        let color = await generateColor()

        e.style.color = color[0]
    })
    desktopHideText.style.color = color[0]
}, 1000)


// 색상 및 HEX 코드 생성
async function getHex(element){
    switch(element){
        case 10 : element = 'a'; break;
        case 11 : element = 'b'; break;
        case 12 : element = 'c'; break;
        case 13 : element = 'd'; break;
        case 14 : element = 'e'; break;
        case 15 : element = 'f'; break;
    }

    return element
}

async function generateColor(index){
    let r = 0
    let g = 0
    let b = 0
    let colorIndex
    let randColor

    if(colorOption == 'RANDOM'){
        r = Math.floor(Math.random()*255);
        g = Math.floor(Math.random()*255);
        b = Math.floor(Math.random()*255);

        let r_quotient = await getHex(Math.floor(r / 16));
        let r_remainder = await getHex(r % 16);
        let g_quotient = await getHex(Math.floor(g / 16));
        let g_remainder = await getHex(g % 16);
        let b_quotient = await getHex(Math.floor(b / 16));
        let b_remainder = await getHex(b % 16);

        let code = '#' + r_quotient + r_remainder + g_quotient + g_remainder + b_quotient + b_remainder;

        if(index){
            colors[index] = code;
        }

        return [code];
    }else{
        colorIndex = colorsData.findIndex(obj => obj.index === colorOption);
        randColor = Math.floor(Math.random()*(colorsData[colorIndex].codes.length-1));

        if(index){
            colors[index] = colorsData[colorIndex].codes[randColor];
        }

        return [colorsData[colorIndex].codes[randColor]];
    }
}

async function spin(){
    const colorItems = document.querySelectorAll('.color-item');
    for(let i = 0; i < 100; i++){
        setTimeout(async ()=>{
            colorItems.forEach(async (e, index) => {
                let colorCode = await generateColor(index);
                const eyeTop = e.querySelector('.eye-bg-top')
                const eyeBottom = e.querySelector('.eye-bg-bottom')
                const eyeCenter = e.querySelector('.eye-center')

                
                e.style.border = `solid 3px ${colorCode[0]}`
                eyeBottom.style.border = `solid 3px ${colorCode[0]}`
                eyeTop.style.border = `solid 3px ${colorCode[0]}`
                eyeTop.style.backgroundColor = colorCode[0]
                eyeBottom.style.backgroundColor = colorCode[0]
                eyeCenter.style.backgroundColor = colorCode[0]
            })
        }, 10*i)
    }

    
}

async function requestOrientationPermission(){
    DeviceMotionEvent.requestPermission()
    .then(response => {
        if (response == 'granted') {
            window.addEventListener('devicemotion', (e) => {
                if(e.acceleration.x > 15){
                    spin()
                }
                
            })
        }
    })
    .catch(console.error)
}





