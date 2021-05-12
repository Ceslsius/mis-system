const express = require('express'),
      app = express(),
      path = require('path'),
      route = require('./routes/index');

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({extended: false}));

app.listen(21000, () => {
    console.log('service started on port:', 21000);
});

route(app);