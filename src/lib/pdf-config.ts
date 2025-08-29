import { PDFFile } from '@/types/pdf.types';

export const pdfFiles: Record<string, PDFFile> = {
  'cse': { 
    name: 'Computer Science Engineering.pdf', 
    url: '/pdfs/cse-curriculum.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  },
  'ece': { 
    name: 'Robotics and AI.pdf', 
    url: '/pdfs/robotics-ai-curriculum.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  },
  // ... add all your PDF configurations
};

export const loadPDFFromAPI = async (pdfKey: string): Promise<string | null> => {
  try {
    const response = await fetch(`/api/pdfs/${pdfKey}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/pdf',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error loading PDF from API:', error);
    return null;
  }
};