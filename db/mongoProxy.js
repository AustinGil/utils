const { promisify } = require("util")
const { MongoClient, ObjectId } = require("mongodb")

const url = `mongodb+srv://${username}:${password}@${host}/${db}`

const mongoProxy = collectionName => {
  const handler = {
    get: (obj, method) => {
      return async (...args) => {
        const client = await promisify(MongoClient.connect)(url)
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

const Item = mongoProxy("item")
Item.findOne({ _id: new ObjectId("123") }).then(console.log)
