import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1; // Multiplica o número por -1
    console.log(transformed); // Loga o número transformado no console
    callback(null, Buffer.from(String(transformed))); // Retorna o número transformado
  }
}

// req = Readable (corpo da requisição é uma stream)
// res = Writable (resposta é uma stream)

const server = http.createServer(async(req, res) => {
  const buffers = []

  for await (const chunk of req){
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent)

  return res.end(fullStreamContent)
 // return req
  //  .pipe(new InverseNumberStream()) // Aplica a transformação nos dados recebidos
   // .pipe(res); // Envia a resposta transformada de volta ao cliente
});

server.listen(3334, () => {
  console.log('Server is listening on http://localhost:3334');
});
