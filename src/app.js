import React from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'

import Header from './components/header'
import EncodedMarkdown from './components/encoded-markdown'
import Intro from './content/intro.md'
import StringField from './content/string-field.md'
import GeometryField from './content/geometry-field.md'
import NumberField from './content/number-field.md'
import DateField from './content/date-field.md'
import OtherField from './content/other-field.md'
import CartoDBID from './content/cartodb_id.md'
import TheGeomWebmercator from './content/the_geom_webmercator.md'
import ObjectID from './content/objectid.md'

const specialFields = {
  cartodb_id: CartoDBID,
  the_geom_webmercator: TheGeomWebmercator,
  objectid: ObjectID
}

const fieldTypes = {
  string: StringField,
  geometry: GeometryField,
  number: NumberField,
  date: DateField
}

export default observer(class App extends React.Component {
  render () {
    const { table, endpoint, selectedFieldIndex, fields } = this.props.store
    const selectedField = selectedFieldIndex !== null ? fields[selectedFieldIndex] : null
    const content = selectedField ? this.determineContent(selectedField) : null

    return (
      <div className='site' id='page'>
        <Header />
        <article>
          <div className='column row'>
            <EncodedMarkdown source={Intro} endpoint={endpoint} table={table} />

            <div className='row'>
              <div className='medium-6 columns'>
                <ul className='tabs vertical' data-tabs>
                  {fields.map(this.renderFieldTab, this)}
                </ul>
              </div>
              <div className='medium-18 columns'>
                <div className='tabs-content vertical'>
                  <div className='tabs-panel is-active'>
                    {selectedField
                      ? <EncodedMarkdown
                          source={content}
                          field={selectedField}
                          endpoint={endpoint}
                          table={table} />
                      : 'Select a field on the left'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    )
  }
  determineContent (field) {
    return specialFields[field.name] || fieldTypes[field.type] || OtherField
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
})
