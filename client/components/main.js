import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout, toggleCart } from '../store'
import ProductList from './productList'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { green100, green500, green700 } from 'material-ui/styles/colors'
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ShoppingCart from 'material-ui-icons/ShoppingCart'
import Badge from 'material-ui/Badge'
import Drawer from 'material-ui/Drawer'

//* MUI THEME */
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: green700,
    primary3Color: green100,
  },
}, {
    avatar: {
      borderColor: null,
    },
    userAgent: 'all',
  })

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const { children, handleClick, isLoggedIn, showCart, toggleCart } = props

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <AppBar
          title={"Wood Shop"}
          iconElementRight={
            <div>
              <FlatButton label="Home"
                containerElement={<Link to="/home" />} />
              <FlatButton label="Sign Up"
                containerElement={<Link to="/signup" />} />
              <FlatButton label="Login"
                containerElement={<Link to="/login" />} />
              { /* Shopping Cart */}
              <Badge badgeContent={5} secondary={true} badgeStyle={{ top: 14, right: 14, fontSize: 14 }}>
                <IconButton onClick={toggleCart}>
                  <ShoppingCart />
                </IconButton>
              </Badge>
            </div>
          }
        />
        <br />
        {children}
        <Drawer
          docked={false}
          width={400}
          open={showCart}
          openSecondary={true}
          zDepth={2}
          onRequestChange={(change) => toggleCart()}
        />
        }

      </div>
    </MuiThemeProvider>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    showCart: state.toggleCart
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
    toggleCart() {
      dispatch(toggleCart())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
