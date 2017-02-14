import { observable } from 'mobx'
import axios from 'axios'
import { resolve } from 'url'
import { map } from 'lodash'

export default class Store {
  @observable fields = []

  async getFields (domain, table) {
    const query = `SELECT * from ${table} LIMIT 0`
    const url = resolve(`https://${domain}`, `/api/v2/sql?q=${query}`)
    try {
      const response = await axios.get(url)
      this.fields = unkeyBy(response.data.fields, 'name')
    } catch (err) {
      console.error('Error requesting fields', err)
    }
  }
}

function unkeyBy (data, keyName) {
  return map(data, (value, key) => Object.assign({}, value, {[keyName]: key}))
}
