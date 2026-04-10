
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../components/GlobalHeader';
import { Button } from '../components/ui/button';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Admin email for notifications (Firebase Extension will send to this address)
const ADMIN_EMAIL = 'shibi.kannan@gmail.com';

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

// Validation patterns - allow alphanumeric for most fields
const patterns = {
  text: /^[a-zA-Z0-9\s.,'&()#@\-_]{2,100}$/,
  patientId: /^[a-zA-Z0-9\-_#]{2,50}$/,
  accountNo: /^[a-zA-Z0-9\-_#]{0,50}$/,
  signature: /^[a-zA-Z\s.'-]{2,100}$/,
};

const TestRequestForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const totalSteps = 3;

  // Get current date/time for display
  const now = new Date();
  const orderDate = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const orderTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

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
    // Client Name validation
    if (!formData.clientName) return "Client/Hospital Name is required.";
    if (formData.clientName.length < 2 || formData.clientName.length > 100) {
      return "Client Name must be between 2-100 characters.";
    }

    // Patient ID validation
    if (!formData.patientId) return "Patient ID/MRN is required.";
    if (!patterns.patientId.test(formData.patientId)) {
      return "Patient ID must be 2-50 alphanumeric characters.";
    }

    // Patient Name validation
    if (!formData.patientName) return "Patient Name is required.";
    if (formData.patientName.length < 2 || formData.patientName.length > 100) {
      return "Patient Name must be between 2-100 characters.";
    }

    // Ordering Physician validation
    if (!formData.professionalName) return "Ordering Physician Name is required.";
    if (formData.professionalName.length < 2 || formData.professionalName.length > 100) {
      return "Physician Name must be between 2-100 characters.";
    }

    // Diagnosis history validation
    if (!formData.diagnosisHistory) return "Clinical history/diagnosis is required.";
    if (formData.diagnosisHistory.length < 10) {
      return "Please provide more details in clinical history (min 10 characters).";
    }
    if (formData.diagnosisHistory.length > 2000) {
      return "Clinical history is too long (max 2000 characters).";
    }

    // Specimen validation
    if (specimens.some(s => !s.type)) return "Please specify all specimen types.";

    return null;
  };

  const validateStep2 = () => {
    const hasTest = Object.values(formData.selectedTests).some(val => val === true);
    if (!hasTest) return "Please select at least one test.";
    return null;
  };

  const validateStep3 = () => {
    // Physician signature validation
    if (!formData.orderingPhysicianSignature) return "Physician signature is required.";
    if (formData.orderingPhysicianSignature.length < 2) {
      return "Please enter a valid signature (min 2 characters).";
    }

    // Patient signature validation
    if (!formData.patientSignature) return "Patient/Proxy signature is required.";
    if (formData.patientSignature.length < 2) {
      return "Please enter a valid signature (min 2 characters).";
    }

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
        orderDate: orderDate,
        orderTime: orderTime,
        status: "pending_accession",
        createdAt: serverTimestamp()
      });

      // Race the submission against the timeout
      const docRef = await Promise.race([submitPromise, timeoutPromise]);
      const docId = (docRef as any).id;

      console.log('Diagnostic Request Secured with ID:', docId);

      // Get selected test names for email
      const selectedTestNames = testSections.flatMap(sec =>
        sec.items
          .filter(item => formData.selectedTests[item.id])
          .map(item => `- ${item.label}: ${item.desc}`)
      );

      // Format specimens for email
      const specimenDetails = specimens
        .filter(s => s.type)
        .map((s, i) => `${i + 1}. ${s.type}${s.source ? ` (Collected: ${s.source})` : ''}${s.comments ? ` - ${s.comments}` : ''}`)
        .join('\n');

      // Create email document for Firebase Trigger Email extension
      // This writes to the 'mail' collection which the extension monitors
      try {
        await addDoc(collection(db, "mail"), {
          to: [ADMIN_EMAIL],
          message: {
            subject: `New Test Request: ${formData.patientName} (${formData.patientId})`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #3b82f6, #06b6d4); padding: 20px; border-radius: 8px 8px 0 0;">
                  <h1 style="color: white; margin: 0;">New Test Request Submitted</h1>
                  <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Oncophenomics Cloud Diagnostic Portal</p>
                </div>

                <div style="padding: 20px; background: #f8fafc; border: 1px solid #e2e8f0;">
                  <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <h2 style="color: #1e293b; margin: 0 0 10px 0; font-size: 16px; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">Order Details</h2>
                    <p style="margin: 5px 0;"><strong>Document ID:</strong> ${docId}</p>
                    <p style="margin: 5px 0;"><strong>Order Date:</strong> ${orderDate} at ${orderTime}</p>
                    <p style="margin: 5px 0;"><strong>Status:</strong> Pending Accession</p>
                  </div>

                  <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <h2 style="color: #1e293b; margin: 0 0 10px 0; font-size: 16px; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">Patient Information</h2>
                    <p style="margin: 5px 0;"><strong>Name:</strong> ${formData.patientName || 'N/A'}</p>
                    <p style="margin: 5px 0;"><strong>MRN/ID:</strong> ${formData.patientId || 'N/A'}</p>
                    <p style="margin: 5px 0;"><strong>Sex:</strong> ${formData.sex || 'N/A'}</p>
                    <p style="margin: 5px 0;"><strong>DOB:</strong> ${formData.birthDate || 'N/A'}</p>
                  </div>

                  <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <h2 style="color: #1e293b; margin: 0 0 10px 0; font-size: 16px; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">Client/Hospital</h2>
                    <p style="margin: 5px 0;"><strong>Name:</strong> ${formData.clientName || 'N/A'}</p>
                    <p style="margin: 5px 0;"><strong>Account #:</strong> ${formData.clientAccountNo || 'N/A'}</p>
                  </div>

                  <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <h2 style="color: #1e293b; margin: 0 0 10px 0; font-size: 16px; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">Ordering Physician</h2>
                    <p style="margin: 5px 0;"><strong>Name:</strong> ${formData.professionalName || 'N/A'}</p>
                    <p style="margin: 5px 0;"><strong>Registration #:</strong> ${formData.profRegNumber || 'N/A'}</p>
                    <p style="margin: 5px 0;"><strong>Phone:</strong> ${formData.profWorkPhone || formData.profPersonalPhone || 'N/A'}</p>
                  </div>

                  <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <h2 style="color: #1e293b; margin: 0 0 10px 0; font-size: 16px; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">Selected Tests (${selectedTestNames.length})</h2>
                    <pre style="margin: 5px 0; white-space: pre-wrap; font-family: Arial, sans-serif; font-size: 13px; color: #475569;">${selectedTestNames.join('\n') || 'No tests selected'}</pre>
                  </div>

                  <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <h2 style="color: #1e293b; margin: 0 0 10px 0; font-size: 16px; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">Specimens</h2>
                    <pre style="margin: 5px 0; white-space: pre-wrap; font-family: Arial, sans-serif; font-size: 13px; color: #475569;">${specimenDetails || 'No specimens listed'}</pre>
                  </div>

                  <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <h2 style="color: #1e293b; margin: 0 0 10px 0; font-size: 16px; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">Clinical History</h2>
                    <p style="margin: 5px 0; color: #475569;">${formData.diagnosisHistory || 'N/A'}</p>
                  </div>

                  <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <h2 style="color: #1e293b; margin: 0 0 10px 0; font-size: 16px; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">Signatures</h2>
                    <p style="margin: 5px 0;"><strong>Physician:</strong> ${formData.orderingPhysicianSignature || 'N/A'}</p>
                    <p style="margin: 5px 0;"><strong>Patient/Proxy:</strong> ${formData.patientSignature || 'N/A'} (${formData.patientRelation || 'Self'})</p>
                  </div>

                  ${prescriptionFile ? `
                  <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border: 1px solid #f59e0b;">
                    <p style="margin: 0; color: #92400e;"><strong>Attachment:</strong> ${prescriptionFile.name} (stored in Firestore)</p>
                  </div>
                  ` : ''}
                </div>

                <div style="background: #1e293b; padding: 15px; border-radius: 0 0 8px 8px; text-align: center;">
                  <p style="color: #94a3b8; margin: 0; font-size: 12px;">This is an automated notification from Oncophenomics AI</p>
                  <p style="color: #64748b; margin: 5px 0 0 0; font-size: 11px;">Turnaround Time: 3-4 weeks</p>
                </div>
              </div>
            `,
            text: `
New Test Request Submitted
===========================

Order Details:
- Document ID: ${docId}
- Order Date: ${orderDate} at ${orderTime}
- Status: Pending Accession

Patient Information:
- Name: ${formData.patientName || 'N/A'}
- MRN/ID: ${formData.patientId || 'N/A'}
- Sex: ${formData.sex || 'N/A'}
- DOB: ${formData.birthDate || 'N/A'}

Client/Hospital:
- Name: ${formData.clientName || 'N/A'}
- Account #: ${formData.clientAccountNo || 'N/A'}

Ordering Physician:
- Name: ${formData.professionalName || 'N/A'}
- Registration #: ${formData.profRegNumber || 'N/A'}
- Phone: ${formData.profWorkPhone || formData.profPersonalPhone || 'N/A'}

Selected Tests (${selectedTestNames.length}):
${selectedTestNames.join('\n') || 'No tests selected'}

Specimens:
${specimenDetails || 'No specimens listed'}

Clinical History:
${formData.diagnosisHistory || 'N/A'}

Signatures:
- Physician: ${formData.orderingPhysicianSignature || 'N/A'}
- Patient/Proxy: ${formData.patientSignature || 'N/A'} (${formData.patientRelation || 'Self'})

${prescriptionFile ? `Attachment: ${prescriptionFile.name} (stored in Firestore)` : ''}

---
Oncophenomics AI - Precision Oncology Platform
Turnaround Time: 3-4 weeks
            `.trim()
          },
          createdAt: serverTimestamp()
        });
        console.log('Email notification queued for Firebase extension');
      } catch (emailErr) {
        // Don't fail the form submission if email queueing fails
        console.error('Failed to queue email notification:', emailErr);
      }

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
    {
      title: "PD-L1 Immunohistochemical Stains",
      items: [
        { id: "22C3", label: "22C3", desc: "Programmed Death-Ligand 1 (PD-L1) (22C3), Semi-Quantitative IHC" },
        { id: "28P8", label: "28P8", desc: "Programmed Death-Ligand 1 (PD-L1) (28-8), Semi-Quantitative IHC" },
        { id: "SP142", label: "SP142", desc: "Programmed Death-Ligand 1 (PD-L1) (SP142), Semi-Quantitative IHC" },
        { id: "SP263", label: "SP263", desc: "Programmed Death-Ligand 1 (PD-L1) (SP263), Semi-Quantitative IHC" }
      ]
    },
    {
      title: "Microsatellite Instability (MSI) / Mismatch Repair",
      items: [
        { id: "MSI", label: "MSI", desc: "Microsatellite Instability, Tumor, Sanger Sequencing" },
        { id: "IHC_MMR", label: "MMR IHC", desc: "Mismatch Repair (MMR) Protein Immunohistochemistry Only, Tumor" }
      ]
    },
    {
      title: "Pan-Cancer Biomarkers",
      items: [
        { id: "NTRKfusion", label: "NTRK Fusion", desc: "NTRK Gene Fusion Panel, NGS, Tumor" },
        { id: "NTRKmut", label: "NTRK Mutation", desc: "NTRK Gene Mutation Analysis, NGS, Tumor" },
        { id: "BRAFmut", label: "BRAF Mutation", desc: "BRAF V600E/V600K Somatic Mutation Analysis, Tumor" }
      ]
    },
    {
      title: "NGS Panels - FathomDx",
      items: [
        { id: "FBPC", label: "FBPC", desc: "FathomDx Bladder and Prostate Cancer Panel, NGS" },
        { id: "FCRC", label: "FCRC", desc: "FathomDx Colorectal Cancer Panel, NGS" },
        { id: "FSRC", label: "FSRC", desc: "FathomDx Comprehensive Sarcoma Panel, NGS" },
        { id: "FECP", label: "FECP", desc: "FathomDx Endometrial Carcinoma Panel, NGS" },
        { id: "FGST", label: "FGST", desc: "FathomDx Gastrointestinal Stromal Tumor (GIST) Panel, NGS" },
        { id: "FGYN", label: "FGYN", desc: "FathomDx Gynecological Cancer Panel, NGS" },
        { id: "FKCP", label: "FKCP", desc: "FathomDx Kidney Cancer Panel, NGS" },
        { id: "FLNG", label: "FLNG", desc: "FathomDx Lung Cancer - Targeted Gene Panel with Rearrangement" },
        { id: "FMLN", label: "FMLN", desc: "FathomDx Melanoma Panel, NGS" },
        { id: "FSTP", label: "FSTP", desc: "FathomDx Solid Tumor Panel, NGS" }
      ]
    },
    {
      title: "Specialty Tumor Panels",
      items: [
        { id: "FNEURO", label: "FNEURO", desc: "FathomDx Neuro-Oncology Expanded Gene Panel with Rearrangement" },
        { id: "FOFP", label: "FOFP", desc: "FathomDx Ovarian, Fallopian Tube, and Peritoneal Cancer Panel" },
        { id: "FRCCFS", label: "FRCCFS", desc: "FathomDx Renal Cell Carcinoma with Fibromyxomatous Stroma Panel" },
        { id: "FSARC", label: "FSARC", desc: "FathomDx Sarcoma Targeted Gene Fusion / Rearrangement Panel" }
      ]
    },
    {
      title: "Chromosomal Microarray",
      items: [
        { id: "CMAPT", label: "CMAPT", desc: "Chromosomal Microarray, Tumor, Formalin-Fixed Paraffin-Embedded (FFPE)" }
      ]
    },
    {
      title: "Cell-Free DNA (cfDNA) / Liquid Biopsy",
      note: "Sample Requirement: Blood samples should be collected in Streck tubes or equivalent cfDNA stabilization tubes.",
      items: [
        { id: "BRAF_LB", label: "BRAF Liquid Biopsy", desc: "Cell-Free DNA BRAF V600 Mutation Analysis, NGS, Blood" },
        { id: "T790M_LB", label: "T790M Liquid Biopsy", desc: "Cell-Free DNA EGFR T790M Mutation Analysis, NGS, Blood" },
        { id: "KRAS_LB", label: "KRAS Liquid Biopsy", desc: "Cell-Free DNA KRAS 12, 13, 61, 146 Mutation Analysis, NGS, Blood" },
        { id: "FCLBP", label: "FCLBP", desc: "FathomDx Comprehensive Liquid Biopsy Panel, NGS, Blood, Cell-Free DNA" }
      ]
    }
  ];

  if (showSuccess) {
    return (
      <div className="bg-slate-50 dark:bg-background-dark min-h-screen flex items-center justify-center p-4 font-display">
        <div className="bg-white dark:bg-surface-dark p-10 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-emerald-600 text-4xl">cloud_done</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Request Secured</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            The test request for <strong>{formData.patientName}</strong> has been archived in our HIPAA-compliant database.
          </p>

          {/* Key details */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 text-left mb-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500 dark:text-slate-400">Ordered on</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{orderDate}, {orderTime}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500 dark:text-slate-400">Patient</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{formData.patientName || '—'}</span>
            </div>
            <div className="flex justify-between items-center border-t border-slate-200 dark:border-slate-700 pt-3">
              <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-amber-500 text-[16px]">schedule</span>
                Turnaround Time
              </span>
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400">3 – 4 weeks</span>
            </div>
          </div>

          {/* What happens next */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 text-left mb-6 space-y-3">
            <p className="text-xs font-bold text-primary uppercase tracking-wider">What happens next</p>
            {[
              { icon: 'call',          text: 'Our team will call to confirm sample collection logistics within 1 business day.' },
              { icon: 'local_shipping',text: 'A sample collection kit or pickup will be arranged at your location.' },
              { icon: 'science',       text: 'Samples are processed in our Hyderabad laboratory and analysed by our AI engine.' },
              { icon: 'description',   text: 'Your clinical report will be delivered securely within 3–4 weeks of sample receipt.' },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[16px] mt-0.5 shrink-0">{step.icon}</span>
                <p className="text-xs text-slate-600 dark:text-slate-400">{step.text}</p>
              </div>
            ))}
          </div>

          <Button onClick={() => navigate('/')} className="w-full h-14 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold mb-3">
            Return to Dashboard
          </Button>
          <button
            onClick={() => { setShowSuccess(false); setCurrentStep(1); setFormData(prev => ({ ...prev, patientName: '', patientId: '', diagnosisHistory: '', selectedTests: {}, orderingPhysicianSignature: '', patientSignature: '' })); setSpecimens([{ id: 1, type: '', count: '', source: '', tissueFixative: '', tissueOtherType: '', anatomicSite: '', comments: '' }]); }}
            className="w-full text-sm text-primary font-semibold hover:underline py-2"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-background-dark min-h-screen font-sans">
      <GlobalHeader title="Cloud Diagnostic Portal" />

      <main className="max-w-5xl mx-auto p-4 md:p-8 pb-40">
        {/* Order Info Banner */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 bg-blue-50 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100 dark:border-blue-800/30">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">security</span>
            <span className="text-xs font-semibold text-primary/80 uppercase tracking-widest">End-to-End Encrypted Session</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-slate-500 dark:text-slate-400">Test Ordered On</p>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{orderDate}, {orderTime}</p>
            </div>
            <div
              className="relative"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <span className="material-symbols-outlined text-amber-500 cursor-help text-2xl">lightbulb</span>
              {showTooltip && (
                <div className="absolute right-0 top-full mt-2 w-48 p-3 bg-slate-900 text-white text-xs rounded-lg shadow-lg z-50">
                  <div className="font-bold mb-1">Turnaround Time</div>
                  <div>3 to 4 weeks TAT</div>
                  <div className="absolute -top-1 right-3 w-2 h-2 bg-slate-900 rotate-45"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Client & Patient Info */}
              <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Patient & Provider Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Client Info */}
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Client Info</label>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleInputChange}
                      placeholder="Hospital/Lab Name *"
                      className="w-full rounded-xl border-slate-300 dark:border-slate-600 dark:bg-slate-800 p-3 focus:border-primary focus:ring-primary"
                      required
                      maxLength={100}
                    />
                    <input
                      type="text"
                      name="clientAccountNo"
                      value={formData.clientAccountNo}
                      onChange={handleInputChange}
                      placeholder="Account # (Optional)"
                      className="w-full rounded-xl border-slate-300 dark:border-slate-600 dark:bg-slate-800 p-3 focus:border-primary focus:ring-primary"
                      maxLength={50}
                    />
                  </div>

                  {/* Patient Info */}
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Patient Info</label>
                    <input
                      type="text"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleInputChange}
                      placeholder="Patient Full Name *"
                      className="w-full rounded-xl border-slate-300 dark:border-slate-600 dark:bg-slate-800 p-3 focus:border-primary focus:ring-primary"
                      required
                      maxLength={100}
                    />
                    <input
                      type="text"
                      name="patientId"
                      value={formData.patientId}
                      onChange={handleInputChange}
                      placeholder="MRN / Patient ID *"
                      className="w-full rounded-xl border-slate-300 dark:border-slate-600 dark:bg-slate-800 p-3 focus:border-primary focus:ring-primary"
                      required
                      maxLength={50}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        name="sex"
                        value={formData.sex}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border-slate-300 dark:border-slate-600 dark:bg-slate-800 p-3 focus:border-primary focus:ring-primary"
                      >
                        <option value="">Sex</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border-slate-300 dark:border-slate-600 dark:bg-slate-800 p-3 focus:border-primary focus:ring-primary"
                        placeholder="DOB"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Ordering Physician */}
              <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Ordering Physician</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="professionalName"
                    value={formData.professionalName}
                    onChange={handleInputChange}
                    placeholder="Physician Full Name *"
                    className="w-full rounded-xl border-slate-300 dark:border-slate-600 dark:bg-slate-800 p-3 focus:border-primary focus:ring-primary"
                    required
                    maxLength={100}
                  />
                  <input
                    type="text"
                    name="profRegNumber"
                    value={formData.profRegNumber}
                    onChange={handleInputChange}
                    placeholder="Registration/License # (Optional)"
                    className="w-full rounded-xl border-slate-300 dark:border-slate-600 dark:bg-slate-800 p-3 focus:border-primary focus:ring-primary"
                    maxLength={50}
                  />
                  <input
                    type="tel"
                    name="profWorkPhone"
                    value={formData.profWorkPhone}
                    onChange={handleInputChange}
                    placeholder="Work Phone (Optional)"
                    className="w-full rounded-xl border-slate-300 dark:border-slate-600 dark:bg-slate-800 p-3 focus:border-primary focus:ring-primary"
                    maxLength={20}
                  />
                  <input
                    type="tel"
                    name="profPersonalPhone"
                    value={formData.profPersonalPhone}
                    onChange={handleInputChange}
                    placeholder="Mobile Phone (Optional)"
                    className="w-full rounded-xl border-slate-300 dark:border-slate-600 dark:bg-slate-800 p-3 focus:border-primary focus:ring-primary"
                    maxLength={20}
                  />
                </div>
              </div>

              {/* Specimens */}
              <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Specimens</h2>
                <div className="space-y-4">
                  {specimens.map((row, idx) => (
                    <div key={row.id} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-end">
                      <div className="flex-1 w-full">
                        <label className="block text-xs font-bold mb-1 uppercase text-slate-600 dark:text-slate-400">Type *</label>
                        <select
                          value={row.type}
                          onChange={(e) => updateSpecimenRow(row.id, 'type', e.target.value)}
                          className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-800 p-2 focus:border-primary focus:ring-primary"
                        >
                          <option value="">Select...</option>
                          {specimenTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div className="flex-1 w-full">
                        <label className="block text-xs font-bold mb-1 uppercase text-slate-600 dark:text-slate-400">Collection Date</label>
                        <input
                          type="date"
                          value={row.source}
                          onChange={(e) => updateSpecimenRow(row.id, 'source', e.target.value)}
                          className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-800 p-2 focus:border-primary focus:ring-primary"
                        />
                      </div>
                      <div className="flex-1 w-full">
                        <label className="block text-xs font-bold mb-1 uppercase text-slate-600 dark:text-slate-400">Notes</label>
                        <input
                          type="text"
                          value={row.comments}
                          onChange={(e) => updateSpecimenRow(row.id, 'comments', e.target.value)}
                          placeholder="Qty, Site, etc"
                          className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-800 p-2 focus:border-primary focus:ring-primary"
                          maxLength={200}
                        />
                      </div>
                      {specimens.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeSpecimenRow(row.id)}
                          variant="ghost"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" onClick={addSpecimenRow} variant="outline" className="w-full h-12 border-dashed border-2">
                    <span className="material-symbols-outlined mr-2">add</span>
                    Add Another Specimen
                  </Button>
                </div>
              </div>

              {/* Clinical History */}
              <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Clinical History</h2>
                <textarea
                  name="diagnosisHistory"
                  rows={4}
                  value={formData.diagnosisHistory}
                  onChange={handleInputChange}
                  placeholder="Summary of diagnosis, clinical history, and testing goals *"
                  className="w-full rounded-xl border-slate-300 dark:border-slate-600 dark:bg-slate-800 p-4 focus:border-primary focus:ring-primary"
                  required
                  minLength={10}
                  maxLength={2000}
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-slate-400">Min 10 characters</span>
                  <span className="text-xs text-slate-400">{formData.diagnosisHistory.length}/2000</span>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Prescription/Referral (PDF) - Optional</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  />
                  {prescriptionFile && (
                    <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      {prescriptionFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Test Selection</h2>
                  <div
                    className="relative flex items-center gap-2 text-amber-600 cursor-help"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <span className="material-symbols-outlined">lightbulb</span>
                    <span className="text-sm font-medium">TAT Info</span>
                    {showTooltip && (
                      <div className="absolute right-0 top-full mt-2 w-48 p-3 bg-slate-900 text-white text-xs rounded-lg shadow-lg z-50">
                        <div className="font-bold mb-1">Turnaround Time</div>
                        <div>3 to 4 weeks TAT</div>
                        <div className="absolute -top-1 right-3 w-2 h-2 bg-slate-900 rotate-45"></div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-8">
                  {testSections.map((sec, idx) => (
                    <div key={idx}>
                      <h3 className="text-sm font-bold text-primary uppercase mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">{sec.title}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sec.items.map(item => (
                          <label
                            key={item.id}
                            className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                              formData.selectedTests[item.id]
                                ? 'bg-primary/10 border-primary shadow-sm'
                                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={!!formData.selectedTests[item.id]}
                              onChange={() => handleTestSelection(item.id)}
                              className="mt-1 h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
                            />
                            <div>
                              <div className="font-bold text-sm text-slate-900 dark:text-white">{item.label}</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</div>
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
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Final Certification</h2>

                {/* Order Summary */}
                <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-primary">receipt_long</span>
                    <span className="font-bold text-slate-900 dark:text-white">Order Summary</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Patient:</span>
                      <span className="ml-2 font-medium text-slate-900 dark:text-white">{formData.patientName || '-'}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">MRN:</span>
                      <span className="ml-2 font-medium text-slate-900 dark:text-white">{formData.patientId || '-'}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Ordered On:</span>
                      <span className="ml-2 font-medium text-slate-900 dark:text-white">{orderDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Time:</span>
                      <span className="ml-2 font-medium text-slate-900 dark:text-white">{orderTime}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                    <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Ordering Physician Digital Signature *</label>
                    <p className="text-xs text-slate-500 mb-3">By typing your name below, you certify that you are the ordering physician.</p>
                    <input
                      type="text"
                      name="orderingPhysicianSignature"
                      value={formData.orderingPhysicianSignature}
                      onChange={handleInputChange}
                      placeholder="Type full name to sign"
                      className="w-full rounded-xl p-3 border-slate-300 dark:border-slate-600 dark:bg-slate-800 focus:border-primary focus:ring-primary font-medium"
                      required
                      maxLength={100}
                    />
                  </div>
                  <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                    <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Patient/Proxy Digital Signature *</label>
                    <p className="text-xs text-slate-500 mb-3">By typing your name below, you consent to the requested diagnostic testing.</p>
                    <input
                      type="text"
                      name="patientSignature"
                      value={formData.patientSignature}
                      onChange={handleInputChange}
                      placeholder="Type full name to sign"
                      className="w-full rounded-xl p-3 border-slate-300 dark:border-slate-600 dark:bg-slate-800 focus:border-primary focus:ring-primary font-medium"
                      required
                      maxLength={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Footer */}
          <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 p-4 z-50 md:static md:bg-transparent md:backdrop-blur-none md:border-none md:p-0">
            {formError && (
              <div className="max-w-5xl mx-auto mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm font-bold flex items-center gap-2 border border-red-100 dark:border-red-800">
                <span className="material-symbols-outlined">error</span>
                {formError}
              </div>
            )}
            <div className="max-w-5xl mx-auto flex justify-between items-center">
              <div className="text-sm font-bold text-slate-400">Step {currentStep} of {totalSteps}</div>
              <div className="flex gap-4">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep-1)}
                    className="h-12 px-6"
                  >
                    <span className="material-symbols-outlined mr-1 text-sm">arrow_back</span>
                    Back
                  </Button>
                )}
                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-primary hover:bg-primary-dark text-white px-8 h-12 rounded-xl"
                  >
                    Next Step
                    <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 h-12 rounded-xl shadow-lg shadow-emerald-900/20"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                         <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                         Saving to Cloud...
                      </div>
                    ) : (
                      <>
                        <span className="material-symbols-outlined mr-1 text-sm">cloud_upload</span>
                        Submit Final Request
                      </>
                    )}
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
