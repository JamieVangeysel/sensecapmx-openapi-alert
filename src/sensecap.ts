const config = require('./config')
const https = require('https')

exports.get = (sn): Promise<ISenseCAPDevice> => {
  const url = `${config.sensecap.apiUrl}/api/openapi/device/view_device?sn=${sn}&api_key=${config.sensecap.apiKey}`
  console.log(url)
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      console.log('statusCode:', res.statusCode)
      console.log('headers:', res.headers)

      let buf = ''

      res.on('data', (d) => {
        process.stdout.write(d)
        buf += d
      })

      res.on('end', () => {
        resolve(JSON.parse(buf))
      })
    }).on('error', (e) => {
      console.error(e)
      reject(e)
    })
  })
}

export interface ISenseCAPDevice {
  code: number
  msg: string
  data: {
    height: number
    connected: P2POutboundStatus
    dialable: P2PInboundStatus
    natType: NatType
    ipPublic: string[]
    ipEthLocal: string[]
    ipWifiLocal: string[]
    syncList: ISyncItem[]
    p2pAddress: string[]
    fan_status_list: IFanStatusItem[]
    relay: boolean
    labels: string[]
    sn: string
    address: string
    batch: null
    collectTime: number
    cpuId: string
    cpuTemperature: number
    cpuUsed: number
    memoryTotal: number
    memoryUsed: number
    name: string
    onboardingKey: string
    producedAt: number
    region: string
    sdTotal: number
    sdUsed: number
    version: {
      firmware: string
    }
    wifiSsid: string
    addToHeliumAt: number
    gain: number
    owner: string
    geocode: {
      short_street: string
      short_state: string
      short_country: string
      short_city: string
      long_street: string
      long_state: string
      long_country: string
      long_city: string
      city_id: string
    }
    heliumOnline: boolean
    lat: number
    lng: number
    totalHeight: number
    synced: boolean
    online: boolean
    isHealth: number //  1：yes, 2：no,
    relayed: number //  1：yes, 2：no,
  }
}

export enum P2POutboundStatus {
  unknown = -1,
  unhealthy = 0,
  healthy = 1
}

export enum P2PInboundStatus {
  unknown = -1,
  unhealthy = 0,
  healthy = 1
}

export enum NatType {
  unknown = -1, 
  none = 0,
  static = 1,
  symmetric = 2, 
  restricted = 3
}

export interface ISyncItem {
  height: number
  total: number
  time: number
}

export interface IFanStatusItem {
  fan: FanStatus
  temperature: number
  time: number
}

export enum FanStatus {
  opened = 0,
  closed = 1
}