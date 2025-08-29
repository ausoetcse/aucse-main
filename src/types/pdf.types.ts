export interface PDFFile {
  name: string;
  url: string;
  fallbackUrl: string;
}

export interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfKey: string | null;
}

export interface ProgramData {
  title: string;
  description: string;
  duration: string;
  type: string;
  specializations: SpecializationData[];
}

export interface SpecializationData {
  title: string;
  description: string;
  keyAreas: string[];
  pdfKey: string;
}