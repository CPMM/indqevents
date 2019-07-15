const express = require('express'),
    path = require('path'),
    app = express();

app.use(express.static(path.join(__dirname, '/dist/indqevents')));

app.get('/*', (req,res)=>{
    res.sendFile(path.join(__dirname,'/dist/indqevents/index.html'));
});

app.listen(process.env.PORT  || 3000, () => {
    console.log('server online');
})