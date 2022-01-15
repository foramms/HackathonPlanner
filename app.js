const express = require('express');
const path = require('path');


const app = express();
const port = 3000;

app.use(express.json());
app.use("/public", express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    console.log("HELOc");
    res.sendFile('./views/index.html', { root: __dirname });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });  