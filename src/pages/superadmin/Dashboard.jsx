import SuperAdminLayout from "../../components/layout/SuperAdminLayout";
import StatCard from "../../components/dashboard/StatCard";
import Filters from "../../components/dashboard/Filters";
import BarChartCard from "../../components/dashboard/BarChartCard";


export default function Dashboard() {
  return (
    <SuperAdminLayout>
      <Filters />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        <StatCard title="Total Students" value="1240" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BarChartCard title="Students status (Enrolled / Passed / Failed)" />
        <BarChartCard title="Certifications company (AWS, Microsoft, etc.)" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <BarChartCard title="College-wise Performance of Avg Marks" />
      </div>
    </SuperAdminLayout>
  );
}