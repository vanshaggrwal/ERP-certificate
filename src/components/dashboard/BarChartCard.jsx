export default function BarChartCard({ title }) {
  return (
    <div className="bg-green-100 border rounded-xl p-6">
      <p className="font-semibold mb-2">{title}</p>
      <div className="h-48 flex items-center justify-center">
        Bar Graph
      </div>
    </div>
  );
}