const { MongoClient, ObjectId } = require("mongodb")

const url = `mongodb+srv://${username}:${password}@${host}/${db}`

const mongoProxy = collectionName => {
  const handler = {
    get(obj, method) {
      return async (...args) => {
        const client = await MongoClient.connect(url)
        const collection = client.db().collection(collectionName)

        const returned = collection[method](...args)

        try {
          return returned.toArray()
        } catch {
          return returned
        } finally {
          client.close()
        }
      }
    },
  }

  return new Proxy({}, handler)
}

mongoProxy("item")
  .find({ id: ObjectId('123') })
  .then(console.log)

