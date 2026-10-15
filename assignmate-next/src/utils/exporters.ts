import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import { asBlob } from 'html-docx-js-typescript';

/*
 * Utility to export pages/content as a PDF *
 */

export async function exportToPdf(
  elementId: string,
  filename: string,
  toast: any
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    toast.error('Preview element not found for PDF file.');
    throw new Error('Element ID not found ');
  }
  try {
    toast.info('Generating PDF ...');

    // Rendering the Dom Element to a canvas directly
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    // Initializing jsPDF (A4 size, portrait)
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Adding image to PDF pages
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

    // Save PDF
    pdf.save(`${filename}.pdf`);

    toast.success('PDF downloaded successfully!');
  } catch (e: any) {
    toast.error(
      'PDF Export failed, Check your internet connection and try again'
    );
    console.error('PDF Export failed:', e);
    throw e;
  }
}

export async function exportToDocx(
  htmlContent: string,
  filename: string,
  toast: any
) {
  try {
    toast.info('Generating Word Document... ');

    // Wrap the body content with standard full HTML structure for Word parsing

    const fullHtml = `
     <!DOCTYPE html>
      <html lang="en">
      <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${filename}</title>
      </head>
      <body>
         ${htmlContent}
      </body>
      </html>
    `;

    const generated = await asBlob(fullHtml, {
      orientation: 'portrait',
      margins: {
        top: 1440,
        right: 1440,
        bottom: 1440,
        left: 1440,
      },
    });

    const blob = new Blob([generated as BlobPart], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    saveAs(blob, `${filename}.docx`);
    toast.success('Word document downloaded successfully');
  } catch (e: any) {
    toast.error('Error exporting as docx try again');
    console.error('Error exporting as pdf', e);
  }
}
