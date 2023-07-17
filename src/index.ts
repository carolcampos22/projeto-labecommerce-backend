// importar os objetos Request e Response, sempre entre chaves 👇🏽
import express, { Request, Response } from 'express'
//import do CORS 👇🏽
import cors from 'cors'
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
        const result = await db.select("*").from("users")
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
}) //ok

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

        const checkId = await db.select("*").from("products").where({ id: id })

        if (checkId.length > 0) {
            res.status(400);
            throw new Error("ID já existe");
        }


        await db.insert({
            id,
            name,
            price,
            description,
            image_url
        }).into("products")


        res.status(201).send('Produto cadastrado com sucesso!')

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error")
        }
    }
}
) //ok

app.post('/users', async (req: Request, res: Response) => {
    try {

        const id = req.body.id
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password

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

        const checkId = await db.select("*").from("users").where({ id: id })
        const checkEmail = await db.select("*").from("users").where({ email: email })

        if (checkId.length > 0) {
            res.status(400);
            throw new Error("ID já existe");
        }

        if (checkEmail.length > 0) {
            res.status(400)
            throw new Error("E-mail já existe")
        }

        await db.insert({
            id,
            name,
            email,
            password
        }).into("users")

        res.status(200).send('Usuário cadastrado com sucesso!')



    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error")
        }
    }
}) //ok


app.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        const [user] = await db("users").where({ id: idToDelete })

        if (!user) {
            res.status(404)
            throw new Error("ID de usuário não encontrado")
        }

        await db("users").del().where({ id: idToDelete })

        res.status(200).send("Usuário apagado com sucesso")

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error")
        }
    }
}) //ok

app.delete("/products/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        const [product] = await db("products").where({ id: idToDelete })

        if (!product) {
            res.status(404)
            throw new Error("ID do produto não encontrado")
        }

        await db("products").del().where({ id: idToDelete })

        res.status(200).send("Produto apagado com sucesso")
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error")
        }
    }
}) //ok


app.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newId = req.body.id
        const newName = req.body.name
        const newPrice = req.body.price
        const newDescription = req.body.description
        const newImageUrl = req.body.image_url

        if (newId !== undefined) {
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

        if (newPrice !== undefined) {
            if (newPrice && isNaN(Number(newPrice))) {
                res.status(400)
                throw new Error("Por favor, forneça um valor numérico")
            }
        }

        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("Novo nome deve ser uma string")
            }
        }

        const [product] = await db("products").where({ id: id })

        if (product) {
            const updateProduct = {
                id: newId || product.id,
                name: newName || product.name,
                price: isNaN(newPrice) ? product.price : newPrice,
                description: newDescription || product.description,
                image_url: newImageUrl || product.image_url
            }
            await db("products").update(updateProduct).where({ id: id })
        } else {
            res.status(404)
            throw new Error("ID não encontrado")
        }

        res.status(200).send("Produto atualizado com sucesso")

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error")
        }
    }
}) //ok

app.post('/purchases', async (req: Request, res: Response) => {
    try {

        const { id, buyer, total_price, products } = req.body

        if (id == undefined || typeof id != "string" || id.length < 1) {
            res.status(400)
            throw new Error("ID é obrigatorio e deve ser uma string com no mínimo 1 caracter")
        }
        if (buyer == undefined || typeof buyer != "string" || buyer.length < 1) {
            res.status(400)
            throw new Error("(buyer) é obrigatorio e deve ser uma string\n" +
                "com no mínimo 1 caracter")
        }
        if (total_price == undefined || typeof total_price != "number" || total_price <= 0) {
            res.status(400)
            throw new Error("(total_price) é obrigatorio e deve ser maior do que zero")
        }
        if (products == undefined || products.length < 1) {
            res.status(400)
            throw new Error("lista de produtos é obritória")
        }

        let invalidProductType: boolean = false
        let invalidQuantity: boolean = false
        let productNotFound: boolean = false

        for (let product of products) {
            if (product.id == undefined || typeof product.id != "string") {
                invalidProductType = true
                break
            } else {
                if (product.quantity == undefined || typeof product.quantity != "number" || product.quantity <= 0) {
                    invalidQuantity = true
                    break
                }
            }
        }

        if (invalidProductType) {
            res.status(400)
            throw new Error("ID do produto é obrigatorio e deve ser uma string com no mínimo 1 caracter")
        }

        if (invalidQuantity) {
            res.status(400)
            throw new Error("Quantidade é obrigatoria e deve ser maior que zero")
        }

        let [result] = await db("users").where({ id: buyer })
        if (!result) {
            res.status(400)
            throw new Error("'buyer' não encontrado")
        }

        [result] = await db("purchases").where({ id: id })
        if (result) {
            res.status(400)
            throw new Error(`'purchase id' já cadastrado`)
        }
        for (let product of products) {
            const [result] = await db("products").where({ id: product.id })
            if (!result) {
                productNotFound = true
                break
            }
        }

        if (productNotFound) {
            res.status(400)
            throw new Error("'id product' não encontrado")
        }

        const newPurchase = {
            id,
            buyer,
            total_price
        }


        await db("purchases").insert(newPurchase)



        for (let product of products) {
            const newProduct = {
                product_id: product.id,
                purchase_id: id,
                quantity: product.quantity
            }

            await db("purchases_products").insert(newProduct)
        }
        res.status(201).send("Pedido realizado com sucesso")

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error")
        }
    }
})

app.get('/purchases/:id', async (req: Request, res: Response) => {

    const idPurchase = req.params.id

    if (!idPurchase) {
        res.status(400)
        throw new Error("É necessário informar o ID do produto")
    }

    const [resultPurchase] = await
        db.select("purchase.id AS purchaseId", "purchase.buyer AS buyerId",
            "user.name AS buyerName", "user.email AS buyerEmail",
            "purchase.total_price AS totalPrice", "purchase.created_at AS createdAt")
            .from("purchases as purchase")
            .innerJoin("users as user", "purchase.buyer", "=", "user.id")
            .where("purchase.id", "=", idPurchase)

    if (resultPurchase === undefined) {
        res.status(400).send("ID not found")
        throw new Error("ID da compra não encontrada") 

    }

    const productsResultPurchase = await
        db.select("product.id", "product.name", "product.price",
            "product.description", "product.image_url AS imageUrl", "pp.quantity")
            .from("purchases_products as pp")
            .innerJoin("products as product", "pp.product_id", "product.id")
            .where("pp.purchase_id", "=", idPurchase)


    const result = {
        ...resultPurchase,
        products: productsResultPurchase
    }

    console.table(result)
    res.status(200).send(result)

}) //ok

app.delete('/purchases/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        const [purchase] = await db("purchases").where({ id: idToDelete })

        if (purchase === undefined) {
            res.status(404).send("Purchase ID not found")
            throw new Error("ID da compra não encontrada")
        }

        await db("purchases").del().where({ id: idToDelete })

        res.status(200).send("Compra deletada com sucesso")
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error")
        }
    }
}) //ok


//documentacao: https://documenter.getpostman.com/view/26570634/2s93z6e4CJ
