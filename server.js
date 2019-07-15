const express = require('express'),
    path = require('path'),
    app = express();

app.use(express.static(path.join(__dirname, 'dist', 'indqevents')));

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'dist', 'indqevents'));
});

app.listen(3000 || process.env.PORT, () => {
    console.log('server online');
})