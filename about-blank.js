// This script will be loaded in the new 'about:blank' window.
// It relies on XLSX and jsPDF libraries being loaded BEFORE it in the HTML.

// Ensure XLSX and jsPDF are loaded. These lines are crucial if the HTML itself doesn't load them.
// In our case, the HTML will load them via <script src="..."> tags, so these checks are for safety.
if (typeof XLSX === 'undefined') {
    console.error("XLSX library not loaded. Please ensure https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js is loaded in the HTML.");
}
if (typeof jspdf === 'undefined') {
    console.error("jsPDF library not loaded. Please ensure https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js is loaded in the HTML.");
}

document.addEventListener('DOMContentLoaded', function() {
    const reportTable = document.getElementById('reportTable');
    const reportHeaderDiv = document.querySelector('.saved-data-report-header');
    
    // Safely get report title and date
    const reportTitle = reportHeaderDiv && reportHeaderDiv.querySelector('.saved-data-report-title-main') 
                        ? reportHeaderDiv.querySelector('.saved-data-report-title-main').textContent 
                        : "التقرير";
    const reportDate = reportHeaderDiv && reportHeaderDiv.querySelector('.saved-data-report-date-line') 
                       ? reportHeaderDiv.querySelector('.saved-data-report-date-line').textContent.replace('عن يوم الموافق ', '').trim() 
                       : "تاريخ غير محدد";

    // Function to export as Excel
    document.getElementById('exportExcel').addEventListener('click', function() {
        if (!reportTable) {
            alert('لا يوجد جدول لتصديره.');
            return;
        }
        if (typeof XLSX === 'undefined') {
            alert('مكتبة XLSX غير محملة. يرجى التأكد من اتصال الإنترنت أو تضمين المكتبة بشكل صحيح.');
            return;
        }
        const ws = XLSX.utils.table_to_sheet(reportTable);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "التقرير");
        XLSX.writeFile(wb, reportTitle + " - " + reportDate + ".xlsx");
    });

    // Function to export as PDF
    document.getElementById('exportPdf').addEventListener('click', function() {
        if (typeof jspdf === 'undefined') {
            alert('مكتبة jsPDF غير محملة. يرجى التأكد من اتصال الإنترنت أو تضمين المكتبة بشكل صحيح.');
            return;
        }
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({ orientation: 'l', unit: 'pt', format: 'a4' });
        
        // Clone the body to remove buttons before converting to PDF
        const contentToPdf = document.body.cloneNode(true);
        const buttonsContainer = contentToPdf.querySelector('.export-buttons-container');
        if (buttonsContainer) {
            buttonsContainer.remove();
        }

        pdf.html(contentToPdf, { 
            callback: function (doc) {
                doc.save(reportTitle + " - " + reportDate + ".pdf");
            },
            x: 15, y: 15,
            html2canvas: { 
                scale: 0.65, 
                useCORS: true, 
                logging: true, 
                letterRendering: true, 
                windowWidth: contentToPdf.scrollWidth, // Use cloned body's scrollWidth
                windowHeight: contentToPdf.scrollHeight // Use cloned body's scrollHeight
            },
            width: pdf.internal.pageSize.getWidth() - 30,
            windowWidth: contentToPdf.scrollWidth 
        });
    });

    // Function to export as Word (HTML to DOC hack)
    document.getElementById('exportWord').addEventListener('click', function() {
        if (!reportTable || !reportHeaderDiv) {
            alert('لا يوجد محتوى لتصديره كـ Word.');
            return;
        }
        const tableContent = reportTable.outerHTML;
        const headerContent = reportHeaderDiv.outerHTML; // محتوى الرأس
        const fileName = reportTitle + " - " + reportDate + ".doc";
        
        // Collect relevant CSS from the current document
        let css = '';
        const styleElements = document.querySelectorAll('style');
        styleElements.forEach(style => {
            css += style.innerHTML;
        });

        const htmlDoc = `
            <html xmlns:v="urn:schemas-microsoft-com:vml"
            xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:w="urn:schemas-microsoft-com:office:word"
            xmlns:m="http://schemas.microsoft.com/office/2004/12/omml"
            xmlns="http://www.w3.org/TR/REC-html40">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <meta name=ProgId content=Word.Document>
                <meta name=Generator content="Microsoft Word 15">
                <meta name=Originator content="Microsoft Word 15">
                <style>
                    ${css} /* تضمين الـ CSS المجمع هنا */
                </style>
            </head>
            <body dir="rtl">
                ${headerContent}
                ${tableContent}
            </body>
            </html>
        `;

        const blob = new Blob([htmlDoc], { type: 'application/msword;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});