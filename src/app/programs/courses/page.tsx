"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, FileText, Download, ZoomIn, ZoomOut, Loader, AlertCircle } from 'lucide-react';
import Navigation from '@/components/navbar/navbar';
import FooterNewsletter from '@/components/footer/footer-newsletter';
import Image from 'next/image';

// UPDATED PDF CONFIGURATION - Now supports multiple PDFs per specialization
const pdfFiles = {
  'cse-curriculum': { 
    name: 'CSE Curriculum.pdf', 
    url: '/pdfs/cse_curriculum.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  },
  'cse-syllabus': { 
    name: 'CSE Syllabus.pdf', 
    url: '/pdfs/cse_syllabus.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  },
  'robotics-ai-curriculum': { 
    name: 'Robotics AI Curriculum.pdf', 
    url: '/pdfs/robotics-ai-curriculum.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  },
  'robotics-ai-syllabus': { 
    name: 'Robotics AI Syllabus.pdf', 
    url: '/pdfs/robotics-ai-syllabus.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  },
  'cloud-computing-curriculum': { 
    name: 'Cloud Computing Curriculum.pdf', 
    url: '/pdfs/cloud-computing-curriculum.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  },
  'cloud-computing-syllabus': { 
    name: 'Cloud Computing Syllabus.pdf', 
    url: '/pdfs/cloud-computing-syllabus.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  },
  'cyber-security-curriculum': { 
    name: 'Cyber Security Curriculum.pdf', 
    url: '/pdfs/cyber-security-curriculum.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  },
  'cyber-security-syllabus': { 
    name: 'Cyber Security Syllabus.pdf', 
    url: '/pdfs/cyber-security-syllabus.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  },
  'ai-ml-curriculum': { 
    name: 'AI ML Curriculum.pdf', 
    url: '/pdfs/ai-ml-curriculum.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  },
  'ai-ml-syllabus': { 
    name: 'AI ML Syllabus.pdf', 
    url: '/pdfs/ai-ml-syllabus.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  },
  'cs-business-curriculum': { 
    name: 'CS Business Curriculum.pdf', 
    url: '/pdfs/cs-business-curriculum.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  },
  'cs-business-syllabus': { 
    name: 'CS Business Syllabus.pdf', 
    url: '/pdfs/cs-business-syllabus.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  },
  'mobile-dev-curriculum': { 
    name: 'Mobile Development Curriculum.pdf', 
    url: '/pdfs/mobile-dev-curriculum.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  },
  'mobile-dev-syllabus': { 
    name: 'Mobile Development Syllabus.pdf', 
    url: '/pdfs/mobile-dev-syllabus.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  },
  'data-science-curriculum': { 
    name: 'Data Science Curriculum.pdf', 
    url: '/pdfs/data-science-curriculum.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  },
  'data-science-syllabus': { 
    name: 'Data Science Syllabus.pdf', 
    url: '/pdfs/data-science-syllabus.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  },
  // Add more PDFs as needed...
  'research-curriculum': { 
    name: 'Research Methodology Curriculum.pdf', 
    url: '/pdfs/research-curriculum.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  },
  'thesis-guidelines': { 
    name: 'Thesis Guidelines.pdf', 
    url: '/pdfs/thesis-guidelines.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  },
  'advanced-web-curriculum': { 
    name: 'Advanced Web Tech Curriculum.pdf', 
    url: '/pdfs/advanced-web-curriculum.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  },
  'software-arch-curriculum': { 
    name: 'Software Architecture Curriculum.pdf', 
    url: '/pdfs/software-arch-curriculum.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  },
  'web-dev-curriculum': { 
    name: 'Web Development Curriculum.pdf', 
    url: '/pdfs/web-dev-curriculum.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  },
  'web-dev-syllabus': { 
    name: 'Web Development Syllabus.pdf', 
    url: '/pdfs/web-dev-syllabus.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  },
  'software-testing-curriculum': { 
    name: 'Software Testing Curriculum.pdf', 
    url: '/pdfs/software-testing-curriculum.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  },
  'software-testing-syllabus': { 
    name: 'Software Testing Syllabus.pdf', 
    url: '/pdfs/software-testing-syllabus.pdf',
    fallbackUrl: '/pdfs/sample.pdf'
  }
};

// Optimized PDF Modal Component (unchanged)
const PDFModal = ({ isOpen, onClose, pdfKey }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [pdfUrl, setPdfUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  const pdfData = useMemo(() => {
    return pdfKey ? pdfFiles[pdfKey] : null;
  }, [pdfKey]);

  useEffect(() => {
    if (!isOpen || !pdfKey || !pdfData) {
      setPdfUrl('');
      setError('');
      setTotalPages(0);
      return;
    }

    setLoading(true);
    setError('');
    setCurrentPage(1);

    const loadPDF = async () => {
      try {
        let url = pdfData.url;
        
        const response = await fetch(url, { method: 'HEAD' });
        if (!response.ok) {
          url = pdfData.fallbackUrl;
          const fallbackResponse = await fetch(url, { method: 'HEAD' });
          if (!fallbackResponse.ok) {
            throw new Error('PDF file not found');
          }
        }

        setPdfUrl(url);
        setTotalPages(Math.floor(Math.random() * 20) + 10);
      } catch (err) {
        console.error('PDF loading error:', err);
        setError(err.message || 'Failed to load PDF');
      } finally {
        setLoading(false);
      }
    };

    loadPDF();

    return () => {
      if (pdfUrl && pdfUrl.startsWith('blob:')) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [isOpen, pdfKey, pdfData, pdfUrl]);

  const handlePageChange = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  }, [totalPages]);

  const handleZoom = useCallback((direction) => {
    setZoom(prev => {
      if (direction === 'in') return Math.min(200, prev + 25);
      return Math.max(50, prev - 25);
    });
  }, []);

  const handleDownload = useCallback(() => {
    if (pdfUrl && pdfData) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = pdfData.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [pdfUrl, pdfData]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          handlePageChange(currentPage - 1);
          break;
        case 'ArrowRight':
          handlePageChange(currentPage + 1);
          break;
        case 'Escape':
          onClose();
          break;
        case '+':
          handleZoom('in');
          break;
        case '-':
          handleZoom('out');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, currentPage, handlePageChange, handleZoom, onClose]);

  if (!isOpen || !pdfData) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-full max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">{pdfData.name}</h3>
            {loading && <Loader className="w-5 h-5 animate-spin text-blue-600" />}
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleZoom('out')}
              disabled={zoom <= 50}
              className="p-2 hover:bg-white/80 rounded-lg transition-colors disabled:opacity-50"
              title="Zoom Out (-)"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium px-3 py-1 bg-white/80 rounded-full min-w-[60px] text-center">
              {zoom}%
            </span>
            <button 
              onClick={() => handleZoom('in')}
              disabled={zoom >= 200}
              className="p-2 hover:bg-white/80 rounded-lg transition-colors disabled:opacity-50"
              title="Zoom In (+)"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button 
              onClick={handleDownload}
              disabled={!pdfUrl || loading}
              className="p-2 hover:bg-white/80 rounded-lg transition-colors disabled:opacity-50"
              title="Download PDF"
            >
              <Download className="w-5 h-5" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
              title="Close (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-auto bg-gray-100 p-6">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading PDF...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
                    <p className="text-red-600 mb-2">Error loading PDF</p>
                    <p className="text-gray-500 text-sm">{error}</p>
                  </div>
                </div>
              ) : pdfUrl ? (
                <div className="flex justify-center">
                  <iframe
                    src={`${pdfUrl}#page=${currentPage}&zoom=${zoom}`}
                    className="w-full h-full min-h-[800px] border-0 rounded-lg shadow-lg"
                    title={pdfData.name}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">No PDF to display</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// UPDATED Program Page Component - Now supports multiple PDFs
const ProgramPage = ({ program, specializations, onPDFClick }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-special-gothic">{program.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-ubuntu">{program.description}</p>
          <div className="mt-6 flex justify-center">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {program.duration} • {program.type}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-special-gothic">Specializations</h2>
        <p className="text-lg text-gray-600 font-ubuntu">Choose your path and explore detailed curriculum</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {specializations.map((spec, index) => (
          <div
            key={`${spec.title}-${index}`}
            className="group bg-white rounded-md shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border-2  border-blue-900 hover:border-blue-200"
          >
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-transparent flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="logo"
                    width={32}
                    height={32}
                    className=''
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors font-ubuntu">
                  {spec.title}
                </h3>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">{spec.description}</p>
              
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Key Areas:</h4>
                <div className="flex flex-wrap gap-2">
                  {spec.keyAreas.map((area, i) => (
                    <span key={`${area}-${i}`} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* UPDATED: Multiple PDF buttons */}
              <div className="space-y-3">
                {spec.pdfs.map((pdf, i) => (
                  <button
                    key={`${pdf.key}-${i}`}
                    onClick={() => onPDFClick(pdf.key)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    {pdf.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// UPDATED Main Component - Now with multiple PDFs per specialization
export default function FixedProgramsWithSpecializations() {
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [currentProgram, setCurrentProgram] = useState('btech');

  // UPDATED: Programs data with multiple PDFs per specialization
  const programs = useMemo(() => ({
    btech: {
      title: "B.Tech - Bachelor of Technology",
      description: "A comprehensive 4-year undergraduate program designed to build strong technical foundations in engineering and technology.",
      duration: "4 Years",
      type: "Undergraduate",
      specializations: [
        {
          title: "Computer Science Engineering (CORE)",
          description: "Master programming, algorithms, software development, and cutting-edge computing technologies.",
          keyAreas: ["Programming", "Data Structures", "AI/ML", "Web Development"],
          pdfs: [
            { key: "cse-curriculum", label: "View Curriculum PDF" },
            { key: "cse-syllabus", label: "View Syllabus PDF" }
          ]
        },
        {
          title: "Robotics and Artificial Intelligence",
          description: "Explore robotics, AI algorithms, and intelligent system development.",
          keyAreas: ["Robotics", "Machine Learning", "Computer Vision", "Automation"],
          pdfs: [
            { key: "robotics-ai-curriculum", label: "View Curriculum PDF" },
            { key: "robotics-ai-syllabus", label: "View Syllabus PDF" }
          ]
        },
        {
          title: "Cloud Computing",
          description: "Study cloud architecture, distributed systems, and scalable computing solutions.",
          keyAreas: ["AWS/Azure", "Microservices", "DevOps", "Scalability"],
          pdfs: [
            { key: "cloud-computing-curriculum", label: "View Curriculum PDF" },
            { key: "cloud-computing-syllabus", label: "View Syllabus PDF" }
          ]
        },
        {
          title: "Cyber Security",
          description: "Learn information security, ethical hacking, and digital forensics.",
          keyAreas: ["Network Security", "Penetration Testing", "Cryptography", "Incident Response"],
          pdfs: [
            { key: "cyber-security-curriculum", label: "View Curriculum PDF" },
            { key: "cyber-security-syllabus", label: "View Syllabus PDF" }
          ]
        },
        {
          title: "Artificial Intelligence and Machine Learning",
          description: "Deep dive into AI algorithms, neural networks, and predictive modeling.",
          keyAreas: ["Deep Learning", "NLP", "Computer Vision", "Data Mining"],
          pdfs: [
            { key: "ai-ml-curriculum", label: "View Curriculum PDF" },
            { key: "ai-ml-syllabus", label: "View Syllabus PDF" }
          ]
        },
        {
          title: "Computer Science and Business System",
          description: "Combine technical skills with business acumen for enterprise solutions.",
          keyAreas: ["Enterprise Systems", "Business Analytics", "Project Management", "Digital Transformation"],
          pdfs: [
            { key: "cs-business-curriculum", label: "View Curriculum PDF" },
            { key: "cs-business-syllabus", label: "View Syllabus PDF" }
          ]
        },
        {
          title: "Mobile Development",
          description: "Create native and cross-platform mobile applications.",
          keyAreas: ["iOS Development", "Android Development", "React Native", "Flutter"],
          pdfs: [
            { key: "mobile-dev-curriculum", label: "View Curriculum PDF" },
            { key: "mobile-dev-syllabus", label: "View Syllabus PDF" }
          ]
        },
        {
          title: "Data Science",
          description: "Analyze big data, create insights, and build predictive models.",
          keyAreas: ["Python/R", "Statistical Analysis", "Machine Learning", "Data Visualization"],
          pdfs: [
            { key: "data-science-curriculum", label: "View Curriculum PDF" },
            { key: "data-science-syllabus", label: "View Syllabus PDF" }
          ]
        }
      ]
    },
    mtech: {
      title: "M.Tech - Master of Technology",
      description: "Advanced 2-year postgraduate program focusing on specialized research and advanced engineering concepts.",
      duration: "2 Years",
      type: "Postgraduate",
      specializations: [
        {
          title: "Advanced Algorithms & AI",
          description: "Deep dive into machine learning, artificial intelligence, and advanced computational methods.",
          keyAreas: ["Machine Learning", "Deep Learning", "Computer Vision", "NLP"],
          pdfs: [
            { key: "ai-ml-curriculum", label: "View Advanced AI Curriculum" }
          ]
        },
        {
          title: "Research Methodology",
          description: "Comprehensive research techniques, data analysis, and academic writing for engineering research.",
          keyAreas: ["Research Design", "Statistical Analysis", "Publication", "Ethics"],
          pdfs: [
            { key: "research-curriculum", label: "View Research Methodology" }
          ]
        },
        {
          title: "Thesis Project",
          description: "Independent research project culminating in a master's thesis with industry relevance.",
          keyAreas: ["Project Management", "Literature Review", "Experimentation", "Documentation"],
          pdfs: [
            { key: "thesis-guidelines", label: "View Thesis Guidelines" }
          ]
        },
        {
          title: "Software Architecture",
          description: "Advanced software design patterns, system architecture, and scalable application development.",
          keyAreas: ["Design Patterns", "Microservices", "Cloud Architecture", "Performance"],
          pdfs: [
            { key: "software-arch-curriculum", label: "View Architecture Curriculum" }
          ]
        }
      ]
    },
    bca: {
      title: "BCA - Bachelor of Computer Applications",
      description: "3-year undergraduate program focused on computer applications, programming, and IT fundamentals.",
      duration: "3 Years",
      type: "Undergraduate",
      specializations: [
        {
          title: "Web Development",
          description: "Master modern web technologies, frameworks, and full-stack development approaches.",
          keyAreas: ["HTML/CSS", "JavaScript", "React", "Node.js"],
          pdfs: [
            { key: "web-dev-curriculum", label: "View Web Dev Curriculum" },
            { key: "web-dev-syllabus", label: "View Web Dev Syllabus" }
          ]
        },
        {
          title: "Mobile App Development",
          description: "Create native and cross-platform mobile applications for Android and iOS platforms.",
          keyAreas: ["Android Development", "iOS Development", "React Native", "Flutter"],
          pdfs: [
            { key: "mobile-dev-curriculum", label: "View Mobile Dev Curriculum" },
            { key: "mobile-dev-syllabus", label: "View Mobile Dev Syllabus" }
          ]
        },
        {
          title: "Data Science & Analytics",
          description: "Analyze data, create insights, and build predictive models using modern tools.",
          keyAreas: ["Python", "SQL", "Statistics", "Visualization"],
          pdfs: [
            { key: "data-science-curriculum", label: "View Data Science Curriculum" },
            { key: "data-science-syllabus", label: "View Data Science Syllabus" }
          ]
        },
        {
          title: "Software Testing",
          description: "Ensure software quality through comprehensive testing methodologies and tools.",
          keyAreas: ["Manual Testing", "Automation", "Performance Testing", "Quality Assurance"],
          pdfs: [
            { key: "software-testing-curriculum", label: "View Testing Curriculum" },
            { key: "software-testing-syllabus", label: "View Testing Syllabus" }
          ]
        }
      ]
    },
    mca: {
      title: "MCA - Master of Computer Applications",
      description: "Advanced 2-year postgraduate program in computer applications with focus on industry-ready skills.",
      duration: "2 Years",
      type: "Postgraduate",
      specializations: [
        {
          title: "Advanced Web Technologies",
          description: "Master cutting-edge web development frameworks, cloud computing, and DevOps practices.",
          keyAreas: ["Cloud Computing", "DevOps", "Microservices", "API Development"],
          pdfs: [
            { key: "advanced-web-curriculum", label: "View Advanced Web Curriculum" }
          ]
        },
        {
          title: "Artificial Intelligence",
          description: "Deep exploration of AI algorithms, machine learning models, and intelligent systems.",
          keyAreas: ["Neural Networks", "Computer Vision", "Robotics", "Expert Systems"],
          pdfs: [
            { key: "ai-ml-curriculum", label: "View AI Curriculum" },
            { key: "ai-ml-syllabus", label: "View AI Syllabus" }
          ]
        },
        {
          title: "Cybersecurity",
          description: "Protect digital assets through advanced security protocols and ethical hacking techniques.",
          keyAreas: ["Network Security", "Ethical Hacking", "Cryptography", "Risk Management"],
          pdfs: [
            { key: "cyber-security-curriculum", label: "View Security Curriculum" },
            { key: "cyber-security-syllabus", label: "View Security Syllabus" }
          ]
        },
        {
          title: "Data Engineering",
          description: "Build robust data pipelines, warehouses, and analytics platforms for big data.",
          keyAreas: ["Big Data", "Data Pipelines", "Apache Spark", "Database Design"],
          pdfs: [
            { key: "data-science-curriculum", label: "View Data Engineering Curriculum" },
            { key: "data-science-syllabus", label: "View Data Engineering Syllabus" }
          ]
        }
      ]
    }
  }), []);

  const handlePDFClick = useCallback((pdfKey) => {
    setSelectedPDF(pdfKey);
  }, []);

  const closePDFModal = useCallback(() => {
    setSelectedPDF(null);
  }, []);

  const handleProgramChange = useCallback((programKey) => {
    setCurrentProgram(programKey);
  }, []);

  const currentProgramData = programs[currentProgram];

  return (
    <div className="h-full">
      <Navigation />
      <div className="bg-white shadow-sm border-b border-t mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 py-4 overflow-x-auto">
            {Object.entries(programs).map(([key, program]) => (
              <button
                key={key}
                onClick={() => handleProgramChange(key)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  currentProgram === key
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {program.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ProgramPage
        program={currentProgramData}
        specializations={currentProgramData.specializations}
        onPDFClick={handlePDFClick}
      />

      <PDFModal
        isOpen={!!selectedPDF}
        onClose={closePDFModal}
        pdfKey={selectedPDF}
      />
      <FooterNewsletter />
    </div>
  );
}