import { config } from './config'
import { mail } from './mail'
import * as sensecap from './sensecap'

export const main = async () => {
  for (const device of config.devices) {
    const resp = await sensecap.get(device)
    // console.log(device, resp)
    config.alerts.filter(e => e.device === device).forEach(async (alert) => {
      if (alert.condition.value) {
        if (resp[alert.condition.field] == alert.condition.value) {
          const message = `${alert.condition.field} is ${alert.condition.value}.`
          return
          await mail(alert.recipient, 'alert triggered SenseCAP', message)
        }
      } else if (alert.condition.valueNot) {
        if (resp[alert.condition.field] != alert.condition.valueNot) {
          const message = `${alert.condition.field} is not ${alert.condition.valueNot}.`
          return
          await mail(alert.recipient, 'alert triggered SenseCAP', message)
        }
      } else {
        // no condition
      }
    })
  }
}