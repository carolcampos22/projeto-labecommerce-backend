// importar os objetos Request e Response, sempre entre chaves 👇🏽
import express, { Request, Response } from 'express'
//import do CORS 👇🏽
import cors from 'cors'
import { users, products } from "./database"
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
    try {
        res.status(200).send(users)
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("Erro inesperado")
        }

    }
})

app.get('/products', (req: Request, res: Response) => {
    try {
        const name = req.query.name

        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("Nome deve ser uma string")
            }

            if (name.length < 1) {
                throw new Error("O termo de busca deve ter ao menos 1 caracter")
            }
            const result = products.filter((product) => {
                return product.name.toLowerCase().includes(name.toLowerCase())

            })
            res.status(200).send(result)
        } 

        res.status(200).send(products)

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("Erro inesperado")
        }

    }
})

// app.get('/products/search', (req: Request, res: Response) => {
//     try {
//         const q = req.query.q as string

//         const result = products.filter((product) => {
//             return product.name.toLowerCase().includes(q.toLowerCase())
//         })
//         res.status(200).send(result)
//     } catch (error) {
//         throw new Error("Erro!")
//     }
// })

app.post('/products', (req: Request, res: Response) => {
    try {
        const { id, name, price, description, imageUrl } = req.body as TProducts
        const newProduct = {
            id,
            name,
            price,
            description,
            imageUrl
        }

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

        if (!imageUrl) {
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


        const checkId = products.find((product) => product.id === id)


        if (checkId) {
            res.status(400)
            throw new Error("ID já existe")
        }

        products.push(newProduct)
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

app.post('/users', (req: Request, res: Response) => {
    try {
        const { id, name, email, password, createdAt } = req.body as TUsers

        const newUser = {
            id,
            name,
            email,
            password,
            createdAt: new Date().toISOString()
        }

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

        users.push(newUser)
        res.status(200).send('Usuário cadastrado com sucesso!')



    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error")
        }
    }
})

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

app.delete("/products/:id", (req: Request, res: Response) => {
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


app.put("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newDescription = req.body.description as string | undefined
        const newImageUrl = req.body.imageUrl as string | undefined

        if (typeof newId === "string" && newId.length > 0) {
            if (newId[0] !== 'p') {
                res.status(400)
                throw new Error("ID de novo produto deve começar com a letra 'p'")
            }
        } else {
            res.status(400)
            throw new Error("ID deve ser uma string não-vazia")
        }

        if (newPrice && isNaN(Number(newPrice))) {
            res.status(400)
            throw new Error("Por favor, forneça um valor numérico")
        }

        if(typeof newName !== "string"){
            res.status(400)
            throw new Error("Novo nome deve ser uma string")
        }

        const indexProduct = products.findIndex((product) => {
            return product.id === id
        })
        if (indexProduct < 0) {
            res.status(400)
            throw new Error("ID não encontrado")
        }


        const product = products.find((product) => {
            return product.id === id
        })

        if (product) {
            product.id = newId || product.id
            product.name = newName || product.name
            product.price = newPrice || product.price
            product.description = newDescription || product.description
            product.imageUrl = newImageUrl || product.imageUrl
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
