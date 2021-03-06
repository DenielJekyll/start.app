//
// Top-level entry point in the app bundle
//
// This should never be run on the server side.
//
import { createElement } from 'react'
import { hydrate } from 'react-dom'

import Root from './root'

let div = document.querySelector('div#root')
let props = JSON.parse(document.querySelector('head>script[type=x-data]').textContent)
hydrate(createElement(Root, props), div)
