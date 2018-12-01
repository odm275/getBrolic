import moment from 'moment'

const createDays = (start, end) => {
  var days = []
  var day = start
  while (day <= end) {
    days.push(day.format('YYYY-MM-DD'))
    day = day.clone().add(1, 'd')
  }
  return days
}
export const ranges = [
  {
    value: createDays(moment().subtract(6, 'days'), moment()),
    label: 'Last 7 Days'
  },
  {
    value: createDays(moment().startOf('week'), moment().endOf('week')),
    label: 'This Week'
  },
  {
    value: createDays(
      moment()
        .subtract(1, 'week')
        .startOf('week'),
      moment()
        .subtract(1, 'week')
        .endOf('week')
    ),
    label: 'Last Week'
  },
  {
    value: createDays(moment().subtract(29, 'days'), moment()),
    label: 'Last 30 days'
  },
  {
    value: createDays(moment().startOf('month'), moment().endOf('month')),
    label: 'This Month'
  },
  {
    value: createDays(
      moment()
        .subtract(1, 'month')
        .startOf('month'),
      moment()
        .subtract(1, 'month')
        .endOf('month')
    ),
    label: 'Last Month'
  },
  {
    value: createDays(moment().startOf('year'), moment().endOf('year')),
    label: 'This Year'
  },
  {
    value: createDays(
      moment()
        .subtract(1, 'year')
        .startOf('year'),
      moment()
        .subtract(1, 'year')
        .endOf('year')
    ),
    label: 'Last Year'
  }
]
