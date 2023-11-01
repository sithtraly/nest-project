import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  hash(plaintext: String) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(plaintext.toString(), salt)
    return hash
  }

  compare(plaintext: String, hash: String) {
    const isTrue = bcrypt.compareSync(plaintext.toString(), hash.toString())
    return isTrue
  }
}
