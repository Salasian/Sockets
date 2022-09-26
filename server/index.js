const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8082 });

wss.on('connection', (ws) => {
  console.log('New Client Connected');

  ws.on('message', (data) => {
    const mensaje = String(data);
    let count = 0;
    let ic = 0;
    let persona = {
      nombre: '',
      altura: 0,
      peso: 0,
      imc: 0,
    };
    for (let i = 0; i < mensaje.length; i++) {
      if (mensaje.charAt(i) === ' ') {
        count++;
        let valor = mensaje.substring(ic, i);
        ic = i + 1;
        switch (count) {
          case 1:
            persona.nombre = valor;
            break;
          case 2:
            persona.altura = parseInt(valor);
            break;
          case 3:
            persona.peso = parseInt(valor);
            break;
          default:
            break;
        }
      }
    }

    persona.imc = persona.peso / Math.pow(persona.altura / 100, 2);
    console.log(persona);
    const tabulado = Object.values(persona).join(' ');
    ws.send(tabulado);
  });

  ws.on('close', () => {
    console.log('Clienty has disconnected!');
  });
});
