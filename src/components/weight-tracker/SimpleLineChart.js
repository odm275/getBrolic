import React from 'react'
import { withAuth } from '../auth/Auth'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer'
import LineChart from 'recharts/lib/chart/LineChart'
import Line from 'recharts/lib/cartesian/Line'
import XAxis from 'recharts/lib/cartesian/XAxis'
import YAxis from 'recharts/lib/cartesian/YAxis'
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid'
import Tooltip from 'recharts/lib/component/Tooltip'
import Legend from 'recharts/lib/component/Legend'

//Get the day for today, and go a week in the future.

//By Week counting from today, we're going filter...

const weightByDate = history =>
  Object.entries(
    history.reduce((acc, weight) => {
      const { date } = weight
      acc[date] = acc[date] ? [...acc[date], weight] : [weight]
      return acc
    }, {})
  )

const totalWeightPerDay = historyPerDay =>
  historyPerDay.map(day => {
    return {
      date: day[0],
      data: day[1].reduce(
        (acc, weight) => acc + Number.parseInt(weight.data, 10),
        0
      )
    }
  })

const generateGraph = (timeFrame, daysLogged) => {
  return timeFrame.map(day => {
    const match = daysLogged.find(dayData => dayData.date === day)
    const resolve = match ? match : { date: day, data: 0 }
    return resolve
  })
}

//

function SimpleLineChart({ userInfo: { weightHistory }, timeRange }) {
  const weightsByDay = weightByDate(weightHistory)
  const weightTotalByDay = totalWeightPerDay(weightsByDay)
  const graphData = generateGraph(timeRange, weightTotalByDay)
  return (
    <ResponsiveContainer width="99%" height={320}>
      <LineChart data={graphData}>
        <XAxis dataKey="date" />
        <YAxis dataKey="data" />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="data"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default withAuth(SimpleLineChart)
