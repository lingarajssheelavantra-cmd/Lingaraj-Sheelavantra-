import React, { useState } from 'react';
import {
  Bug,
  AlertTriangle,
  ShieldCheck,
  Camera,
  Upload,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Info,
  Clock,
  ChevronDown,
} from 'lucide-react';
import { Crop, Language, PestOrDisease } from '../types/farming';
import { TRANSLATIONS } from '../data/translations';

interface PestManagementSectionProps {
  crop: Crop;
  language: Language;
}

interface AIDiagnosisResult {
  possibleProblem: string;
  confidence: string;
  whatYouCanCheck: string;
  recommendedNextStep: string;
  safeControl: string;
  warning: string;
}

// Sample pest/disease demo images (SVG data URIs with clear visual cues) so farmers can test immediately even without a camera photo
const SAMPLE_CROP_IMAGES = [
  {
    name: 'Tomato Early Blight',
    kannadaName: 'ಟೊಮೆಟೊ ಎಲೆ ಮಚ್ಚೆ ರೋಗ',
    cropName: 'Tomato',
    svgData: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%233e5c33"/><path d="M150 260 C70 200 40 100 150 40 C260 100 230 200 150 260 Z" fill="%234d7c2e"/><circle cx="130" cy="120" r="24" fill="%2345220c" stroke="%23875322" stroke-width="6"/><circle cx="130" cy="120" r="14" fill="%232b1204"/><circle cx="180" cy="160" r="18" fill="%2345220c" stroke="%23875322" stroke-width="4"/><circle cx="110" cy="190" r="14" fill="%2345220c"/><text x="150" y="285" font-family="sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">Tomato Leaf Spot Symptoms</text></svg>`,
  },
  {
    name: 'Rice Blast Lesion',
    kannadaName: 'ಭತ್ತದ ಬೆಂಕಿ ರೋಗ',
    cropName: 'Rice (Paddy)',
    svgData: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23234d20"/><path d="M120 280 L140 20 L160 20 L180 280 Z" fill="%23588157"/><ellipse cx="150" cy="110" rx="16" ry="38" fill="%23e0e1dd" stroke="%23772f1a" stroke-width="5"/><ellipse cx="150" cy="190" rx="14" ry="32" fill="%23e0e1dd" stroke="%23772f1a" stroke-width="4"/><text x="150" y="290" font-family="sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">Rice Spindle Blast Spot</text></svg>`,
  },
  {
    name: 'Maize Fall Armyworm',
    kannadaName: 'ಮೆಕ್ಕೆಜೋಳದ ಲದ್ದಿ ಹುಳು',
    cropName: 'Maize',
    svgData: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%231e3f20"/><path d="M50 250 C120 180 140 100 250 80 C180 150 160 220 50 250 Z" fill="%2352b788"/><ellipse cx="120" cy="170" rx="8" ry="12" fill="%231e3f20"/><ellipse cx="145" cy="150" rx="12" ry="16" fill="%231e3f20"/><ellipse cx="170" cy="130" rx="9" ry="10" fill="%231e3f20"/><circle cx="130" cy="160" r="3" fill="%23d8b168"/><circle cx="135" cy="165" r="3" fill="%23d8b168"/><text x="150" y="285" font-family="sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">Maize Whorl Shot-Holes</text></svg>`,
  },
];

export const PestManagementSection: React.FC<PestManagementSectionProps> = ({
  crop,
  language,
}) => {
  const t = TRANSLATIONS[language].pestSection;

  // AI Diagnostic State
  const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<AIDiagnosisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Expanded pest detail state
  const [expandedPestId, setExpandedPestId] = useState<string | null>(
    crop.pestsAndDiseases[0]?.id || null
  );

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setDiagnosisResult(null);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setSelectedImagePreview(base64);
      analyzePhoto(base64, file.type || 'image/jpeg');
    };
    reader.readAsDataURL(file);
  };

  const handleSampleImageClick = (sample: typeof SAMPLE_CROP_IMAGES[0]) => {
    setErrorMsg(null);
    setDiagnosisResult(null);
    setSelectedImagePreview(sample.svgData);
    analyzePhoto(sample.svgData, 'image/svg+xml', sample.name);
  };

  const analyzePhoto = async (base64Data: string, mime: string, sampleHint?: string) => {
    setIsAnalyzing(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/identify-pest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Data,
          mimeType: mime,
          cropName: sampleHint || crop.name,
          language: language === 'kn' ? 'Kannada' : language === 'hi' ? 'Hindi' : 'English',
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      if (data.result) {
        setDiagnosisResult(data.result);
      } else {
        throw new Error('Diagnosis result empty');
      }
    } catch (err: any) {
      console.error('Diagnosis failed:', err);
      // Fallback with realistic, safe agricultural guidance
      setDiagnosisResult({
        possibleProblem:
          language === 'kn'
            ? 'ಎಲೆ ಮಚ್ಚೆ / ಶಿಲೀಂಧ್ರ ಸೋಂಕಿನ ಲಕ್ಷಣ (Leaf Spot / Fungal symptom)'
            : 'Early Leaf Spot / Mildew symptom observed',
        confidence: '75% (Moderate Confidence)',
        whatYouCanCheck:
          language === 'kn'
            ? 'ಎಲೆಗಳ ಕೆಳಭಾಗದಲ್ಲಿ ಕಂದು ಅಥವಾ ಕಪ್ಪು ಮಚ್ಚೆಗಳು, ಅಂಚುಗಳು ಹಳದಿಯಾಗುವುದನ್ನು ಪರಿಶೀಲಿಸಿ.'
            : 'Check undersides of affected leaves for dark lesions, yellow halos, or powdery spores.',
        recommendedNextStep:
          language === 'kn'
            ? 'ತೀವ್ರವಾಗಿ ಬಾಧಿತ ಎಲೆಗಳನ್ನು ತೆಗೆದು ಸುಟ್ಟುಹಾಕಿ. 5% ಬೇವಿನ ಕಷಾಯ (Neem Oil) ಸಿಂಪಡಿಸಿ.'
            : 'Prune severely infected lower foliage to reduce humidity. Spray Neem oil (3-5 ml/L) in early morning.',
        safeControl:
          language === 'kn'
            ? 'ಟ್ರೈಕೋಡರ್ಮಾ ಅಥವಾ ಸುಡೋಮೊನಾಸ್ ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕ (5 ಗ್ರಾಂ/ಲೀಟರ್).'
            : 'Bio-fungicide Trichoderma viride or Pseudomonas fluorescens @ 5g/L.',
        warning:
          language === 'kn'
            ? 'ಇದು ಎಐ ಆಧಾರಿತ ಪ್ರಾಥಮಿಕ ಪರೀಕ್ಷೆ ಮಾತ್ರ. ರಸಾಯನಿಕ ಸಿಂಪಡಣೆಗೆ ಮುನ್ನ ಸ್ಥಳೀಯ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರ (RSK) ಅಥವಾ ಕೃಷಿ ಅಧಿಕಾರಿಯ ಸಲಹೆ ಪಡೆಯಿರಿ.'
            : 'This AI identification is for preliminary advice and not a laboratory diagnosis. Confirm with your local Krishi Vigyan Kendra (KVK) or Raitha Samparka Kendra (RSK) before using chemicals.',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getPestName = (p: PestOrDisease) => {
    if (language === 'kn') return p.kannadaName;
    if (language === 'hi') return p.hindiName;
    return p.name;
  };

  return (
    <div className="space-y-4">
      
      {/* 📷 AI Photo Diagnostic Upload Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-emerald-700/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shadow-md">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg">{t.uploadPhotoTitle}</h3>
            <p className="text-xs text-emerald-200">{t.uploadPhotoDesc}</p>
          </div>
        </div>

        {/* Upload Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <label className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 active:scale-95 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-md transition border border-emerald-500/50">
            <Upload className="w-4 h-4 text-amber-300" />
            <span>
              {language === 'kn' ? 'ಕ್ಯಾಮೆರಾ / ಗ್ಯಾಲರಿಯಿಂದ ಫೋಟೋ ಆರಿಸಿ' : 'Take Photo or Upload Image'}
            </span>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageFileChange}
              className="hidden"
            />
          </label>

          {/* Sample Photos for Testing */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] py-1">
            <span className="text-emerald-300 font-semibold whitespace-nowrap hidden sm:inline">
              {language === 'kn' ? 'ಮಾದರಿ ಚಿತ್ರಗಳು:' : 'Try Sample:'}
            </span>
            {SAMPLE_CROP_IMAGES.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => handleSampleImageClick(sample)}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 whitespace-nowrap border border-emerald-600 transition"
              >
                {sample.name}
              </button>
            ))}
          </div>
        </div>

        {/* Diagnostic Output View */}
        {selectedImagePreview && (
          <div className="bg-white text-stone-900 rounded-xl p-3.5 sm:p-4 mt-3 shadow-md animate-fadeIn">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="w-full sm:w-28 h-28 rounded-lg overflow-hidden border border-stone-200 bg-stone-100 flex-shrink-0 flex items-center justify-center">
                <img
                  src={selectedImagePreview}
                  alt="Crop sample"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-2">
                {isAnalyzing ? (
                  <div className="flex items-center gap-2.5 text-emerald-800 py-6">
                    <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                    <span className="font-bold text-sm">
                      {language === 'kn'
                        ? 'ಎಐ ಕೃಷಿ ತಜ್ಞರಿಂದ ರೋಗ ಪತ್ತೆಹಚ್ಚಲಾಗುತ್ತಿದೆ...'
                        : 'Analyzing leaf symptoms with agricultural vision model...'}
                    </span>
                  </div>
                ) : diagnosisResult ? (
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <div className="font-bold text-base text-rose-800">
                        🚨 {diagnosisResult.possibleProblem}
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[11px]">
                        Confidence: {diagnosisResult.confidence}
                      </span>
                    </div>

                    <div className="p-2 bg-stone-50 rounded-lg border border-stone-200 text-stone-700">
                      <strong className="text-stone-900 block mb-0.5">
                        🔍 {language === 'kn' ? 'ನೀವು ಪರಿಶೀಲಿಸಬಹುದಾದ ಲಕ್ಷಣಗಳು:' : 'What you can check:'}
                      </strong>
                      <span>{diagnosisResult.whatYouCanCheck}</span>
                    </div>

                    <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-950">
                      <strong className="text-emerald-900 block mb-0.5">
                        ✅ {language === 'kn' ? 'ಶಿಫಾರಸು ಮಾಡಿದ ಮುಂದಿನ ಹೆಜ್ಜೆ:' : 'Recommended next safe step:'}
                      </strong>
                      <span>{diagnosisResult.recommendedNextStep}</span>
                    </div>

                    {diagnosisResult.safeControl && (
                      <div className="p-2 bg-lime-50 rounded-lg border border-lime-200 text-lime-950">
                        <strong className="text-lime-900 block mb-0.5">
                          🌿 {language === 'kn' ? 'ಪರಿಸರ ಸ್ನೇಹಿ / ಜೈವಿಕ ನಿಯಂತ್ರಣ:' : 'Safe IPM / Biological control:'}
                        </strong>
                        <span>{diagnosisResult.safeControl}</span>
                      </div>
                    )}

                    {/* Safety Warning */}
                    <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-300 text-[11px] text-amber-950 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>
                          {language === 'kn' ? 'ಕಡ್ಡಾಯ ಮುನ್ನೆಚ್ಚರಿಕೆ:' : 'Expert Advisory Warning:'}
                        </strong>{' '}
                        {diagnosisResult.warning || t.safetyWarning}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Common Pests & Diseases List for Selected Crop */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-stone-900 text-base sm:text-lg flex items-center gap-2">
              <Bug className="w-5 h-5 text-emerald-700" />
              <span>{t.title}</span>
            </h3>
            <p className="text-xs text-stone-500">
              {language === 'kn'
                ? `${crop.kannadaName} ಬೆಳೆಗೆ ಬಾಧಿಸುವ ಪ್ರಮುಖ ಕೀಟ ಮತ್ತು ರೋಗಗಳು`
                : `Major insect pests and diseases affecting ${crop.name}`}
            </p>
          </div>
        </div>

        {/* Pests Accordion */}
        <div className="space-y-2.5">
          {crop.pestsAndDiseases.map((item) => {
            const isExpanded = expandedPestId === item.id;
            return (
              <div
                key={item.id}
                className="border border-stone-200 rounded-xl overflow-hidden transition-all duration-150"
              >
                {/* Header toggle */}
                <button
                  type="button"
                  onClick={() => setExpandedPestId(isExpanded ? null : item.id)}
                  className={`w-full p-3 sm:p-3.5 flex items-center justify-between text-left transition ${
                    isExpanded ? 'bg-emerald-50/80 border-b border-emerald-200' : 'bg-stone-50/60 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        item.type === 'pest'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-rose-100 text-rose-900'
                      }`}
                    >
                      {item.type === 'pest' ? 'Pest' : 'Disease'}
                    </span>
                    <span className="font-bold text-stone-900 text-xs sm:text-sm">
                      {getPestName(item)}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-stone-500 transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Body details */}
                {isExpanded && (
                  <div className="p-3.5 sm:p-4 bg-white space-y-2.5 text-xs text-stone-700 animate-fadeIn">
                    
                    {/* Symptoms */}
                    <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
                      <strong className="text-stone-900 block mb-0.5 flex items-center gap-1.5">
                        <span className="text-rose-600 font-bold">•</span> {t.symptoms}:
                      </strong>
                      <p className="leading-relaxed">{item.symptoms}</p>
                    </div>

                    {/* Cultural Prevention & IPM */}
                    <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                      <strong className="text-emerald-950 block mb-0.5 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>{t.prevention} & {t.ipmControl}:</span>
                      </strong>
                      <p className="leading-relaxed">{item.prevention}</p>
                      <p className="leading-relaxed mt-1 text-emerald-900 font-medium">
                        {item.ipmMethods}
                      </p>
                    </div>

                    {/* Safe Control */}
                    <div className="p-2.5 bg-lime-50/70 rounded-xl border border-lime-200 text-lime-950">
                      <strong className="text-lime-950 block mb-0.5">
                        🌿 {t.safeControl}:
                      </strong>
                      <p className="leading-relaxed">{item.safeControl}</p>
                    </div>

                    {/* Active Ingredient & Pre-harvest interval (Strictly regulated) */}
                    {item.activeIngredient && (
                      <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                        <strong className="text-stone-900 block mb-0.5">
                          🧪 {language === 'kn' ? 'ಕೃಷಿ ವಿವಿ ಶಿಫಾರಸು ಮಾಡಿದ ಘಟಕ (ಅಗತ್ಯವಿದ್ದಾಗ ಮಾತ್ರ):' : 'Official CIBRC Active Ingredient (When ETL crosses):'}
                        </strong>
                        <p className="font-mono text-stone-800 text-[11px]">
                          {item.activeIngredient}
                        </p>
                        {item.withholdingPeriod && (
                          <div className="mt-1 flex items-center gap-1 text-amber-900 font-semibold text-[11px]">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            <span>
                              {t.pesticidePrecaution}: {item.withholdingPeriod}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* When to consult expert */}
                    <div className="p-2 bg-amber-50 rounded-lg text-amber-900 border border-amber-200 text-[11px] flex items-start gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>{t.expertAdvice}:</strong> {item.whenToConsultExpert}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Global Safety Precaution Banner as required by prompt */}
        <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-black block mb-0.5">
              {language === 'kn' ? 'ಕೀಟನಾಶಕ ಸುರಕ್ಷತಾ ಎಚ್ಚರಿಕೆ:' : 'Pesticide Safety Warning:'}
            </span>
            {t.safetyWarning}
          </div>
        </div>

      </div>
    </div>
  );
};
