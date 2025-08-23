import DashboardCards from "../components/DashboardCards"; // Import the component that displays overall statistics cards
import SalesChart from "../components/SalesChart";         // Import the component that renders the sales chart
import OrdersTable from "../components/OrdersTable";       // Import the component that displays recent orders in a table

export default function Home() {
  return (
    <div className="p-4 space-y-6"> {/* Main container with padding and vertical spacing between elements */}
      
      {/* Main dashboard title */}
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        داشبورد {/* "Dashboard" title in Persian */}
      </h1>

      {/* Section for displaying overall statistics in dashboard cards */}
      <DashboardCards />

      {/* Section containing both the sales chart and orders table */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        
        {/* Sales chart in its own styled container */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <SalesChart />
        </div>

        {/* Orders table in a styled container with horizontal scroll enabled for mobile view */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 overflow-x-auto">
          <OrdersTable />
        </div>
        
      </div>
    </div>
  );
}
