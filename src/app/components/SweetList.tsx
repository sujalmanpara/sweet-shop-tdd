import { Sweet } from '@/models/Sweet';
import SweetCard from './SweetCard';

interface SweetListProps {
  sweets: Sweet[];
  onEdit: (sweet: Sweet) => void;
  onDelete: (id: number) => void;
}

export default function SweetList({ sweets, onEdit, onDelete }: SweetListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sweets.map(sweet => (
        <SweetCard key={sweet.id} sweet={sweet} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
} 