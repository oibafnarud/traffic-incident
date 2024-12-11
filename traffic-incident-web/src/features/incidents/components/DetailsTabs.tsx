export const DetailsTabs = ({ activeTab, onTabChange }: DetailsTabsProps) => {
    const tabs = [
      { id: 'details', label: 'Detalles' },
      { id: 'documents', label: 'Documentos' },
      { id: 'report', label: 'Acta' }
    ];
   
    return (
      <div className="border-b">
        <nav className="-mb-px flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as any)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                ${activeTab === tab.id 
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    );
   };