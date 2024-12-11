export const InsuranceDetailsForm = () => {
    const [formData, setFormData] = useState<InsuranceCompany>({
      name: '',
      address: '',
      mainPhone: '',
      mainEmail: '',
      contacts: {
        claims: {
          name: '',
          phone: '',
          email: '',
        },
        coverage: {
          name: '',
          phone: '',
          email: '',
        },
      },
      documentation: {
        claims: [],
        coverage: [],
      },
      validationProcess: 'manual',
      responseTime: {
        claims: '',
        coverage: '',
      }
    });
  
    return (
      <div className="space-y-6">
        {/* Información Básica */}
        <section className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Información General</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ... campos básicos ... */}
          </div>
        </section>
  
        {/* Contactos */}
        <section className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Contactos</h3>
          
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h4 className="font-medium mb-2">Departamento de Reclamos</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Nombre del contacto"
                  className="p-2 border rounded"
                  value={formData.contacts.claims.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    contacts: {
                      ...formData.contacts,
                      claims: {
                        ...formData.contacts.claims,
                        name: e.target.value
                      }
                    }
                  })}
                />
                {/* ... otros campos de contacto ... */}
              </div>
            </div>
  
            <div>
              <h4 className="font-medium mb-2">Departamento de Cartas de Cobertura</h4>
              {/* ... campos similares para contacto de cobertura ... */}
            </div>
          </div>
        </section>
  
        {/* Documentación Requerida */}
        <section className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Documentación Requerida</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Para Reclamos</h4>
              <DocumentList
                documents={formData.documentation.claims}
                onAdd={(doc) => setFormData({
                  ...formData,
                  documentation: {
                    ...formData.documentation,
                    claims: [...formData.documentation.claims, doc]
                  }
                })}
                onRemove={(index) => {
                  const newDocs = [...formData.documentation.claims];
                  newDocs.splice(index, 1);
                  setFormData({
                    ...formData,
                    documentation: {
                      ...formData.documentation,
                      claims: newDocs
                    }
                  });
                }}
              />
            </div>
  
            <div>
              <h4 className="font-medium mb-2">Para Cartas de Cobertura</h4>
              {/* ... similar DocumentList para documentos de cobertura ... */}
            </div>
          </div>
        </section>
  
        {/* Integración API */}
        <section className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Integración API</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.apiIntegration?.enabled}
                onChange={(e) => setFormData({
                  ...formData,
                  apiIntegration: {
                    ...formData.apiIntegration,
                    enabled: e.target.checked
                  }
                })}
              />
              <label>Habilitar integración API</label>
            </div>
  
            {formData.apiIntegration?.enabled && (
              <div className="space-y-2">
                {/* ... campos de configuración API ... */}
              </div>
            )}
          </div>
        </section>
      </div>
    );
  };