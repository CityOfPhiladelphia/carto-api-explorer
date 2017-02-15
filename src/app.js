import React from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'

import Header from './header'

@observer
export default class App extends React.Component {
  render () {
    const selectedFieldIndex = this.props.store.selectedFieldIndex
    const selectedField = selectedFieldIndex ? this.props.store.fields[selectedFieldIndex] : null

    return (
      <div className='site' id='page'>
        <Header />
        <article>
          <div className='column row'>
            <h1 className='contrast'>{this.props.table}</h1>

            <div className='row'>
              <div className='medium-6 columns'>
                <ul className='tabs vertical' data-tabs>
                  {this.props.store.fields.map(this.renderFieldTab, this)}
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
    return (
      <div>
        <h2 className='mvn'>{field.name}</h2>
        <p><code>{field.name}</code> is a <code>{field.type}</code> field.</p>
      </div>
    )
  }
  componentDidMount () {
    this.props.store.getFields(this.props.domain, this.props.table)
  }
  onClickField (fieldIndex, evt) {
    this.props.store.selectField(fieldIndex)
    evt.preventDefault()
  }
}
