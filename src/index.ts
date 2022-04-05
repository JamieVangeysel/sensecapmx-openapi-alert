import { config } from './config'
import { mail } from './mail'
import * as sensecap from './sensecap'

const deep_value = (o, p) => p.split('.').reduce((a, v) => a[v], o)

export const main = async () => {
  for (const device of config.devices) {
    const resp = await sensecap.get(device)
    // console.log(device, resp)
    config.alerts.filter(e => e.device === device).forEach(async (alert) => {
      if (alert.condition.value) {
        if (deep_value(resp, alert.condition.field) == alert.condition.value) {
          const message = `${alert.condition.field} is ${alert.condition.value}.`
          console.debug(alert.recipient, 'alert triggered SenseCAP', message)
          // return
          await mail(alert.recipient, 'alert triggered SenseCAP', message)
        }
      } else if (alert.condition.valueNot) {

        if (deep_value(resp, alert.condition.field) != alert.condition.valueNot) {
          const message = `${alert.condition.field} is not ${alert.condition.valueNot}.`
          console.debug(alert.recipient, 'alert triggered SenseCAP', message, deep_value(resp, alert.condition.field))
          // return
          await mail(alert.recipient, 'alert triggered SenseCAP', message)
        }
      } else {
        // no condition
      }
    })
  }
}