import { main } from './src'

main()

async function check() {
  await main()
}

setInterval(check, 5 * 60 * 1000)