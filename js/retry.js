
const retry = async (fn, maxAttempts) => {
  const execute = async (attempt) => {
    try {
        return await fn()
    } catch (err) {
        if (attempt <= maxAttempts) {
            const nextAttempt = attempt + 1
            const delayInSeconds = Math.max(Math.min(Math.pow(2, nextAttempt)
              + randInt(-nextAttempt, nextAttempt), 600), 1)
            console.error(`Retrying after ${delayInSeconds} seconds due to:`, err)
            return delay(() => execute(nextAttempt), delayInSeconds * 1000)
        } else {
            throw err
        }
    }
  }
  return execute(1)
}

const delay = (fn, ms) => new Promise((resolve) => setTimeout(() => resolve(fn()), ms))

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
    
