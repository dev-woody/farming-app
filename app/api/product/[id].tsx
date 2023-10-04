import type { NextApiRequest, NextApiResponse } from "next";
const db = require('@/app/common/config/db/db')

export default function product(req : NextApiRequest, res: NextApiResponse) {
    console.log(req.query)
    switch (req.method) {
        case "GET":
            db.query(`SELECT * FROM product WHERE prodnum = ${req.query.id} LIMIT 1`, function (err: any, result: any) {
                if(err) {
                    console.log(err)
                } else {
                    console.log(result);
                    res.json(result[0])
                }
            })
    }
    
}