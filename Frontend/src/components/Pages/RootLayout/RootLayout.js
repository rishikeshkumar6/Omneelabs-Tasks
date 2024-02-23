import React from 'react'
import store from '../../../Redux/store'
import {Outlet} from 'react-router-dom'
import { Provider } from 'react-redux'
import Header from '../../Orgnism/Header/Header'

const RootLayout = () => {
  return (
    <Provider store={store}>
      <header>
        <Header/>
      </header>
      <main>
        <Outlet/>
      </main>
    </Provider>
  )
}

export default RootLayout
