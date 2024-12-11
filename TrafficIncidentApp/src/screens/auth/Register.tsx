export const Register = ({ navigation }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      personalInfo: {
        name: '',
        cedula: '',
        email: '',
        phone: '',
        password: ''
      },
      license: {
        number: '',
        expiry: '',
        category: ''
      },
      vehicle: {
        plate: '',
        brand: '',
        model: '',
        year: '',
        insurance: {
          company: '',
          policyNumber: '',
          expirationDate: ''
        }
      }
    });
  
    const renderStep = () => {
      switch(step) {
        case 1:
          return <PersonalInfoForm 
            data={formData.personalInfo}
            onUpdate={data => setFormData({...formData, personalInfo: data})}
            onNext={() => setStep(2)}
          />;
        case 2:
          return <LicenseForm 
            data={formData.license}
            onUpdate={data => setFormData({...formData, license: data})}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />;
        case 3:
          return <VehicleForm 
            data={formData.vehicle}
            onUpdate={data => setFormData({...formData, vehicle: data})}
            onSubmit={handleSubmit}
            onBack={() => setStep(2)}
          />;
      }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          <ProgressBar step={step} totalSteps={3} />
          {renderStep()}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };