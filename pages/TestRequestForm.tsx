import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../components/GlobalHeader';
import { Button } from '../components/ui/button';

interface SpecimenRow {
  id: number;
  type: string;
  count: string;
  
  // Paraffin Block
  source: string;
  
  // Tissue
  tissueFixative: string; // 'frozen', 'fixed', 'wet', 'other'
  tissueOtherType: string;

  // Other
  anatomicSite: string;

  // General comments for types without specific fields
  comments: string;
}

const TestRequestForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const totalSteps = 3;
  
  // Dynamic Specimen Rows State
  const [specimens, setSpecimens] = useState<SpecimenRow[]>([
    { 
      id: 1, type: '', count: '', source: '', 
      tissueFixative: '', tissueOtherType: '',
      anatomicSite: '', comments: ''
    }
  ]);

  // File State
  const [prescriptionFile, setPrescriptionFile] = useState<{name: string, data: string} | null>(null);

  const [formData, setFormData] = useState({
    // Client Info
    clientName: '',
    clientAccountNo: '',
    clientPhone: '',
    clientOrderNo: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Patient Info
    patientId: '',
    patientName: '',
    sex: '',
    birthDate: '',
    collectionDate: '',
    collectionTime: '',
    collectionAmPm: 'am',

    // Healthcare Professional
    professionalName: '',
    profWorkPhone: '',
    profPersonalPhone: '',
    profRegNumber: '',

    // Clinical Summary
    clinicalSummary: '',

    // Diagnosis
    diagnosisHistory: '',
    
    // Page 2 - Tests
    selectedTests: {} as Record<string, boolean>,

    // Page 3 - Consent
    orderingPhysicianSignature: '',
    orderingPhysicianDate: '',
    patientSignature: '',
    patientDate: '',
    patientRelation: 'Self', // Self or Proxy
    proxyName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (formError) setFormError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        // Store base64 string
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

  // Specimen Handlers
  const addSpecimenRow = () => {
    setSpecimens(prev => [
      ...prev,
      { 
        id: Date.now(), type: '', count: '', source: '', 
        tissueFixative: '', tissueOtherType: '',
        anatomicSite: '', comments: ''
      }
    ]);
  };

  const removeSpecimenRow = (id: number) => {
    if (specimens.length > 1) {
      setSpecimens(prev => prev.filter(row => row.id !== id));
    } else {
        setSpecimens([{ 
          id: Date.now(), type: '', count: '', source: '', 
          tissueFixative: '', tissueOtherType: '',
          anatomicSite: '', comments: ''
        }]);
    }
  };

  const updateSpecimenRow = (id: number, field: keyof SpecimenRow, value: any) => {
    setSpecimens(prev => prev.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
    if (formError) setFormError(null);
  };

  // Validation
  const validateStep1 = () => {
    // Required fields: Client Name, Patient ID, Patient Name, Professional Name, Diagnosis
    if (!formData.clientName) return "Client Information: Client Name is required.";
    if (!formData.patientId) return "Patient Information: Patient ID is required.";
    if (!formData.patientName) return "Patient Information: Patient Name is required.";
    if (!formData.professionalName) return "Provider Information: Healthcare Professional Name is required.";
    if (!formData.diagnosisHistory) return "Diagnosis: Clinical History is required.";
    
    // Check if at least one specimen type is selected
    const hasSpecimenType = specimens.some(s => s.type !== '');
    if (!hasSpecimenType) return "Specimens: Please select at least one specimen type.";

    return null; // Valid
  };

  const validateStep2 = () => {
    // Check if at least one test is selected
    const hasTest = Object.values(formData.selectedTests).some(val => val === true);
    if (!hasTest) return "Please select at least one test from the menu.";
    return null;
  };

  const validateStep3 = () => {
    if (!formData.orderingPhysicianSignature) return "Physician signature is required.";
    if (!formData.orderingPhysicianDate) return "Physician date is required.";
    if (!formData.patientSignature) return "Patient/Proxy signature is required.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateStep3();
    if (error) {
        setFormError(error);
        return;
    }

    setFormError(null);
    setLoading(true);

    const fullData = {
        ...formData,
        specimens,
        prescriptionFile: prescriptionFile ? { name: prescriptionFile.name, data: "BASE64_CONTENT_TRUNCATED_FOR_LOG" } : null,
        timestamp: new Date().toISOString()
    };

    /**
     * GOOGLE APPS SCRIPT INTEGRATION INSTRUCTIONS:
     * 1. Create a Google Sheet.
     * 2. Extensions > Apps Script.
     * 3. Use the following doPost(e) logic in Apps Script:
     * 
     * function doPost(e) {
     *   var lock = LockService.getScriptLock();
     *   lock.tryLock(10000);
     *   
     *   try {
     *     var doc = SpreadsheetApp.openById('YOUR_SHEET_ID');
     *     var sheet = doc.getSheetByName('Requests');
     *     var data = JSON.parse(e.postData.contents);
     *     
     *     // Save to sheet
     *     sheet.appendRow([new Date(), data.clientName, data.patientName, JSON.stringify(data.selectedTests)]);
     *     
     *     // Send Email
     *     MailApp.sendEmail({
     *       to: "shibi.kannan@gmail.com",
     *       subject: "New Test Request - " + data.patientName,
     *       htmlBody: "New request received. <br>Client: " + data.clientName
     *     });
     *     
     *     return ContentService.createTextOutput(JSON.stringify({result: 'success'})).setMimeType(ContentService.MimeType.JSON);
     *   } catch(e) {
     *     return ContentService.createTextOutput(JSON.stringify({result: 'error', error: e})).setMimeType(ContentService.MimeType.JSON);
     *   } finally {
     *     lock.releaseLock();
     *   }
     * }
     */
    
    // Replace this URL with your deployed Web App URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx_placeholder_for_your_script_id/exec'; 

    try {
      // Simulation of API call
      // const response = await fetch(GOOGLE_SCRIPT_URL, {
      //   method: 'POST',
      //   body: JSON.stringify(fullData)
      // });
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Submission Payload:', fullData);
      
      // Show success UI
      setShowSuccess(true);
      window.scrollTo(0, 0);

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const specimenTypes = [
    'Blood', 'Bone Marrow', 'Fixed Cells', 'Cultured Cells', 'DNA', 'Lymph Node', 'Spleen', 
    'Paraffin Block', 'Slides', 'Tissue', 'Other'
  ];

  const nextStep = () => {
    let error = null;
    if (currentStep === 1) error = validateStep1();
    if (currentStep === 2) error = validateStep2();

    if (error) {
        setFormError(error);
        return;
    }

    setFormError(null);
    window.scrollTo(0, 0);
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setFormError(null);
    window.scrollTo(0, 0);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Data for Page 2
  const testSections = [
    {
      title: "PD-L1 Immunohistochemical Stains",
      items: [
        { id: "22C3", label: "22C3", desc: "Programmed Death-Ligand 1 (PD-L1) (22C3), Semi-Quantitative Immunohistochemistry, Manual" },
        { id: "28P8", label: "28P8", desc: "Programmed Death-Ligand 1 (PD-L1) (28-8), Semi-Quantitative Immunohistochemistry, Manual" },
        { id: "SP142", label: "SP142", desc: "Programmed Death-Ligand 1 (PD-L1) (SP142), Semi-Quantitative Immunohistochemistry, Manual" },
        { id: "SP263", label: "SP263", desc: "Programmed Death-Ligand 1 (PD-L1) (SP263), Semi-Quantitative Immunohistochemistry, Manual" }
      ]
    },
    {
      title: "Microsatellite Instability (MSI) / Mismatch Repair",
      items: [
        { id: "MSI", label: "MSI", desc: "Microsatellite Instability, Tumor, Sanger Sequencing" },
        { id: "IHC", label: "IHC", desc: "Mismatch Repair (MMR) Protein Immunohistochemistry Only, Tumor" }
      ]
    },
    {
      title: "Pan-Cancer Biomarkers",
      items: [
        { id: "NTRKfusion", label: "NTRKfusion", desc: "NTRK Gene Fusion Panel, NGS, Tumor" },
        { id: "NTRKmut", label: "NTRKmut", desc: "NTRK Gene Mutation Analysis, NGS, Tumor" },
        { id: "BRAFmut", label: "BRAFmut", desc: "BRAF V600E/V600K Somatic Mutation Analysis, Tumor" }
      ]
    },
    {
      title: "NGS Panels – FathomDx",
      items: [
        { id: "FBPC", label: "FBPC", desc: "FathomDx Bladder and Prostate Cancer Panel, NGS, Tumor" },
        { id: "FCRC", label: "FCRC", desc: "FathomDx Colorectal Cancer Panel, NGS, Tumor" },
        { id: "FSRC", label: "FSRC", desc: "FathomDx Comprehensive Sarcoma Panel, NGS, Tumor" },
        { id: "FECP", label: "FECP", desc: "FathomDx Endometrial Carcinoma Panel, NGS, Tumor" },
        { id: "FGST", label: "FGST", desc: "FathomDx Gastrointestinal Stromal Tumor (GIST) Panel, NGS, Tumor" },
        { id: "FGYN", label: "FGYN", desc: "FathomDx Gynecological Cancer Panel, NGS, Tumor" },
        { id: "FKCP", label: "FKCP", desc: "FathomDx Kidney Cancer Panel, NGS, Tumor" },
        { id: "FLNG", label: "FLNG", desc: "FathomDx Lung Cancer–Targeted Gene Panel with Rearrangement, Tumor" },
        { id: "FMLN", label: "FMLN", desc: "FathomDx Melanoma Panel, NGS, Tumor" },
        { id: "FSTP", label: "FSTP", desc: "FathomDx Solid Tumor Panel, NGS, Tumor" }
      ]
    },
    {
      title: "Specialty Tumor Panels",
      items: [
        { id: "FNEURO", label: "FNEURO", desc: "FathomDx Neuro-Oncology Expanded Gene Panel with Rearrangement, Tumor" },
        { id: "FOFP", label: "FOFP", desc: "FathomDx Ovarian, Fallopian Tube, and Peritoneal Cancer Panel, NGS, Tumor" },
        { id: "FRCCFS", label: "FRCCFS", desc: "FathomDx Renal Cell Carcinoma with Fibromyxomatous Stroma Panel, NGS, Tumor" },
        { id: "FSARC", label: "FSARC", desc: "FathomDx Sarcoma Targeted Gene Fusion / Rearrangement Panel, NGS, Tumor" }
      ]
    },
    {
      title: "Chromosomal Microarray",
      items: [
        { id: "CMAPT", label: "CMAPT", desc: "Chromosomal Microarray, Tumor, Formalin-Fixed Paraffin-Embedded (FFPE)" }
      ]
    },
    {
      title: "Cell-Free DNA (cfDNA) Testing",
      items: [
        { id: "BRAF_LB", label: "BRAF liquid biopsy", desc: "Cell-Free DNA BRAF V600 Mutation Analysis, NGS, Blood, Cell-Free DNA" },
        { id: "T790M_LB", label: "T790M liquid biopsy", desc: "Cell-Free DNA EGFR T790M Mutation Analysis, NGS, Blood, Cell-Free DNA" },
        { id: "KRAS_LB", label: "KRAS liquid biopsy", desc: "Cell-Free DNA KRAS 12, 13, 61, 146 Mutation Analysis, NGS, Blood, Cell-Free DNA" },
        { id: "FCLBP", label: "FCLBP", desc: "FathomDx Comprehensive Liquid Biopsy Panel, NGS, Blood, Cell-Free DNA" }
      ],
      note: "Sample Requirement: Blood samples should be collected in Streck tubes or equivalent cfDNA stabilisation tubes."
    }
  ];

  if (showSuccess) {
      return (
        <div className="bg-slate-50 dark:bg-background-dark min-h-screen font-sans flex items-center justify-center p-4">
            <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 max-w-lg w-full text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-green-600 text-3xl">check_circle</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Request Submitted!</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Thank you. The test request for <strong>{formData.patientName}</strong> has been successfully recorded and sent to our laboratory team.
                </p>
                <div className="flex flex-col gap-3">
                    <Button 
                        onClick={() => window.location.reload()} 
                        className="w-full bg-primary hover:bg-primary-dark text-white"
                    >
                        Submit Another Request
                    </Button>
                    <Button 
                        variant="outline"
                        onClick={() => navigate('/')} 
                        className="w-full"
                    >
                        Return Home
                    </Button>
                </div>
            </div>
        </div>
      )
  }

  return (
    <div className="bg-slate-50 dark:bg-background-dark min-h-screen font-sans">
      <GlobalHeader title="Oncology Test Request" />
      
      <main className="max-w-5xl mx-auto p-4 md:p-8 pb-40">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* ==================== PAGE 1 ==================== */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              {/* Row 1: Client & Patient Information */}
              <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 border-b pb-2 border-slate-100 dark:border-slate-700">Client & Patient Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Client Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-primary uppercase text-xs tracking-wider">Client Information <span className="text-red-500">*</span></h3>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Client Name <span className="text-red-500">*</span></label>
                        <input type="text" name="clientName" value={formData.clientName} onChange={handleInputChange} className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm focus:ring-primary focus:border-primary" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Client Account No.</label>
                        <input type="text" name="clientAccountNo" value={formData.clientAccountNo} onChange={handleInputChange} className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Client Phone</label>
                          <input type="tel" name="clientPhone" value={formData.clientPhone} onChange={handleInputChange} className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Client Order No.</label>
                          <input type="text" name="clientOrderNo" value={formData.clientOrderNo} onChange={handleInputChange} className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Street Address</label>
                        <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleInputChange} className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm" />
                      </div>
                      <div className="grid grid-cols-6 gap-3">
                        <div className="col-span-3">
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">City</label>
                          <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm" />
                        </div>
                        <div className="col-span-1">
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">State</label>
                          <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm" />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">ZIP</label>
                          <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Patient Information */}
                  <div className="space-y-4 md:border-l md:pl-8 border-slate-100 dark:border-slate-700">
                    <h3 className="font-semibold text-primary uppercase text-xs tracking-wider">Patient Information <span className="text-red-500">*</span></h3>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Patient ID (MRN) <span className="text-red-500">*</span></label>
                        <input type="text" name="patientId" value={formData.patientId} onChange={handleInputChange} className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Patient Name (Last, First Middle) <span className="text-red-500">*</span></label>
                        <input type="text" name="patientName" value={formData.patientName} onChange={handleInputChange} className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm" required />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Sex</label>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                              <input type="radio" name="sex" value="Male" checked={formData.sex === 'Male'} onChange={handleInputChange} className="text-primary focus:ring-primary" />
                              Male
                            </label>
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                              <input type="radio" name="sex" value="Female" checked={formData.sex === 'Female'} onChange={handleInputChange} className="text-primary focus:ring-primary" />
                              Female
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Birth Date</label>
                          <input type="date" name="birthDate" value={formData.birthDate} onChange={handleInputChange} className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Collection Date</label>
                          <input type="date" name="collectionDate" value={formData.collectionDate} onChange={handleInputChange} className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm" />
                        </div>
                         <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Time</label>
                          <div className="flex gap-2">
                             <input type="time" name="collectionTime" value={formData.collectionTime} onChange={handleInputChange} className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm" />
                             <select name="collectionAmPm" value={formData.collectionAmPm} onChange={handleInputChange} className="rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm">
                               <option value="am">AM</option>
                               <option value="pm">PM</option>
                             </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Provider Information */}
              <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                 <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 border-b pb-2 border-slate-100 dark:border-slate-700">Provider Information</h2>
                 
                 <div className="grid grid-cols-1 gap-6">
                    {/* Healthcare Professional */}
                    <div>
                       <h3 className="font-semibold text-primary uppercase text-xs tracking-wider mb-3">Submitting Healthcare Professional <span className="text-red-500">*</span></h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name (Last, First) <span className="text-red-500">*</span></label>
                            <input type="text" name="professionalName" value={formData.professionalName} onChange={handleInputChange} className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm" required />
                          </div>
                          
                          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg md:col-span-2 border border-slate-100 dark:border-slate-800">
                             <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Contact Details</h4>
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Work Contact No</label>
                                    <input type="tel" name="profWorkPhone" value={formData.profWorkPhone} onChange={handleInputChange} className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Personal Phone No</label>
                                    <input type="tel" name="profPersonalPhone" value={formData.profPersonalPhone} onChange={handleInputChange} className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Registration Number</label>
                                    <input type="text" name="profRegNumber" value={formData.profRegNumber} onChange={handleInputChange} className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm" />
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Row 3: Clinical Summary */}
              <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-800/30 shadow-sm">
                 <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Clinical Summary</h2>
                 <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">Please provide a brief clinical history, pertinent results, and reason for testing.</p>
                 <textarea 
                    name="clinicalSummary" 
                    rows={4} 
                    value={formData.clinicalSummary}
                    onChange={handleInputChange}
                    className="w-full rounded-md border-blue-200 dark:border-blue-800 dark:bg-slate-800 p-3 text-sm focus:ring-primary focus:border-primary"
                    placeholder="Enter clinical details..."
                 ></textarea>
              </div>

              {/* Row 4: Specimens Provided */}
              <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-center mb-4 border-b pb-2 border-slate-100 dark:border-slate-700">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Specimens Provided <span className="text-red-500">*</span></h2>
                    <Button type="button" onClick={addSpecimenRow} size="sm" className="bg-primary hover:bg-primary-dark text-white gap-1 h-8">
                        <span className="material-symbols-outlined text-sm">add</span> Add Row
                    </Button>
                </div>
                
                <div className="space-y-4">
                    {specimens.map((row, index) => (
                        <div key={row.id} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700 relative group transition-all">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-xs font-bold text-slate-400 uppercase">Specimen {index + 1}</span>
                                <button type="button" onClick={() => removeSpecimenRow(row.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                                    <span className="material-symbols-outlined text-sm">close</span>
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Type <span className="text-red-500">*</span></label>
                                    <select 
                                        value={row.type} 
                                        onChange={(e) => updateSpecimenRow(row.id, 'type', e.target.value)}
                                        className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm"
                                    >
                                        <option value="">Select Type</option>
                                        {specimenTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>

                                {/* Tissue Layout */}
                                {row.type === 'Tissue' && (
                                    <div className="md:col-span-3 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 min-w-fit">No. sent:</label>
                                            <input 
                                                type="number"
                                                min="0"
                                                value={row.count} 
                                                onChange={(e) => updateSpecimenRow(row.id, 'count', e.target.value)}
                                                onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                                                className="w-24 rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm bg-blue-50/50 dark:bg-blue-900/20" 
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-1">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input 
                                                  type="radio" 
                                                  name={`tissue-fixative-${row.id}`}
                                                  checked={row.tissueFixative === 'frozen'} 
                                                  onChange={() => updateSpecimenRow(row.id, 'tissueFixative', 'frozen')} 
                                                  className="text-primary focus:ring-primary" 
                                                />
                                                <span className="text-sm text-slate-600 dark:text-slate-300">Frozen</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input 
                                                  type="radio" 
                                                  name={`tissue-fixative-${row.id}`}
                                                  checked={row.tissueFixative === 'fixed'} 
                                                  onChange={() => updateSpecimenRow(row.id, 'tissueFixative', 'fixed')} 
                                                  className="text-primary focus:ring-primary" 
                                                />
                                                <span className="text-sm text-slate-600 dark:text-slate-300">Fixed formalin</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input 
                                                  type="radio" 
                                                  name={`tissue-fixative-${row.id}`}
                                                  checked={row.tissueFixative === 'wet'} 
                                                  onChange={() => updateSpecimenRow(row.id, 'tissueFixative', 'wet')} 
                                                  className="text-primary focus:ring-primary" 
                                                />
                                                <span className="text-sm text-slate-600 dark:text-slate-300">Wet tissue</span>
                                            </label>
                                        </div>
                                        <div className="pt-1">
                                            <label className="flex items-start gap-2 cursor-pointer">
                                                <input 
                                                  type="radio" 
                                                  name={`tissue-fixative-${row.id}`}
                                                  checked={row.tissueFixative === 'other'} 
                                                  onChange={() => updateSpecimenRow(row.id, 'tissueFixative', 'other')} 
                                                  className="text-primary focus:ring-primary mt-1" 
                                                />
                                                <div className="flex-1">
                                                    <span className="text-sm text-slate-600 dark:text-slate-300">Other fixative</span>
                                                    {row.tissueFixative === 'other' && (
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <span className="text-xs text-slate-500 font-medium">Type:</span>
                                                            <input 
                                                                type="text" 
                                                                value={row.tissueOtherType} 
                                                                onChange={(e) => updateSpecimenRow(row.id, 'tissueOtherType', e.target.value)}
                                                                className="flex-1 rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm bg-blue-50/50 dark:bg-blue-900/20" 
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {/* Paraffin Block Layout */}
                                {row.type === 'Paraffin Block' && (
                                    <div className="md:col-span-3 space-y-4">
                                         <div className="flex items-center gap-3">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 min-w-fit">No. sent:</label>
                                            <input 
                                                type="number"
                                                min="0"
                                                value={row.count} 
                                                onChange={(e) => updateSpecimenRow(row.id, 'count', e.target.value)}
                                                onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                                                className="w-24 rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm bg-blue-50/50 dark:bg-blue-900/20" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Indicate source:</label>
                                            <textarea 
                                                rows={2}
                                                value={row.source}
                                                onChange={(e) => updateSpecimenRow(row.id, 'source', e.target.value)}
                                                className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm bg-blue-50/50 dark:bg-blue-900/20 resize-none"
                                            ></textarea>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Slides Layout */}
                                {row.type === 'Slides' && (
                                    <div className="md:col-span-3">
                                         <div className="flex items-center gap-3">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 min-w-fit">No. sent:</label>
                                            <input 
                                                type="number"
                                                min="0"
                                                value={row.count} 
                                                onChange={(e) => updateSpecimenRow(row.id, 'count', e.target.value)}
                                                onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                                                className="w-24 rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm bg-blue-50/50 dark:bg-blue-900/20" 
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Other Layout */}
                                {row.type === 'Other' && (
                                    <div className="md:col-span-3">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Anatomic site:</label>
                                        <input 
                                            type="text" 
                                            value={row.anatomicSite} 
                                            onChange={(e) => updateSpecimenRow(row.id, 'anatomicSite', e.target.value)}
                                            className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm bg-blue-50/50 dark:bg-blue-900/20" 
                                        />
                                    </div>
                                )}

                                {/* Default Fallback for other simple types if necessary */}
                                {['Blood', 'Bone Marrow', 'Fixed Cells', 'Cultured Cells', 'DNA', 'Lymph Node', 'Spleen'].includes(row.type) && (
                                    <div className="md:col-span-3">
                                        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Comments / Details</label>
                                        <input 
                                            type="text" 
                                            value={row.comments} 
                                            onChange={(e) => updateSpecimenRow(row.id, 'comments', e.target.value)}
                                            className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm" 
                                            placeholder="Add description..."
                                        />
                                    </div>
                                )}

                            </div>
                        </div>
                    ))}
                </div>
              </div>

              {/* Row 5: Diagnosis */}
              <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                 <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 border-b pb-2 border-slate-100 dark:border-slate-700">Diagnosis</h2>
                 
                 <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-primary uppercase text-xs tracking-wider mb-2">Pathologist/Clinical Diagnosis <span className="text-red-500">*</span></h3>
                        <p className="text-xs text-slate-500 mb-2">Include a brief history, pertinent laboratory results, suspected diagnosis, and reason for referral.</p>
                        <textarea 
                            name="diagnosisHistory" 
                            rows={6} 
                            value={formData.diagnosisHistory}
                            onChange={handleInputChange}
                            className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-3 text-sm focus:ring-primary focus:border-primary"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Upload Prescription / Report (PDF only)</label>
                        <div className="flex items-center gap-4">
                            <label className="cursor-pointer bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 transition-colors text-sm font-medium">
                                <input 
                                    type="file" 
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                    className="hidden" 
                                />
                                <span className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">upload_file</span>
                                    Choose File
                                </span>
                            </label>
                            {prescriptionFile ? (
                                <span className="text-sm text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[18px]">check</span>
                                    {prescriptionFile.name}
                                </span>
                            ) : (
                                <span className="text-sm text-slate-400 italic">No file chosen</span>
                            )}
                        </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* ==================== PAGE 2 ==================== */}
          {currentStep === 2 && (
             <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white uppercase">FEATURED ONCOLOGY TESTING – FathomDx</h2>
                        <p className="text-sm text-slate-500 mt-1">Select all applicable tests for this request. <span className="text-red-500 font-bold">* Required</span></p>
                    </div>

                    <div className="space-y-8">
                        {testSections.map((section, idx) => (
                            <div key={idx} className="break-inside-avoid">
                                <h3 className="text-base font-bold text-primary dark:text-blue-400 mb-3 uppercase tracking-wide border-l-4 border-primary pl-3 bg-slate-50 dark:bg-slate-800/50 py-1">
                                    {section.title}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {section.items.map((test) => (
                                        <label key={test.id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 ${formData.selectedTests[test.id] ? 'border-primary bg-blue-50/50 dark:border-primary/50 dark:bg-blue-900/10' : 'border-slate-200 dark:border-slate-700'}`}>
                                            <input 
                                                type="checkbox" 
                                                checked={!!formData.selectedTests[test.id]} 
                                                onChange={() => handleTestSelection(test.id)}
                                                className="mt-1 rounded border-slate-300 text-primary focus:ring-primary"
                                            />
                                            <div>
                                                <span className="block font-bold text-sm text-slate-900 dark:text-white">{test.label}</span>
                                                <span className="block text-xs text-slate-500 dark:text-slate-400 leading-snug mt-0.5">{test.desc}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {/* Special note for Liquid Biopsy */}
                                {section.note && (
                                    <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/30 rounded-lg text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">info</span>
                                        {section.note}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
             </div>
          )}

          {/* ==================== PAGE 3 (CONSENT) ==================== */}
          {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-8">
                    <div className="mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white uppercase">Informed Consent</h2>
                        <p className="text-sm text-slate-500 mt-1">Certification by Healthcare Provider and Patient Consent</p>
                    </div>

                    {/* Section 1: Provider */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                        <h3 className="text-md font-bold text-slate-900 dark:text-white mb-3">1. Ordering Physician/Clinician Certification</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                            I certify that the patient has given informed consent for hereditary and/or somatic genetic testing. I certify that the ordered test(s) is/are medically necessary for the diagnosis, treatment, or management of the patient's condition.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Physician Signature (Type Name) <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    name="orderingPhysicianSignature" 
                                    value={formData.orderingPhysicianSignature} 
                                    onChange={handleInputChange} 
                                    placeholder="Dr. Name Surname"
                                    className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm bg-white dark:bg-black/20" 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date <span className="text-red-500">*</span></label>
                                <input 
                                    type="date" 
                                    name="orderingPhysicianDate" 
                                    value={formData.orderingPhysicianDate} 
                                    onChange={handleInputChange} 
                                    className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm bg-white dark:bg-black/20" 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Patient */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                         <h3 className="text-md font-bold text-slate-900 dark:text-white mb-3">2. Patient Informed Consent</h3>
                         <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                             I authorize Oncophenomics and its designated laboratory partners to perform the testing specified. I understand that my specimen and clinical information will be used for genetic analysis.
                         </p>
                         
                         {/* Disclaimer */}
                         <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 text-xs text-slate-600 dark:text-slate-300 italic">
                             <strong>Data Usage Disclaimer:</strong> De-identified samples and data may be used for internal quality control, validation, and research purposes to advance cancer diagnostics. No personally identifiable information will be shared in these activities.
                         </div>

                         <div className="grid grid-cols-1 gap-4">
                             <div>
                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Signature of Patient or Authorized Proxy <span className="text-red-500">*</span></label>
                                 <input 
                                     type="text" 
                                     name="patientSignature" 
                                     value={formData.patientSignature} 
                                     onChange={handleInputChange} 
                                     placeholder="Sign here (Type Name)"
                                     className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm bg-white dark:bg-black/20" 
                                     required 
                                 />
                             </div>
                             
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
                                    <input 
                                        type="date" 
                                        name="patientDate" 
                                        value={formData.patientDate} 
                                        onChange={handleInputChange} 
                                        className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm bg-white dark:bg-black/20" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Relationship to Patient</label>
                                    <select 
                                        name="patientRelation" 
                                        value={formData.patientRelation} 
                                        onChange={handleInputChange} 
                                        className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm bg-white dark:bg-black/20"
                                    >
                                        <option value="Self">Self</option>
                                        <option value="Parent">Parent</option>
                                        <option value="Legal Guardian">Legal Guardian</option>
                                        <option value="Power of Attorney">Power of Attorney</option>
                                    </select>
                                </div>
                             </div>

                             {formData.patientRelation !== 'Self' && (
                                 <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name of Authorized Representative</label>
                                    <input 
                                        type="text" 
                                        name="proxyName" 
                                        value={formData.proxyName} 
                                        onChange={handleInputChange} 
                                        className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 p-2 text-sm bg-white dark:bg-black/20" 
                                    />
                                 </div>
                             )}
                         </div>
                    </div>
                </div>
            </div>
          )}

          {/* Sticky Navigation Footer */}
          <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 z-40 md:static md:bg-transparent md:border-none md:p-0">
             
             {/* Error Message Display */}
             {formError && (
                 <div className="w-full bg-red-100 dark:bg-red-900/50 border-t border-b border-red-200 dark:border-red-800 py-2 px-4 animate-in slide-in-from-bottom-2">
                     <div className="max-w-5xl mx-auto flex items-center justify-center md:justify-start gap-2 text-red-700 dark:text-red-200 text-sm font-bold">
                         <span className="material-symbols-outlined text-lg">warning</span>
                         {formError}
                     </div>
                 </div>
             )}

             <div className="max-w-5xl mx-auto flex items-center justify-between p-4 md:p-0 md:py-4">
                {/* Page Indicator */}
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Page <span className="text-slate-900 dark:text-white font-bold">{currentStep}</span> of {totalSteps}
                </div>

                <div className="flex gap-3">
                    {currentStep > 1 && (
                        <Button 
                            type="button" 
                            variant="outline"
                            onClick={prevStep}
                            className="gap-2"
                        >
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Back
                        </Button>
                    )}
                    
                    {currentStep < totalSteps ? (
                        <Button 
                            type="button" 
                            onClick={nextStep}
                            className="bg-primary hover:bg-primary-dark text-white gap-2"
                        >
                            Next
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Button>
                    ) : (
                        <Button 
                            type="submit" 
                            disabled={loading}
                            className="bg-green-600 hover:bg-green-700 text-white gap-2 shadow-lg shadow-green-900/20"
                        >
                            {loading ? 'Submitting...' : 'Agree & Submit'}
                            <span className="material-symbols-outlined text-sm">check_circle</span>
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