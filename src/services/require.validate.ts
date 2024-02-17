import { BadRequestRespone } from "./badRequest.respone"

export function requireValidate(obj: Object) {
  const arrObj = Object.keys(obj).map(key => {
    const newObj = {}
    newObj[key] = obj[key]
    return newObj
  })
  let isMissing = false
  const missing = []
  for (const item of arrObj) {
    const key = Object.keys(item).at(0)
    if (!item[key]) {
      isMissing = true
      missing.push(key)
    }
  }

  if (isMissing) {
    return new BadRequestRespone({ message: 'missing field', data: { missingField: missing } })
  }
}
