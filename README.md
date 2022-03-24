# sensecapmx-openapi-alert
Alert based on connection status of SenseCAP device using OpenApi

## Installing siri-say
```bash
  npm install sensecapmx-openapi-alert --save
```

## Usage

### Configuration example
```javascript
module.exports = {
  sensecap: {
    apiUrl: 'https://status.sensecapmx.cloud',
    apiKey: '<<api_key>>'
  },
  devices: [
    '<<serial_number>>'
  ],
  smtp: {

  }
}
```