export default function StatCard({ title, value }) {
  return (
    <div className="bg-gray-300 rounded-xl p-10 text-center">
      <p className="text-xl">{title}</p>
      <h2 className="text-3xl font-bold mt-4">{value}</h2>
    </div>
  );
}