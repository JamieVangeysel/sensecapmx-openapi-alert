import { config } from './config'
import { mail } from './mail'
import * as sensecap from './sensecap'

export const main = async () => {
  for (const device of config.devices) {
    const resp = await sensecap.get(device)
    console.log(device, resp)
    config.alerts.filter(e => e.device === device).forEach(async (alert) => {
      if (alert.condition.value) {

      } else if (alert.condition.valueNot) {
        if (resp[alert.condition.field] != alert.condition.valueNot) {
          await mail(alert.recipient, 'alert triggered SenseCAP', `${alert.condition.field} is not ${alert.condition.valueNot}.`)
        }
      } else {
        // no condition
      }
    })
  }
}

main()