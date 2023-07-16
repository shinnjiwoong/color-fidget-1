const express = require('express');
const app = express();

//포트번호 설정

const PORT = 3000;

//정적 파일 접근 및 렌더링 설정

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/src'));
app.set('views', __dirname + '/src/public/views');
app.engine('html', require('ejs').renderFile);  
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.render('index.html')
});

app.get('/shake-color', (req, res) => {
    res.render('index.html')
});


app.listen(PORT, ()=>{
    console.log('Runing the app!')
})