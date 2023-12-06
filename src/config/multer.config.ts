import { diskStorage } from "multer";

const desc = `${process.cwd()}/src/assets/excels`
export const multerConfig = {
  desc,
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(undefined, desc)
    },
    filename: (req, file, cb) => {
      cb(undefined, Date.now() + '-' + file.originalname)
    }
  })
}