interface StatCardProps {
    title: string;
    value: string;
   }
   
   export const StatCard = ({ title, value }: StatCardProps) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
    );
   };