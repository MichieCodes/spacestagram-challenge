import * as packageData from '../../package.json'

export function getBasename() {
  return /(\w|-)+$/.exec(packageData.homepage)![0]
}
