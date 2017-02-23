import React from 'react'
import ReactMarkdown from 'react-markdown'
import {observer} from 'mobx-react'
import template from 'lodash/template'

import './encoded-markdown.css'

@observer
export default class EncodedMarkdown extends React.Component {
  render () {
    const markdown = decode(this.props.source)
    const compiledTemplate = template(markdown, { interpolate: /{{([\s\S]+?)}}/g })
    const processedTemplate = compiledTemplate(this.props)

    return <ReactMarkdown source={processedTemplate} className='markdown' skipHtml={true} />
  }
}

function decode (dataUrl) {
  const parts = dataUrl.split(',')
  return parts.length > 1 ? window.atob(parts[1]) : ''
}
