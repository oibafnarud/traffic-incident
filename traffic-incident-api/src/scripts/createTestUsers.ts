const createTestUsers = async () => {
    const users = [
      {
        name: 'Cliente 1',
        email: 'cliente1@test.com',
        password: '12345678',
        role: 'client',
        cedula: '001-1234567-8'
      },
      {
        name: 'Cliente 2', 
        email: 'cliente2@test.com',
        password: '12345678',
        role: 'client',
        cedula: '001-8765432-1'
      },
      {
        name: 'Oficial DIGESETT',
        email: 'oficial@digesett.com', 
        password: '12345678',
        role: 'digesett',
        digesettBadge: 'DGT-001'
      },
      {
        name: 'Agente Universal',
        email: 'agente@universal.com',
        password: '12345678', 
        role: 'insurance_agent',
        insuranceCompanyId: '...' // ID de Universal
      },
      {
        name: 'Agente Mapfre',
        email: 'agente@mapfre.com',
        password: '12345678',
        role: 'insurance_agent', 
        insuranceCompanyId: '...' // ID de Mapfre
      }
    ];
  
    for (const userData of users) {
      await User.create(userData);
    }
  };