// importar os objetos Request e Response, sempre entre chaves 👇🏽
import express, { Request, Response } from 'express'
//import do CORS 👇🏽
import cors from 'cors'
import { users, products } from "./database"
import { TProducts, TUsers } from './types';
import { db } from './database/knex';

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

app.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`SELECT * FROM users`)
        res.status(200).send(result)
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("Erro inesperado")
        }

    }
})

app.get('/products/search', async (req: Request, res: Response) => {
    try {
        const name = req.query.name

        if (name !== undefined) {
            if (typeof name !== "string" || name.length <= 1) {
                res.status(400)
                throw new Error("Informe um valor válido para a pesquisa, com ao menos 2 caracteres")
            }

            const resultName = await db.raw(`
                SELECT * FROM products WHERE LOWER(name) LIKE LOWER('%${name}%')
            `)
            res.status(200).send(resultName)
        } else {
            const result = await db.raw(`SELECT * FROM products`)
            res.status(200).send(result)
        }



    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("Erro inesperado")
        }

    }
})

app.post('/products', async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const description = req.body.description
        const image_url = req.body.image_url

        //validações
        if (!id) {
            res.status(400)
            throw new Error("Deve ser informada uma ID")
        }

        if (!name) {
            res.status(400)
            throw new Error("Deve ser informado um nome")
        }

        if (!price) {
            res.status(400)
            throw new Error("Deve ser informado o preço do produto")
        }

        if (!description) {
            res.status(400)
            throw new Error("Deve ser informada a descrição do produto")
        }

        if (!image_url) {
            res.status(400)
            throw new Error("Deve ser informada a URL da imagem do produto")
        }

        if (typeof id === "string" && id.length > 0) {
            if (id[0] !== 'p') {
                res.status(400)
                throw new Error("ID de produto deve começar com a letra 'p'")
            }
        } else {
            res.status(400)
            throw new Error("ID deve ser uma string não-vazia")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("Nome deve ser uma string")
        }

        if (price && isNaN(Number(price))) {
            res.status(400)
            throw new Error("Preço deve ser um número")
        }


        const checkId = products.find((product) => product.id === id);

        if (checkId) {
            res.status(400);
            throw new Error("ID já existe");
        }


        await db.raw(`
        INSERT INTO products(id, name, price, description, image_url)
        VALUES('${id}', '${name}', '${price}', '${description}', '${image_url}')
`)


        res.status(201).send('Produto cadastrado com sucesso!')

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error")
        }
    }
}
)

app.post('/users', async (req: Request, res: Response) => {
    try {
        /*const { id, name, email, password, createdAt } = req.body as TUsers

        const newUser = {
            id,
            name,
            email,
            password,
            createdAt: new Date().toISOString()
        }*/

        const id = req.body.id
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password

        //validações


        if (!id) {
            res.status(400)
            throw new Error("Deve ser informada uma ID")
        }

        if (!name) {
            res.status(400)
            throw new Error("Deve ser informado um nome")
        }

        if (!email) {
            res.status(400)
            throw new Error("Deve ser informado um e-mail")
        }

        if (!password) {
            res.status(400)
            throw new Error("Deve ser informado um password")
        }

        if (typeof id === "string" && id.length > 0) {
            if (id[0] !== 'u') {
                res.status(400)
                throw new Error("ID de usuário deve começar com a letra 'u'")
            }
        } else {
            res.status(400)
            throw new Error("ID deve ser uma string não-vazia")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("Nome deve ser uma string")
        }

        if (typeof email === "string") {
            if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
                res.status(400)
                throw new Error("E-mail inválido")
            }
        } else {
            res.status(400)
            throw new Error("E-mail deve ser uma string")
        }

        const checkId = users.find((user) => user.id === id)
        const checkEmail = users.find((user) => user.email === email)

        if (checkId) {
            res.status(400)
            throw new Error("ID já existe")
        }

        if (checkEmail) {
            res.status(400)
            throw new Error("E-mail já existe")
        }

        await db.raw(`
            INSERT INTO users(id, name, email, password)
            VALUES('${id}', '${name}', '${email}', '${password}')
        `)

       // users.push(newUser)
        res.status(200).send('Usuário cadastrado com sucesso!')



    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error")
        }
    }
})

/*app.post('/purchases', async(req:Request, res: Response) => {
    try {
        const id = req.body.id
        const buyer = req.body.buyer
        const total_price = req.body.total_price

        //validações

        if(!id || !products || !buyer){
            res.status(400)
            res.send("Faltam dados")
        }

        
        await db.raw(`
        INSERT INTO purchases(id, buyer, total_price)
        VALUES('${id}', '${buyer}', '${total_price}')
`)

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error")
        }
    }
})*/

app.delete("/users/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const userIndex = users.findIndex((user) => {
            return user.id === id
        })

        const checkId = users.find((user) => user.id === id)
        if (!checkId) {
            res.status(400)
            throw new Error("ID de usuário não existe")
        }

        users.splice(userIndex, 1)
        res.status(200).send("Usuário apagado com sucesso")
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error")
        }
    }
})

app.delete("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id



        const productIndex = products.findIndex((product) => {
            return product.id === id
        })

        const checkId = products.find((product) => product.id === id)
        if (!checkId) {
            res.status(400)
            throw new Error("ID do produto não existe")
        }

        products.splice(productIndex, 1)
        res.status(200).send("Produto apagado com sucesso")
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error")
        }
    }
})


app.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newId = req.body.id 
        const newName = req.body.name 
        const newPrice = req.body.price
        const newDescription = req.body.description 
        const newImageUrl = req.body.image_url 

        if(newId !== undefined){
            if (typeof newId === "string" && newId.length > 0) {
                if (newId[0] !== 'p') {
                    res.status(400)
                    throw new Error("ID de novo produto deve começar com a letra 'p'")
                }
            } else {
                res.status(400)
                throw new Error("ID deve ser uma string não-vazia")
            }
        }

        if(newPrice !== undefined){
            if (newPrice && isNaN(Number(newPrice))) {
                res.status(400)
                throw new Error("Por favor, forneça um valor numérico")
            }
        }

        if(newName !== undefined){
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("Novo nome deve ser uma string")
            }
        }

        // const indexProduct = products.findIndex((product) => {
        //     return product.id === id
        // })
        // if (indexProduct < 0) {
        //     res.status(400)
        //     throw new Error("ID não encontrado")
        // }


        // const product = products.find((product) => {
        //     return product.id === id
        // })

        const [product] = await db.raw(`
            SELECT * FROM products
            WHERE id = '${id}';     
        `)

        if (product) {
            await db.raw(`
                UPDATE products
                SET 
                    id = '${newId || product.id}',
                    name = '${newName || product.name}',
                    price = '${newPrice || product.price}',
                    description = '${newDescription || product.description}',
                    image_url = '${newImageUrl || product.image_url}'
                WHERE
                    id = "${id}";
            `)
            
        } else {
            res.status(404)
            throw new Error ("ID não encontrado")
        }

        res.status(200).send("Produto atualizado com sucesso")

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error")
        }
    }
})


//documentacao: https://documenter.getpostman.com/view/26570634/2s93z6e4CJ
