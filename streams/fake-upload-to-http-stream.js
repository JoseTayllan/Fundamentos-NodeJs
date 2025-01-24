import { Readable } from 'node:stream';
import fetch from 'node-fetch';

class OneToHundredStream extends Readable {
  constructor() {
    super();
    this.index = 1;
  }

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 5) {
        this.push(null); // Finaliza a stream
      } else {
        this.push(`${i}\n`); // Adiciona o número com quebra de linha
      }
    }, 1000);
  }
}

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(), // Envia a stream personalizada
  headers: { 'Content-Type': 'text/plain' }, // Informa o tipo de conteúdo
  duplex: 'half', // Necessário para streams no fetch
})
  .then((response) => response.text())
  .then((data) => {
    console.log('Response from server:', data); // Loga a resposta do servidor
  })
  .catch((error) => {
    console.error('Error:', error);
  });
