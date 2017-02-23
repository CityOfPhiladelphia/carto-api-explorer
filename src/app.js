import React from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'

import Header from './components/header'
import EncodedMarkdown from './components/encoded-markdown'
import Intro from './content/intro.md'
import StringField from './content/string-field.md'
import GeometryField from './content/geometry-field.md'

const fieldTypes = {
  string: StringField,
  geometry: GeometryField
}

@observer
export default class App extends React.Component {
  render () {
    const { table, endpoint, selectedFieldIndex, fields } = this.props.store
    const selectedField = selectedFieldIndex ? fields[selectedFieldIndex] : null

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
                      ? <EncodedMarkdown source={fieldTypes[selectedField.type] || StringField} field={selectedField} endpoint={endpoint} table={table} />
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
