const { floor, random } = Math
const abc = 'abcdefghijklmnopqrstuvwxyz'

const makeList = (len, fn) =>
  Array(len)
    .fill()
    .map(() => fn())

const randInt = (min = 0, max = 10) => floor(min + random() * (max - min))

const randDate = () =>
  new Date(Date.now() + randInt(0, 1e11)).toISOString().substr(0, 10)

const randItem = list => list[randInt(0, list.length)]

const randChar = () => randItem(abc)

const randStr = len => makeList(len, randChar).join('')

const randWord = (min = 2, max = 10) => randStr(randInt(min, max))

const randSentence = (len = 10) => makeList(len, randWord).join(' ') + '. '

const randParagraph = (len = 10) => makeList(len, randSentence).join('')
