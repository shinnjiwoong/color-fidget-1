const colorBlocks = document.querySelectorAll('.color-section');
const colorItems = document.querySelectorAll('.color-item');
const startBtn = document.getElementById('start-btn')
// const generateBtn = document.getElementById('text')
const eyeCenters = document.querySelectorAll('.eye-center')
const colorCodeText = document.getElementById('color-code');
const footer = document.getElementById('footer-wrapper');
const optionBtn = document.getElementById('option-btn')
const colorThemeBtn = document.querySelectorAll('.color-theme-btn')
const introPage = document.getElementById('desktop-msg')
const coloredText = document.querySelectorAll('.colored-text')


let colors = ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']

let vh = (window.innerHeight) * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

setInterval(()=>{
    coloredText.forEach(async e => {
        let color = await generateColor()

        e.style.color = color[0]
    })
}, 1000)

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

    switch(colorOption){
        case 'RED':
            r = Math.floor(Math.random()*155 + 100)
            g = 0
            b = 0
            break
        case 'ORANGE' :
            r = Math.floor(Math.random()*155 + 100)
            g = Math.floor(Math.random()*155 + 100)
            b = 0
            break
        case 'YELLOW' :
            r = Math.floor(Math.random()*155 + 100)
            g = Math.floor(Math.random()*155 + 100)
            b = 0
            break
        case 'GREEN' :
            r = 0
            g = Math.floor(Math.random()*155 + 100)
            b = 0
            break
        case 'BLUE' :
            r = 0
            g = 0
            b = Math.floor(Math.random()*155 + 100)
            break
        case 'PURPLE' :
            r = Math.floor(Math.random()*155 + 100)
            g = 0
            b = Math.floor(Math.random()*155 + 100)
            break
        case 'RANDOM' :
            r = Math.floor(Math.random()*255)
            g = Math.floor(Math.random()*255)
            b = Math.floor(Math.random()*255)
            break
    }

    const bg_r = 255 - r;
    const bg_g = 255 - g;
    const bg_b = 255 - b;

    let r_quotient = await getHex(Math.floor(r / 16));
    let r_remainder = await getHex(r % 16);
    let g_quotient = await getHex(Math.floor(g / 16));
    let g_remainder = await getHex(g % 16);
    let b_quotient = await getHex(Math.floor(b / 16));
    let b_remainder = await getHex(b % 16);

    let code = '#' + r_quotient + r_remainder + g_quotient + g_remainder + b_quotient + b_remainder;

    if(index){
        colors[index] = code
    }
    
    return [code, bg_r, bg_g, bg_b]
}

async function wait(){
    setTimeout(()=>{
        return true
    }, 500)
}



async function spin(){
    // console.log('spin!')

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

function blink(e, index){
    navigator.clipboard.writeText(colors[index])
    const eyeTop = e.querySelector('.eye-bg-top')
    const eyeBottom = e.querySelector('.eye-bg-bottom')

    eyeTop.style.animation = 'blink 1s ease-in-out'
    eyeBottom.style.animation = 'blink 1s ease-in-out'

    eyeTop.addEventListener('animationend', ()=>{
        eyeTop.style.animation = 'none'
    } )
    eyeBottom.addEventListener('animationend', ()=>{
        eyeBottom.style.removeProperty('animation')
    } )
}

colorItems.forEach((e, index) => {
    e.addEventListener('click', ()=>{
        navigator.clipboard.writeText(colors[index])
        const eyeTop = e.querySelector('.eye-bg-top')
        const eyeBottom = e.querySelector('.eye-bg-bottom')

        eyeTop.style.animation = 'blink 1s ease-in-out'
        eyeBottom.style.animation = 'blink 1s ease-in-out'

        eyeTop.addEventListener('animationend', ()=>{
            eyeTop.style.animation = 'none'
        } )
        eyeBottom.addEventListener('animationend', ()=>{
            eyeBottom.style.removeProperty('animation')
        } )

        // colorCodeText.innerText = colors[index].toUpperCase()
        colorCodeText.innerText = '찌르지마!'
        colorCodeText.style.animation = 'textBlink 3s ease-in-out'

        colorCodeText.addEventListener('animationend', ()=>{
            colorCodeText.style.removeProperty('animation')
        })
    })
})

startBtn.addEventListener('click', async ()=>{
    await requestOrientationPermission();
    introPage.style.opacity = '0'
    setTimeout(function(){
        introPage.style.display = 'none'
    }, 500)
});

// generateBtn.addEventListener('click', ()=>{
//     spin()
// })


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

optionBtn.addEventListener('click', ()=>{
    footer.classList.toggle('footer-show')
})

let colorOption = 'RANDOM'

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



window.addEventListener('resize', ()=>{
    let vh = (window.innerHeight) * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
})