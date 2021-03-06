import React from 'react'
import Header from '../../src/components/Header.js'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import store from '../../src/store/index.js'
import { Provider } from 'react-redux'

it('renders correctly', () => {
  const tree = renderer.create(<Provider store={store}><Header /></Provider>).toJSON()
  expect(tree).toMatchSnapshot()
})
