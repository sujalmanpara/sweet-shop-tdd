import { Sweet } from '@/models/Sweet';

interface SweetListProps {
  sweets: Sweet[];
}

export default function SweetList({ sweets }: SweetListProps) {
  return (
    <div className="w-full max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sweets.map(sweet => (
          <div key={sweet.id} className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800">{sweet.name}</h2>
            <p className="text-gray-600">{sweet.category}</p>
            <p className="text-lg font-semibold text-gray-900 mt-2">${sweet.price.toFixed(2)}</p>
            <p className="text-gray-500">In Stock: {sweet.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 