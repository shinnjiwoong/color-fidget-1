function spin(){
    console.log('spin!')
}

const cursor = document.getElementById('cursor')
const colorWheels = document.querySelectorAll('.color-wheel')

colorWheels.forEach(e => {
    e.addEventListener('mouseover', ()=>{
        cursor.innerText = 'CLICK TO COPY'
    })
    e.addEventListener('mouseleave', ()=>{
        cursor.innerText = ''
    })
})

window.addEventListener('mousemove', (e)=>{
    let mouseX = e.clientX
    let mouseY = e.clientY

    cursor.style.top = mouseY + 'px'
    cursor.style.left = mouseX + 'px'

})