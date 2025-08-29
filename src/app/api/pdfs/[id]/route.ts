import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pdfId = params.id;
    const pdfPath = path.join(process.cwd(), 'public', 'pdfs', `${pdfId}-curriculum.pdf`);
    
    // Check if file exists
    try {
      await fs.access(pdfPath);
    } catch {
      throw new Error('File not found');
    }
    
    const pdfBuffer = await fs.readFile(pdfPath);
    
    // Convert buffer to Uint8Array for Next.js 13+
    const uint8Array = new Uint8Array(pdfBuffer);
    
    return new NextResponse(uint8Array, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${pdfId}-curriculum.pdf"`,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('PDF loading error:', error);
    return NextResponse.json(
      { error: 'PDF not found' }, 
      { status: 404 }
    );
  }
}