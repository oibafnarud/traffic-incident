// src/features/incidents/components/IncidentsList.tsx
import { Search } from 'lucide-react';

interface IncidentsListProps {
  onSelect: (incident: any) => void;
  statusFilter: string;
  searchTerm: string;
  onSearch: (term: string) => void;
  onFilterChange: (status: string) => void;
  statusFilters: Array<{ value: string; label: string }>;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  all: 'bg-gray-100 text-gray-800'
};

const getStatusLabel = (status: string, filters: Array<{ value: string; label: string }>) => {
  return filters.find(f => f.value === status)?.label || status;
};

export const IncidentsList = ({
  onSelect,
  statusFilter,
  searchTerm,
  onSearch,
  onFilterChange,
  statusFilters
}: IncidentsListProps) => {
  const incidents = [
    { id: '1', status: 'pending', date: '27/11/2024', time: '14:30', location: 'Santo Domingo Este' },
    { id: '2', status: 'processing', date: '26/11/2024', time: '09:15', location: 'Santiago' },
    { id: '3', status: 'completed', date: '25/11/2024', time: '16:45', location: 'La Romana' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por # de caso, fecha o ubicación..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10 pr-4 py-2.5 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="border rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {statusFilters.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            onClick={() => onSelect(incident)}
            className="p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Caso #{incident.id}
                  </h3>
                  <span className={`px-2.5 py-1 rounded-full text-sm font-medium ${statusColors[incident.status as keyof typeof statusColors]}`}>
                    {getStatusLabel(incident.status, statusFilters)}
                  </span>
                </div>
                <p className="text-gray-600">{incident.location}</p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>{incident.date}</p>
                <p>{incident.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};