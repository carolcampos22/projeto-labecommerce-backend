//além de importar o express, também precisamos importar os objetos Request
//e Response, sempre entre chaves 👇🏽
import express, { Request, Response } from 'express'
//import do CORS 👇🏽
import cors from 'cors'
import { users, products} from "./database"
import { TProducts, TUsers } from './types';

const app = express() //criação do servidor express 

//configuração do middleware que garante que nossas respostas estejam sempre no formato json //import do CORS 👇🏽
app.use(express.json()); 

//configuração do middleware que habilita o CORS 👇🏽
app.use(cors());

//colocando nosso servidor para escutar a porta 3003 da nossa máquina (primeiro 
//parâmetro da função listen)
//a função de callback (segundo parâmetro da função listen) serve para sabermos 
//que o servidor está de pé, através do console.log que imprimirá a mensagem no 
//terminal 👇🏽
 
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)
})

app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
})

app.get('/products/search', (req: Request, res: Response) => {
    const q = req.query.q as string

    const result = products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
    })
    res.status(200).send(result)
})

app.post('/products', (req: Request, res: Response) => {
    const {id, name, price, description, imageUrl} = req.body as TProducts
    const newProduct = {
        id,
        name,
        price,
        description,
        imageUrl
    }
    products.push(newProduct)
    res.status(201).send('Produto cadastrado com sucesso!')
    }
)

app.post('/users', (req: Request, res: Response) => {
    const {id, name, email, password, createdAt} = req.body as TUsers

    const newUser = {
        id,
        name,
        email,
        password,
        createdAt
    }

    users.push(newUser)
    res.status(200).send('Usuário cadastrado com sucesso!')
})






