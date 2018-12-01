import React, { Component } from 'react'
import { withAuth } from '../auth/Auth'
import moment from 'moment'

//  Decide how many calories the user should consume per day.
//  BMR is going slightly tilt since the user's weight is going go up and down a bit each day, the parameter for the calculation is going to be the last
//  ... elemenet in the weightHistory array.

//  PureComponent: We're going with a pure component since it only renders if the props coming in are different from previous ones aka a shallow render. We still
//  end up calculating a new set of props, but that's fine unless the history of calories is really big. (https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization)
class CalorieCounter extends Component {
  initialState = {
    currentDate: moment().format('YYYY-MM-DD')
  }

  state = this.initialState
  static feetToInches(ft) {
    return ft * 12
  }
  //  f = f+c
  static BMR({
    weightHistory,
    ftHeight,
    inHeight,
    dateOfBirth,
    gender,
    activityLevel
  }) {
    //  BMR
    //  MEN = 66 + ( 6.2 × weight in pounds ) + ( 12.7 × height in inches ) – ( 6.76 × age in years )
    //  WOMEN  = 655.1 + ( 4.35 × weight in pounds ) + ( 4.7 × height in inches ) - ( 4.7 × age in years )
    const height =
      parseInt(inHeight, 10) + this.feetToInches(parseInt(ftHeight, 10))
    const age = moment().diff(moment(dateOfBirth), 'years')
    const weight = parseInt(weightHistory[0].data, 10) //  Go to the weight of the selected and today by default?
    const active = parseInt(activityLevel, 10)
    if (gender === 'male') {
      return Math.floor(
        (66 + 6.2 * weight + 12.7 * height - 6.76 * age) * active
      )
    } else if (gender === 'female') {
      return Math.floor(
        (655.1 + 4.35 * weight + 4.7 * height - 4.7 * age) * active
      )
    }
  }
  //  We need this EVERY time there's a new change in this.props.userInfo ...
  static caloriesConsumedThisDay = (history, inputDate) => {
    return history.reduce((acc, currDay) => {
      if (inputDate === currDay.date) {
        acc += parseInt(currDay.data, 10)
      }
      return acc
    }, 0)
  }

  handleChangeDate = e => {
    this.setState({ currentDate: e.target.value })
  }
  //  We only care about what is happening per day inside this component.
  render() {
    const {
      state: { currentDate },
      props: { userInfo },
      handleChangeDate
    } = this
    console.log('userInfo')
    console.log(userInfo)
    const BMR = CalorieCounter.BMR(userInfo)
    const caloriesConsumedThisDay = CalorieCounter.caloriesConsumedThisDay(
      userInfo.caloriesHistory || [],
      currentDate
    )
    return this.props.children({
      currentDate,
      BMR,
      caloriesConsumedThisDay,
      changeDate: handleChangeDate
    })
  }
}
export default withAuth(CalorieCounter)
