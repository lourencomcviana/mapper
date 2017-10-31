
//duvidas no uso de algo mais avançado: http://expressjs.com/pt-br/api.html
var express = require('express'),
app = express(),
//mude a porta cas necessário!
port = Number(process.env.PORT || 8080); 

//permite dar parse em json
var bodyParser = require('body-parser');
// To parse JSON: 
app.use(bodyParser.json()); 
// To parse form data:
app.use(bodyParser.urlencoded({
extended: true
}));

/* ================ ADICIONE DIRETORIOS ESTATICOS AQUI =====================*/
app.use(express.static('page'));

/* ==================== ADICIONE CHAMDAS REST AQUI =========================*/
//localhost:8080
app.get('/', function(req, res) {
res.json({mensagem:'funcionando'});
//query string utilizada
console.log(req.query);
});

//localhost:8080/123
app.get('/:id', function(req, res) {
res.json(req.params.id);
//query string utilizada (olhe o console que o servidor iniciou para ver a mensagem)
console.log(req.query);
});

//fazendo post em um shell (você pode usar postman também)
//curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "teste=valor" "http://localhost:8080/"
app.post('/', function(req, res) {
res.json(req.body);
console.log(req.body);
});

/* =========================INICIAR SERVIDOR================================*/
var listener = app.listen(port, function() {
 console.log('Listening on port ' + port);
});

/* ==============tratamento de desligamento forcado do servidor ==============*/
/* handle SIGTERM and SIGINT (ctrl-c) nicely */
process.once('SIGTERM', end);
process.once('SIGINT', end);

var lastSocketKey = 0;
var socketMap = {};
listener.on('connection', function(socket) {
    /* generate a new, unique socket-key */
    var socketKey = ++lastSocketKey;
    /* add socket when it is connected */
    socketMap[socketKey] = socket;
    socket.on('close', function() {
        /* remove socket when it is closed */
        delete socketMap[socketKey];
    });
});

function end() {
  
    /* loop through all sockets and destroy them */
    Object.keys(socketMap).forEach(function(socketKey){
        socketMap[socketKey].destroy();
    });

    /* after all the sockets are destroyed, we may close the server! */
    listener.close(function(err){
        if(err) throw err();

        console.log('Server stopped');
        /* exit gracefully */
        process.exit(0);
    });
}
