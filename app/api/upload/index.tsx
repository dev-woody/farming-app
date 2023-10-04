import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import path from "path";
import fs from "fs";
import dayjs from "dayjs";

const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

try {
  fs.readFileSync("uploads");
} catch (err) {
  console.error("upload 폴더가 없습니다. 폴더를 생성합니다.");
  fs.mkdirSync("upload");
}

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "@/public/uploads");
    },
    filename: function (req, file, cb) {
      const nowDate = dayjs(Date.now()).format("YYMMDDHHMM");
      cb(null, `${nowDate}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 1024 * 1024,
  },
});

export default function product() {
  upload.single("file");
}
