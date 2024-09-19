import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"
import { BarGraphProps } from "./types"


const BarGraph = ({
  data
}: BarGraphProps) => {
  return (
    <ResponsiveContainer>
      <BarChart
        width={500}
        height={500}
        data={data}
        // margin={{
        //   top: 5,
        //   right: 30,
        //   left: 20,
        //   bottom: 5
        // }}
        className='text-xs'
      >
        <CartesianGrid
          vertical={false}
          opacity={0.3}
        />
        <XAxis
          dataKey='month'
          tickCount={6}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickCount={10}
          domain={[0, 5000]}
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey='income'
          className="fill-green-500 w-4 rounded-full"
        />
        <Bar
          dataKey='expense'
          className="fill-red-500 w-4 rounded-full"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarGraph