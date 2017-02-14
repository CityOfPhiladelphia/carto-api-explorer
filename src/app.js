import React from 'react'
import { observer } from 'mobx-react'

import Header from './header'

@observer
export default class App extends React.Component {
  render () {
    return (
      <div className='site' id='page'>
        <Header />
        <article>
          <div className='column row'>
            <h1 className='contrast'>{this.props.table}</h1>

            <div className='row'>
              <div className='medium-6 columns'>
                <ul className='tabs vertical' data-tabs>
                  {this.props.store.fields.map((field, index) => (
                    <li key={index} className='tabs-title'>
                      <a href='#'>
                        {field.name} ({field.type})
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='medium-18 columns'>
                Lorem ipsum dolor sit amet.
              </div>
            </div>
          </div>
        </article>
      </div>
    )
  }
  componentDidMount () {
    this.props.store.getFields(this.props.domain, this.props.table)
  }
}
