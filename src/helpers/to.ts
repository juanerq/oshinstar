import { To } from "../types"

const to: To = (promise) => {
  return promise
    .then((data: Object) => [null, data])
    .catch((error: Error) => [error, null])
}

export default to
