export const config: IConfig = {
  sensecap: {
    apiUrl: 'https://status.sensecapmx.cloud',
    apiKey: 'a0m32c7xw3wxpwz6tpbk9moikh6kbx7yfpv8hx9swzs25v695'
  },
  devices: [
    '110991634220700014'
  ],
  smtp: {
    host: "smtp.office.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'adminstrator@claes-distribution.com',
      pass: 'ClaesTom1610',
    }
  },
  alerts: [
    {
      device: '110991634220700014',
      recipient: 'tom.claes@groupclaes.be',
      condition: {
        field: 'data.connected',
        valueNot: '1'
      }
    }
  ]
}

export interface IConfig {
  sensecap: {
    apiUrl: string
    apiKey: string
  }
  devices: string[]
  smtp: {
    host: string,
    port: number,
    secure: boolean, // true for 465
    auth: {
      user: string
      pass: string
    }
  }
  alerts: {
    device: string
    recipient: string
    condition: {
      field: string
      value?: any
      valueNot?: any
      currentValue?: any
    }
  }[]
}