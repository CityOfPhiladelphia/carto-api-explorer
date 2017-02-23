import { observable } from 'mobx'
import axios from 'axios'
import { resolve } from 'url'
import { map } from 'lodash'

export default class Store {
  @observable fields = []
  @observable selectedFieldIndex = null

  constructor (domain, table) {
    this.domain = domain
    this.table = table
  }

  get endpoint () {
    return resolve(`https://${this.domain}`, `/api/v2/sql`)
  }

  async getFields () {
    const query = `SELECT * from ${this.table} LIMIT 0`
    const url = `${this.endpoint}?q=${query}`
    try {
      const response = await axios.get(url)
      this.fields = unkeyBy(response.data.fields, 'name')
    } catch (err) {
      console.error('Error requesting fields', err)
    }
  }

  selectField (fieldIndex) {
    this.selectedFieldIndex = fieldIndex
    const field = this.fields[fieldIndex]
    if (!field.sample) {
      this.getSampleValue(fieldIndex)
    }
  }

  async getSampleValue (fieldIndex) {
    const field = this.fields[fieldIndex]
    const query = `SELECT ${field.name} from ${this.table} WHERE ${field.name} IS NOT NULL LIMIT 1`
    const url = `${this.endpoint}?q=${query}`
    try {
      const response = await axios.get(url)
      if (response.data.rows.length) {
        field.sample = response.data.rows[0][field.name]
      }
    } catch (err) {
      console.error(`Error requesting sample value for ${field.name}`, err)
    }
  }
}

function unkeyBy (data, keyName) {
  // This utility function also adds a `sample` property because when I add it from
  // getSampleValue, mobx observers don't seem to notice. A little more research into mobx
  // best practises would resolve this, I'm sure. Maybe something with `extendObservable`.
  return map(data, (value, key) => Object.assign({}, value, {[keyName]: key, sample: ''}))
}
