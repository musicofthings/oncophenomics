
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../components/GlobalHeader';
import { Button } from '../components/ui/button';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface SpecimenRow {
  id: number;
  type: string;
  count: string;
  source: string;
  tissueFixative: string;
  tissueOtherType: string;
  anatomicSite: string;
  comments: string;
}

const TestRequestForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const totalSteps = 3;
  
  const [specimens, setSpecimens] = useState<SpecimenRow[]>([
    { 
      id: 1, type: '', count: '', source: '', 
      tissueFixative: '', tissueOtherType: '',
      anatomicSite: '', comments: ''
    }
  ]);

  const [prescriptionFile, setPrescriptionFile] = useState<{name: string, data: string} | null>(null);

  const [formData, setFormData] = useState({
    clientName: '',
    clientAccountNo: '',
    clientPhone: '',
    clientOrderNo: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    patientId: '',
    patientName: '',
    sex: '',
    birthDate: '',
    collectionDate: '',
    collectionTime: '',
    collectionAmPm: 'am',
    professionalName: '',
    profWorkPhone: '',
    profPersonalPhone: '',
    profRegNumber: '',
    clinicalSummary: '',
    diagnosisHistory: '',
    selectedTests: {} as Record<string, boolean>,
    orderingPhysicianSignature: '',
    orderingPhysicianDate: '',
    patientSignature: '',
    patientDate: '',
    patientRelation: 'Self', 
    proxyName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formError) setFormError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPrescriptionFile({
            name: file.name,
            data: reader.result as string
        });
        if (formError) setFormError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTestSelection = (testId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTests: {
        ...prev.selectedTests,
        [testId]: !prev.selectedTests[testId]
      }
    }));
    if (formError) setFormError(null);
  };

  const addSpecimenRow = () => {
    setSpecimens(prev => [
      ...prev,
      { id: Date.now(), type: '', count: '', source: '', tissueFixative: '', tissueOtherType: '', anatomicSite: '', comments: '' }
    ]);
  };

  const removeSpecimenRow = (id: number) => {
    if (specimens.length > 1) {
      setSpecimens(prev => prev.filter(row => row.id !== id));
    }
  };

  const updateSpecimenRow = (id: number, field: keyof SpecimenRow, value: any) => {
    setSpecimens(prev => prev.map(row => row.id === id ? { ...row, [field]: value } : row));
    if (formError) setFormError(null);
  };

  const validateStep1 = () => {
    if (!formData.clientName) return "Client Name is required.";
    if (!formData.patientId) return "Patient ID is required.";
    if (!formData.patientName) return "Patient Name is required.";
    if (!formData.professionalName) return "Physician Name is required.";
    if (!formData.diagnosisHistory) return "Diagnosis history is required.";
    if (specimens.some(s => !s.type)) return "Please specify all specimen types.";
    return null;
  };

  const validateStep2 = () => {
    const hasTest = Object.values(formData.selectedTests).some(val => val === true);
    if (!hasTest) return "Please select at least one test.";
    return null;
  };

  const validateStep3 = () => {
    if (!formData.orderingPhysicianSignature) return "Physician signature is required.";
    if (!formData.patientSignature) return "Patient signature is required.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateStep3();
    if (error) { setFormError(error); return; }

    setLoading(true);
    setFormError(null);

    try {
      // Validate Firebase connection
      if (!db) {
        throw new Error('Firebase not initialized. Please check your configuration.');
      }

      console.log('Submitting test request form...', { formData });

      // Set a timeout for Firebase submission
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Firebase submission timed out. Please try again.')), 10000)
      );

      const submitPromise = addDoc(collection(db, "test_requests"), {
        ...formData,
        specimens: specimens.map(({id, ...rest}) => rest), // Remove local IDs
        prescriptionFileName: prescriptionFile?.name || null,
        prescriptionFileData: prescriptionFile?.data || null,
        status: "pending_accession",
        createdAt: serverTimestamp()
      });

      // Race the submission against the timeout
      const docRef = await Promise.race([submitPromise, timeoutPromise]);
      
      console.log('Diagnostic Request Secured with ID:', (docRef as any).id);
      setShowSuccess(true);
      window.scrollTo(0, 0);

    } catch (err: any) {
      console.error('Firebase Submission Error:', err);
      const errorMsg = err?.message || 'An error occurred. Please check your connection and try again.';
      setFormError(`Cloud storage error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    let error = null;
    if (currentStep === 1) error = validateStep1();
    if (currentStep === 2) error = validateStep2();
    if (error) { setFormError(error); return; }
    setFormError(null);
    setCurrentStep(prev => prev + 1);
  };

  const specimenTypes = ['Blood', 'Bone Marrow', 'Fixed Cells', 'Cultured Cells', 'DNA', 'Paraffin Block', 'Slides', 'Tissue', 'Other'];

  const testSections = [
    { title: "PD-L1 Stains", items: [{id:"22c3", label:"22C3", desc:"PD-L1 (22C3) IHC"}, {id:"28p8", label:"28P8", desc:"PD-L1 (28-8) IHC"}]},
    { title: "NGS Panels", items: [{id:"FSTP", label:"FSTP", desc:"Solid Tumor Panel"}, {id:"FCRC", label:"FCRC", desc:"Colorectal Panel"}]},
    { title: "Liquid Biopsy", items: [{id:"FCLBP", label:"FCLBP", desc:"Comprehensive Liquid Biopsy Panel (Blood)"}]}
  ];

  if (showSuccess) {
    return (
      <div className="bg-slate-50 dark:bg-background-dark min-h-screen flex items-center justify-center p-4 font-display">
        <div className="bg-white dark:bg-surface-dark p-10 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-emerald-600 text-4xl">cloud_done</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Secured in Cloud</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            The test request for <strong>{formData.patientName}</strong> has been successfully archived in our HIPAA-compliant database. Reference ID generated.
          </p>
          <Button onClick={() => navigate('/')} className="w-full h-14 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold">
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-background-dark min-h-screen font-sans">
      <GlobalHeader title="Cloud Diagnostic Portal" />
      
      <main className="max-w-5xl mx-auto p-4 md:p-8 pb-40">
        <div className="mb-6 flex items-center gap-3 bg-blue-50 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100 dark:border-blue-800/30">
          <span className="material-symbols-outlined text-primary">security</span>
          <span className="text-xs font-semibold text-primary/80 uppercase tracking-widest">End-to-End Encrypted Session</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Patient & Provider Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Client Info</label>
                    <input type="text" name="clientName" value={formData.clientName} onChange={handleInputChange} placeholder="Hospital/Lab Name *" className="w-full rounded-xl border-slate-300 dark:bg-slate-800 p-3" required />
                    <input type="text" name="clientAccountNo" value={formData.clientAccountNo} onChange={handleInputChange} placeholder="Account #" className="w-full rounded-xl border-slate-300 dark:bg-slate-800 p-3" />
                  </div>
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Patient Info</label>
                    <input type="text" name="patientName" value={formData.patientName} onChange={handleInputChange} placeholder="Patient Full Name *" className="w-full rounded-xl border-slate-300 dark:bg-slate-800 p-3" required />
                    <input type="text" name="patientId" value={formData.patientId} onChange={handleInputChange} placeholder="MRN / Patient ID *" className="w-full rounded-xl border-slate-300 dark:bg-slate-800 p-3" required />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h2 className="text-xl font-bold mb-4">Specimens</h2>
                <div className="space-y-4">
                  {specimens.map((row, idx) => (
                    <div key={row.id} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-end">
                      <div className="flex-1 w-full">
                        <label className="block text-xs font-bold mb-1 uppercase">Type</label>
                        <select value={row.type} onChange={(e) => updateSpecimenRow(row.id, 'type', e.target.value)} className="w-full rounded-lg dark:bg-slate-800">
                          <option value="">Select...</option>
                          {specimenTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div className="flex-1 w-full">
                        <label className="block text-xs font-bold mb-1 uppercase">Notes</label>
                        <input type="text" value={row.comments} onChange={(e) => updateSpecimenRow(row.id, 'comments', e.target.value)} placeholder="Qty, Site, etc" className="w-full rounded-lg dark:bg-slate-800" />
                      </div>
                      <Button type="button" onClick={() => removeSpecimenRow(row.id)} variant="ghost" className="text-red-500">Remove</Button>
                    </div>
                  ))}
                  <Button type="button" onClick={addSpecimenRow} variant="outline" className="w-full h-12 border-dashed">Add Another Specimen</Button>
                </div>
              </div>

              <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h2 className="text-xl font-bold mb-4">Clinical History</h2>
                <textarea name="diagnosisHistory" rows={4} value={formData.diagnosisHistory} onChange={handleInputChange} placeholder="Summary of diagnosis and testing goals *" className="w-full rounded-xl dark:bg-slate-800 p-4" required />
                <div className="mt-4">
                  <label className="block text-sm font-bold mb-2">Prescription/Referral (PDF)</label>
                  <input type="file" accept="application/pdf" onChange={handleFileChange} className="w-full text-sm" />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Test Selection</h2>
                <div className="space-y-8">
                  {testSections.map((sec, idx) => (
                    <div key={idx}>
                      <h3 className="text-sm font-bold text-primary uppercase mb-4 border-b pb-1">{sec.title}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sec.items.map(item => (
                          <label key={item.id} className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${formData.selectedTests[item.id] ? 'bg-primary/10 border-primary' : 'border-slate-200 dark:border-slate-800'}`}>
                            <input type="checkbox" checked={!!formData.selectedTests[item.id]} onChange={() => handleTestSelection(item.id)} className="mt-1" />
                            <div>
                              <div className="font-bold text-sm">{item.label}</div>
                              <div className="text-xs text-slate-500">{item.desc}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Final Certification</h2>
                <div className="space-y-6">
                  <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                    <label className="block text-sm font-bold mb-2">Physician Digital Signature *</label>
                    <input type="text" name="orderingPhysicianSignature" value={formData.orderingPhysicianSignature} onChange={handleInputChange} placeholder="Type full name to sign" className="w-full rounded-xl p-3 border-slate-300 dark:bg-slate-800" required />
                  </div>
                  <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                    <label className="block text-sm font-bold mb-2">Patient/Proxy Digital Signature *</label>
                    <input type="text" name="patientSignature" value={formData.patientSignature} onChange={handleInputChange} placeholder="Type full name to sign" className="w-full rounded-xl p-3 border-slate-300 dark:bg-slate-800" required />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-surface-dark/95 border-t p-4 z-50 md:static md:bg-transparent md:border-none md:p-0">
            {formError && <div className="max-w-5xl mx-auto mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-bold flex items-center gap-2"><span className="material-symbols-outlined">error</span> {formError}</div>}
            <div className="max-w-5xl mx-auto flex justify-between items-center">
              <div className="text-sm font-bold text-slate-400">Step {currentStep} of {totalSteps}</div>
              <div className="flex gap-4">
                {currentStep > 1 && <Button type="button" variant="outline" onClick={() => setCurrentStep(currentStep-1)}>Back</Button>}
                {currentStep < 3 ? (
                  <Button type="button" onClick={nextStep} className="bg-primary text-white px-8 h-12 rounded-xl">Next Step</Button>
                ) : (
                  <Button type="submit" disabled={loading} className="bg-emerald-600 text-white px-10 h-12 rounded-xl shadow-lg shadow-emerald-900/20">
                    {loading ? (
                      <div className="flex items-center gap-2">
                         <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                         Saving to Cloud...
                      </div>
                    ) : 'Submit Final Request'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default TestRequestForm;
