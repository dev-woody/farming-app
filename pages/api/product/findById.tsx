import type { NextApiRequest, NextApiResponse } from "next";
const db = require('@/app/common/config/db/db')

export default function findAll(req : NextApiRequest, res: NextApiResponse) {
    const data = JSON.parse(req.body)
    db.query(`SELECT * FROM product WHERE prodnum = ${data.id}`, function (err: any, result: any) {
        if(err) {
            console.log(err)
        } else {
            res.json(result[0])
        }
    })
}