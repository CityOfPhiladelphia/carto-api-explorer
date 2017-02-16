import React from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'

import Header from './header'

@observer
export default class App extends React.Component {
  render () {
    const { domain, table, selectedFieldIndex, fields } = this.props.store
    const selectedField = selectedFieldIndex ? fields[selectedFieldIndex] : null

    return (
      <div className='site' id='page'>
        <Header />
        <article>
          <div className='column row'>
            <h1 className='contrast'>{table}</h1>

            <p>
              This dataset is published to <a href='https://carto.com'>carto</a>, which allows you to
              query the data using SQL (specifically the PostgreSQL flavor with the PostGIS extension).
              Rather than executing the queries in a database program, you execute them through HTTP
              (ie. the web browser) via Carto's <a href='https://carto.com/docs/carto-engine/sql-api'>SQL API</a>,
              passing your query as the <code>q</code> parameter. For example:
            </p>

            <p><code>https://{domain}/api/v2/sql?q=SELECT * FROM {table}</code></p>

            <p>
              You can do just about everything you'd expect from a PostgreSQL+PostGIS database - even
              joins between tables.
            </p>

            <div className='row'>
              <div className='medium-6 columns'>
                <ul className='tabs vertical' data-tabs>
                  {fields.map(this.renderFieldTab, this)}
                </ul>
              </div>
              <div className='medium-18 columns'>
                <div className='tabs-content vertical'>
                  <div className='tabs-panel is-active'>
                    {selectedField ? this.renderFieldContent(selectedField) : 'Select a field on the left'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    )
  }
  renderFieldTab (field, index) {
    const selectedFieldIndex = this.props.store.selectedFieldIndex
    const className = classNames('tabs-title', {'is-active': index === selectedFieldIndex})
    return (
      <li key={index} className={className}>
        <a href='#' onClick={this.onClickField.bind(this, index)}>
          {field.name}
        </a>
      </li>
    )
  }
  renderFieldContent (field) {
    const { endpoint, table } = this.props.store
    const query = `SELECT * FROM ${table} WHERE ${field.name} = '${field.sample}'`
    const url = `${endpoint}?q=${query}`
    return (
      <div>
        <h2 className='mvn'>{field.name}</h2>
        <p><code>{field.name}</code> is a <code>{field.type}</code> field. Example query:</p>
        <p><code>{url}</code></p>
      </div>
    )
  }
  componentDidMount () {
    this.props.store.getFields()
  }
  onClickField (fieldIndex, evt) {
    this.props.store.selectField(fieldIndex)
    evt.preventDefault()
  }
}
