const config = require('./config')
import * as sensecap from './sensecap'

const main = async () => {
  for (const device of config.devices) {
    const resp = await sensecap.get(device)
    console.log(device, resp)
  }
}

main()