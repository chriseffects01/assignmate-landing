import { saveAs } from 'file-saver';
import { asBlob } from 'html-docx-js-typescript';

/*
 * Utility to export pages/content as a PDF *
 */

type Toast = {
  info: (message: string) => void;
  success: (message: string) => void;
  error: (message: string) => void;
};

export async function exportToPdf(
  elementId: string,
  filename: string,
  toast: Toast
): Promise<void> {
  const element = document.getElementById(elementId);

  if (!element) {
    toast.error('Assignment preview not found.');
    throw new Error(`Element with ID "${elementId}" not found.`);
  }

  let printFrame: HTMLIFrameElement | null = null;

  try {
    toast.info('Preparing your PDF...');

    // Create an isolated document so the workspace stays unchanged.
    printFrame = document.createElement('iframe');

    Object.assign(printFrame.style, {
      position: 'fixed',
      right: '0',
      bottom: '0',
      width: '1px',
      height: '1px',
      border: '0',
      opacity: '0',
      pointerEvents: 'none',
    });

    printFrame.setAttribute('aria-hidden', 'true');
    document.body.appendChild(printFrame);

    const printDocument = printFrame.contentDocument;
    const printWindow = printFrame.contentWindow;

    if (!printDocument || !printWindow) {
      throw new Error('Could not initialize the PDF print document.');
    }

    printDocument.open();

    printDocument.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${filename.replace(/[<>&"]/g, '')}</title>

          <style>
            @page {
              size: A4 portrait;
              margin: 0;
            }

            * {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            html,
            body {
              margin: 0;
              padding: 0;
              width: 210mm;
              background: #ffffff;
              color: #1e293b;
              font-family: Georgia, "Times New Roman", serif;
            }

            #print-root {
              width: 210mm;
              margin: 0;
              padding: 0;
            }

            .print-page {
              position: relative;
              width: 210mm;
              height: 297mm;
              min-height: 297mm;
              margin: 0;
              padding: 12mm;
              overflow: hidden;
              background: #ffffff;
              color: #1e293b;
              break-after: page;
              page-break-after: always;
            }

            .print-page:last-child {
              break-after: auto;
              page-break-after: auto;
            }

            .print-page img {
              max-width: 100%;
              height: auto;
            }

            .print-page table {
              width: 100%;
              border-collapse: collapse;
            }

            .print-page tr,
            .print-page img {
              break-inside: avoid;
              page-break-inside: avoid;
            }

            .print-page h1,
            .print-page h2,
            .print-page h3 {
              break-after: avoid;
              page-break-after: avoid;
            }

            .print-page pre {
              white-space: pre-wrap;
              overflow-wrap: anywhere;
            }

            @media print {
              html,
              body {
                width: 210mm;
                margin: 0 !important;
                padding: 0 !important;
              }
            }
          </style>
        </head>

        <body>
          <main id="print-root"></main>
        </body>
      </html>
    `);

    printDocument.close();

    const printRoot = printDocument.getElementById('print-root');

    if (!printRoot) {
      throw new Error('Could not create the print document.');
    }

    // Copy each existing assignment page into the print document.
    const pages = Array.from(element.children);

    if (pages.length === 0) {
      throw new Error('The assignment contains no pages to export.');
    }

    pages.forEach(page => {
      const pageClone = printDocument.createElement('section');

      pageClone.className = 'print-page';
      pageClone.innerHTML = page.innerHTML;

      printRoot.appendChild(pageClone);
    });

    // Copy application stylesheets so existing cover-page styling survives.
    for (const stylesheet of Array.from(document.styleSheets)) {
      try {
        const rules = Array.from(stylesheet.cssRules)
          .map(rule => rule.cssText)
          .join('\n');

        if (rules) {
          const style = printDocument.createElement('style');
          style.textContent = rules;
          printDocument.head.appendChild(style);
        }
      } catch {
        // Cross-origin stylesheets cannot always be read.
        if (stylesheet.href) {
          const link = printDocument.createElement('link');
          link.rel = 'stylesheet';
          link.href = stylesheet.href;
          printDocument.head.appendChild(link);
        }
      }
    }

    // Give external stylesheets time to load.
    await Promise.all(
      Array.from(printDocument.querySelectorAll('link[rel="stylesheet"]')).map(
        link =>
          new Promise<void>(resolve => {
            link.addEventListener('load', () => resolve(), { once: true });
            link.addEventListener('error', () => resolve(), { once: true });
            window.setTimeout(resolve, 3000);
          })
      )
    );

    // Wait for images to finish loading.
    await Promise.all(
      Array.from(printDocument.images).map(image => {
        if (image.complete) return Promise.resolve();

        return new Promise<void>(resolve => {
          image.addEventListener('load', () => resolve(), { once: true });
          image.addEventListener('error', () => resolve(), { once: true });
          window.setTimeout(resolve, 3000);
        });
      })
    );

    await new Promise<void>(resolve => {
      printWindow.requestAnimationFrame(() => resolve());
    });

    // The browser opens its native print dialog.
    printWindow.focus();
    printWindow.print();
  } catch (error) {
    console.error('PDF export failed:', error);

    toast.error('Could not prepare the assignment for printing.');

    throw error;
  } finally {
    // Keep the frame alive while the print dialog is open.
    // It is removed when the dialog closes.
    if (printFrame) {
      const frame = printFrame;

      const cleanup = () => {
        frame.remove();
      };

      if (frame.contentWindow) {
        frame.contentWindow.addEventListener('afterprint', cleanup, {
          once: true,
        });

        window.setTimeout(cleanup, 120_000);
      } else {
        cleanup();
      }
    }
  }
}

// ***********************************************************

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
