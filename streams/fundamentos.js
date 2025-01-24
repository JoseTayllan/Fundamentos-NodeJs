// Netflix &Spotify

// Importação de clientes via CSV (Exel)
//1gb 
// POST /upload import.csv
//18mb/s -100s

// 100s -> Inserções no BD
// 18mb/s -> 1000 inserções

// Readble Stream
// Writable Stream
// stream ->
//process.stdin
//.pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1
    _read(){
        const i = this.index++
        
        setTimeout(() => {
            if (i > 100) {
                this.push(null)
            } else {
                this.push(String(i))
            }
        }, 1000)

    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1

        callback(null,Buffer.from(String(transformed)))
    }
}

new OneToHundredStream()
.pipe(new InverseNumberStream())
.pipe(new MultiplyByTenStream())