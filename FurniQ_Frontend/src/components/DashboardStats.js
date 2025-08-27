import {
  ShoppingCartIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

const stats = [
  { id: 1, name: 'Total Sales', value: '$24,567', icon: CurrencyDollarIcon, change: '+12%', changeType: 'positive' },
  { id: 3, name: 'Customers', value: '1,234', icon: UserGroupIcon, change: '+5%', changeType: 'positive' },
  { id: 4, name: 'Conversion Rate', value: '3.2%', icon: ChartBarIcon, change: '-1.2%', changeType: 'negative' },
]

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.id} className="stat-card relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6">
          <div>
            <div className="absolute rounded-md bg-indigo-500 p-3">
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
          </div>
          <div className="ml-16 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <p className={`ml-2 flex items-baseline text-sm font-semibold ${
              stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}