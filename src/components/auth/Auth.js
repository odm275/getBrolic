import React, { Component } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import Moment from 'moment'
import {
  getLocalStorageItems,
  setLocalStorageItems
} from '../../helpers/localStorage'

import { isEmpty } from '../../helpers/isEmpty'

const AuthContext = React.createContext({
  isAuth: false
})
// isAuth desc
// Scenario1: isAuth will change to true and stay true whenever settings are created or edited.
// Scenario2: isAuth will be false by default and if localStorage is deleted.

class Auth extends Component {
  static Consumer = AuthContext.Consumer
  //  Control State Pattern
  //  Ex: When submitting DialogForm
  authenticate = userInfo => {
    this.setState({ isAuth: true, userInfo: userInfo }, () =>
      setLocalStorageItems(userInfo)
    )
  }

  //  REMINDER: IF IT REFERENCES STATE TO BUILD UPON THE NEXT UPDATE OF STATE, USE CALLBACK FUNCTIONAL UPDATE TO MAKE SURE YOU ARE GETTING
  //  THE RIGHT STATE TO REFFERENCE THE NEW UPDATE YOU ARE MANAGING!!!!
  //  ToDo: Write the functional setState outside of the class to refractor into a clear looking method.

  addDataHistory = type => newData => {
    this.setState(
      ({ userInfo }) => {
        const newEntry = { data: newData, date: Moment().format('YYYY-MM-DD') }
        if (isEmpty(userInfo[type])) userInfo[type] = []
        const dataUpdated = [...userInfo[type], newEntry]
        userInfo[type] = dataUpdated
        return userInfo
      },
      () => setLocalStorageItems(this.state.userInfo)
    )
  }
  initalState = {
    isAuth: !isEmpty(getLocalStorageItems()),
    authenticate: this.authenticate,
    userInfo: !isEmpty(getLocalStorageItems()) ? getLocalStorageItems() : null,
    weightGoal: 160, // ??????????????????????
    addWeightHistory: this.addDataHistory('weightHistory'),
    addCaloriesHistory: this.addDataHistory('caloriesHistory')
  }
  state = this.initalState

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}
//  HOC wrapper for making available our the consumer data on props!  What a hack!
function withAuth(Component) {
  function Wrapper(props, ref) {
    return (
      <Auth.Consumer>
        {({ userInfo }) => (
          <Component {...props} userInfo={userInfo} ref={ref} />
        )}
      </Auth.Consumer>
    )
  }
  Wrapper.displayName = `withAuth(${Component.displayName || Component.name})`
  return hoistNonReactStatics(React.forwardRef(Wrapper), Component)
}

export { withAuth, Auth as default }
