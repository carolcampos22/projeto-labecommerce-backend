import { knex } from "knex"

export const db = knex({
    client: "sqlite3",
    connection: {
        filename: "./src/database/labecommerce.db", //localização do seu arquivo .db
    },
    useNullAsDefault: true, // definirá NULL quando encontrar valores undefined
    pool: {
        min: 0, // número de conexões, esses valores são os recomendados para sqlite3
        max: 1,
				afterCreate: (conn: any, cb: any) => {
            conn.run("PRAGMA foreign_keys = ON", cb)
        } // configurando para o knex forçar o check das constrainst FK
    }
})