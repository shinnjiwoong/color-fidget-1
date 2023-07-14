const colorBlocks = document.querySelectorAll('.color-section');
const spinBtn = document.getElementById('spin-btn')

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

async function generateColor(){
    const r = Math.floor(Math.random()*255)
    const g = Math.floor(Math.random()*255)
    const b = Math.floor(Math.random()*255)

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

    
    return [code, bg_r, bg_g, bg_b]
}

async function wait(){
    setTimeout(()=>{
        return true
    }, 500)
}

async function spin(){
    console.log('spin!')

    for(let i = 0; i < 20; i++){
        setTimeout(()=>{
            colorBlocks.forEach(async (e, index) => {
                let colorCode = await generateColor();
        
                e.style.backgroundColor = colorCode[0]
            })
        }, 100*i)
    }
}

const cursor = document.getElementById('cursor')


window.addEventListener('mousemove', (e)=>{
    let mouseX = e.clientX
    let mouseY = e.clientY

    cursor.style.top = mouseY + 'px'
    cursor.style.left = mouseX + 'px'

})

spinBtn.addEventListener('click', ()=>{
    requestOrientationPermission();
    introSection.style.opacity = '0%'
    setTimeout(()=>{
        introSection.style.display = 'none'
    },500);
})

// function requestOrientationPermission(){
//     DeviceMotionEvent.requestPermission()
//     .then(response => {
//         if (response == 'granted') {
//             //실행하고자 하는 코드 삽입.
//             spin();
//         }
//     })
//     .catch(console.error)
// }

function requestOrientationPermission(){
    DeviceMotionEvent.requestPermission()
    .then(response => {
        if (response == 'granted') {
            window.addEventListener('devicemotion', (e) => {
                if(e.acceleration.x > 10){
                    spin()
                }
                
            })
        }
    })
    .catch(console.error)
}
