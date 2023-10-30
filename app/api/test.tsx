import type { NextApiRequest, NextApiResponse } from "next";
const db = require("@/app/common/config/db/db");

export default async function test(req: NextApiRequest, res: NextApiResponse) {
  // db.query("SELECT * FROM user", function (err: any, result: any) {
  //     if(err) {
  //         console.log(err)
  //     } else {
  //         console.log(result);
  //         res.json(result)
  //     }
  // })
}

// export default function test(req: NextApiRequest, res: NextApiResponse) {
// res.status(200).json({id: 1, text: "text1"})
// }
