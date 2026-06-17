import { jsPDF } from 'jspdf';

interface PDFVectores {
  fisico: number;
  deteccion: number;
  resiliencia: number;
}

interface PDFRecommendation {
  name: string;
  reason: string;
  url: string;
}

export function generateSecurityReportPDF(
  score: number,
  vectores: PDFVectores,
  positives: string[],
  vulnerabilities: string[],
  recommendations: PDFRecommendation[],
  viviendaType: string
) {
  // Create PDF document (A4, portrait, millimeters)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const PAGE_WIDTH = 210;
  const PAGE_HEIGHT = 297;
  const MARGIN_LEFT = 20;
  const CONTENT_WIDTH = PAGE_WIDTH - (MARGIN_LEFT * 2); // 170 mm

  // Helper for drawing footers on each page at the end of document processing
  const drawFooter = (pageNum: number, totalPages: number) => {
    doc.setPage(pageNum);
    doc.setDrawColor(229, 231, 235); // border-gray-200
    doc.setLineWidth(0.3);
    doc.line(MARGIN_LEFT, PAGE_HEIGHT - 20, PAGE_WIDTH - MARGIN_LEFT, PAGE_HEIGHT - 20);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175); // gray-400
    
    // Left text
    doc.text('AUDITORÍA DE SEGURIDAD EXPRESS • ESCUDO TISA', MARGIN_LEFT, PAGE_HEIGHT - 14);
    
    // Right text
    const pageText = `Página ${pageNum} de ${totalPages}`;
    doc.text(pageText, PAGE_WIDTH - MARGIN_LEFT - doc.getTextWidth(pageText), PAGE_HEIGHT - 14);
  };

  // Helper for text wrapping and keeping track of Y
  let y = 15;

  // PAGE 1: HEADER & GENERAL DASHBOARD
  
  // Background Header Accent Banner
  doc.setFillColor(15, 23, 42); // slate-900 (dark corporate navy)
  doc.rect(0, 0, PAGE_WIDTH, 48, 'F');

  // Decorative blue corner mark
  doc.setFillColor(37, 99, 235); // blue-600 (TISA Blue)
  doc.rect(0, 0, 8, 48, 'F');

  // Brand Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text('TISA SEGURIDAD • ESCUDO TISA', MARGIN_LEFT, 18);

  // Subtitle banner text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text('SISTEMAS PROFESIONALES Y DIAGNÓSTICO AVANZADO', MARGIN_LEFT, 24);

  // Big Banner Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text('AUDITORÍA DE SEGURIDAD EXPRESS', MARGIN_LEFT, 38);

  y = 60;

  // Metadata block (Date and Dwelling Type)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85); // slate-700
  doc.text('Instalación Evaluada:', MARGIN_LEFT, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text(viviendaType, MARGIN_LEFT + 42, y);

  const dateStr = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85);
  doc.text('Fecha Diagnóstico:', MARGIN_LEFT + 85, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(dateStr, MARGIN_LEFT + 120, y);

  y += 6;
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.5);
  doc.line(MARGIN_LEFT, y, PAGE_WIDTH - MARGIN_LEFT, y);

  y += 15;

  // General Score Card & Risk Indicator Side by Side
  // Left: Score Container
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(241, 245, 249); // slate-100
  doc.setLineWidth(0.3);
  doc.roundedRect(MARGIN_LEFT, y, 75, 45, 4, 4, 'FD');

  // Score title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text('ÍNDICE DE BLINDAJE RESIDENCIAL', MARGIN_LEFT + 8, y + 10);

  // Big Score Number
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(36);
  let scoreColor: [number, number, number] = [22, 163, 74]; // Success Green
  if (score < 50) scoreColor = [220, 38, 38]; // Critical Red
  else if (score < 80) scoreColor = [202, 138, 4]; // Warning Yellow
  doc.setTextColor(...scoreColor);
  doc.text(`${score}`, MARGIN_LEFT + 8, y + 26);
  
  // Calculate text width of score while the font size is still active at 36, preventing overlap!
  const scoreWidth = doc.getTextWidth(`${score}`);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(148, 163, 184); // slate-400
  // Position /100 accurately to the right of the score width with generous margin
  doc.text('/100', MARGIN_LEFT + 8 + scoreWidth + 2, y + 21);

  // Small rating text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  let lvlText = "NIVEL DE PROTECCIÓN: OPTIMIZADO";
  if (score < 50) lvlText = "NIVEL DE PROTECCIÓN: CRÍTICO";
  else if (score < 80) lvlText = "NIVEL DE PROTECCIÓN: INTERMEDIO";
  doc.text(lvlText, MARGIN_LEFT + 8, y + 38);

  // Right: Risk analysis box
  doc.setFillColor(248, 250, 252); // slate-50
  doc.roundedRect(MARGIN_LEFT + 82, y, 88, 45, 4, 4, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('ESTADO Y CONCLUSIÓN DEL DIAGNÓSTICO', MARGIN_LEFT + 88, y + 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105); // slate-600

  // Wrap conclusion text
  let conclusionText = "";
  if (score < 50) {
    conclusionText = "La vivienda presenta importantes puntos ciegos estructurales y de comunicación que facilitan el acceso furtivo y asaltos organizados sin detección local o remota inmediata.";
  } else if (score < 80) {
    conclusionText = "Se ha implantado equipamiento preventivo básico, pero existen fallas notorias en la resiliencia redundante y en sensores de accesos que merecen solventarse urgentemente.";
  } else {
    conclusionText = "Gran preparación técnica y tecnológica instalada. Las protecciones activas y pasivas cumplen ampliamente los estándares requeridos. Se aconseja mantenimiento periódico.";
  }
  const splitConclusion = doc.splitTextToSize(conclusionText, 76);
  doc.text(splitConclusion, MARGIN_LEFT + 88, y + 18, { lineHeightFactor: 1.35 });

  y += 56;

  // SECTION: VECTORES DE SEGURIDAD (TECHNICAL RATINGS)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('ANÁLISIS POR VECTORES TÉCNICOS', MARGIN_LEFT, y);

  y += 8;

  // Render 3 vectors side by side as beautiful bars
  const vectors = [
    { 
      label: 'Vector I: Resistencia Física', 
      val: vectores.fisico, 
      desc: 'Blindaje físico de la puerta de entrada, marcos, ventanas y disuasión exterior.',
      color: [37, 99, 235] as [number, number, number] // Blue
    },
    { 
      label: 'Vector II: Detección y Alerta', 
      val: vectores.deteccion, 
      desc: 'Funcionamiento de alarmas conectadas a central, CCTV 24/7 y mandos interactivos.',
      color: [245, 158, 11] as [number, number, number] // Amber
    },
    { 
      label: 'Vector III: Resiliencia y Autonomía', 
      val: vectores.resiliencia, 
      desc: 'Capacidad de soportar sabotaje eléctrico o cortes, zonas críticas y ausencias.',
      color: [147, 51, 234] as [number, number, number] // Purple
    }
  ];

  vectors.forEach((v, index) => {
    const vx = MARGIN_LEFT;
    const vy = y + (index * 26);

    // Label & value
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    doc.text(v.label, vx, vy);
    
    const pctText = `${v.val}%`;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...v.color);
    doc.text(pctText, vx + CONTENT_WIDTH - doc.getTextWidth(pctText), vy);

    // Desc
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(v.desc, vx, vy + 4);

    // Progress bar background
    doc.setFillColor(241, 245, 249); // slate-100
    doc.roundedRect(vx, vy + 7, CONTENT_WIDTH, 4, 2, 2, 'F');

    // Progress bar value
    const fillWidth = (v.val / 100) * CONTENT_WIDTH;
    if (fillWidth > 0) {
      doc.setFillColor(...v.color);
      doc.roundedRect(vx, vy + 7, fillWidth, 4, 2, 2, 'F');
    }
  });

  y += 82;

  // SECTION: FORTALEZAS (POSITIVOS ENCONTRADOS)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(22, 163, 74); // green-600
  doc.text('SISTEMA PREVENTIVO DETECTADO (FORTALEZAS)', MARGIN_LEFT, y);

  y += 8;

  const drawBulletItem = (textStr: string, isPositive: boolean) => {
    const splitText = doc.splitTextToSize(textStr, CONTENT_WIDTH - 14);
    const lineHeight = 4.0;
    const padding = 5;
    const boxHeight = (splitText.length * lineHeight) + padding;

    // Check page overflow
    if (y + boxHeight > PAGE_HEIGHT - 25) {
      doc.addPage();
      
      // Page header banner
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 0, PAGE_WIDTH, 14, 'F');
      doc.setFillColor(37, 99, 235); // blue-600
      doc.rect(0, 0, 8, 14, 'F');
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.text('AUDITORÍA DE SEGURIDAD DETALLADA', MARGIN_LEFT, 9);
      
      y = 25;
    }

    const bgColor = (isPositive ? [240, 253, 244] : [255, 247, 237]) as [number, number, number];
    const borderColor = (isPositive ? [220, 252, 231] : [254, 215, 170]) as [number, number, number];
    const bulletColor = (isPositive ? [34, 197, 94] : [249, 115, 22]) as [number, number, number];
    const textColor = (isPositive ? [21, 128, 61] : [194, 65, 12]) as [number, number, number];

    doc.setFillColor(...bgColor);
    doc.setDrawColor(...borderColor);
    doc.setLineWidth(0.3);
    doc.roundedRect(MARGIN_LEFT, y, CONTENT_WIDTH, boxHeight, 2, 2, 'FD');

    // Drawer bullet mark
    doc.setFillColor(...bulletColor);
    doc.rect(MARGIN_LEFT + 2, y + 2.5, 2, boxHeight - 5, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...textColor);
    doc.text(splitText, MARGIN_LEFT + 8, y + 5.5, { lineHeightFactor: 1.15 });

    y += boxHeight + 4;
  };

  positives.forEach((posText) => {
    drawBulletItem(posText, true);
  });

  // Ensure spacing before vulnerabilities
  y += 5;

  // SECTION: VULNERABILIDADES HALLADAS
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(194, 65, 12); // orange-700
  
  if (y + 12 > PAGE_HEIGHT - 25) {
    doc.addPage();
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, PAGE_WIDTH, 14, 'F');
    doc.setFillColor(37, 99, 235); // blue-600
    doc.rect(0, 0, 8, 14, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text('AUDITORÍA DE SEGURIDAD DETALLADA', MARGIN_LEFT, 9);
    y = 25;
  }
  
  doc.text('FACTORES DE RIESGO Y CRÍTICAS HALLADAS', MARGIN_LEFT, y);
  y += 8;

  vulnerabilities.forEach((vulnText) => {
    drawBulletItem(vulnText, false);
  });

  y += 5;

  // SECTION: RECOMENDACIONES DE BLINDAJE PERSONALIZADO
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42); // slate-900
  
  if (y + 12 > PAGE_HEIGHT - 25) {
    doc.addPage();
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, PAGE_WIDTH, 14, 'F');
    doc.setFillColor(37, 99, 235); // blue-600
    doc.rect(0, 0, 8, 14, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text('PLAN DE BLINDAJE Y EQUIPAMIENTO RECOMENDADO', MARGIN_LEFT, 9);
    y = 25;
  }
  
  doc.text('PLAN DE BLINDAJE Y EQUIPAMIENTO RECOMENDADO', MARGIN_LEFT, y);
  y += 8;

  // Render the recommendations dynamically to prevent any layout or page overlaps!
  recommendations.forEach((rec, idx) => {
    const splitReason = doc.splitTextToSize(rec.reason, CONTENT_WIDTH - 24);
    const textHeight = splitReason.length * 4.2; // 4.2 mm per line of text
    
    // Bottom height: card layout with badge and the affiliate links
    const cardHeight = 14 + textHeight + 8 + 6;
    
    // Overflow check
    if (y + cardHeight > PAGE_HEIGHT - 25) {
      doc.addPage();
      
      // Page banner
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 0, PAGE_WIDTH, 14, 'F');
      doc.setFillColor(37, 99, 235); // blue-600
      doc.rect(0, 0, 8, 14, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.text('PLAN DE BLINDAJE y RECOMENDACIONES', MARGIN_LEFT, 9);
      
      y = 25;
    }

    // Draw Background card
    doc.setFillColor(248, 250, 252); // slate-50
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.3);
    doc.roundedRect(MARGIN_LEFT, y, CONTENT_WIDTH, cardHeight, 4, 4, 'FD');

    // Left Accent bar (TISA blue)
    doc.setFillColor(37, 99, 235);
    doc.roundedRect(MARGIN_LEFT, y, 6, cardHeight, 4, 4, 'F');
    doc.rect(MARGIN_LEFT + 3, y, 3, cardHeight, 'F'); // fix rounding on right edge

    // Card Badge (Priority)
    doc.setFillColor(239, 246, 255); // blue-50
    doc.setDrawColor(191, 219, 254); // blue-200
    doc.roundedRect(MARGIN_LEFT + 12, y + 4, 28, 5, 1, 1, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(29, 78, 216); // blue-700
    doc.text(`PROPUESTA #${idx + 1}`, MARGIN_LEFT + 14, y + 7.5);

    // Product Title Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(rec.name, MARGIN_LEFT + 43, y + 8);

    // Technical justification
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105); // slate-600
    doc.text(splitReason, MARGIN_LEFT + 12, y + 15, { lineHeightFactor: 1.35 });

    // Clickable amazon affiliate link line
    const linkY = y + 15 + textHeight + 3.5;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text("Enlace oficial de compra:", MARGIN_LEFT + 12, linkY);
    const labelWidth = doc.getTextWidth("Enlace oficial de compra: ");

    // Truncate URL if too long for design
    const displayUrl = rec.url.length > 55 ? `${rec.url.substring(0, 52)}...` : rec.url;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(37, 99, 235); // Blue-600 TISA click link
    doc.text(displayUrl, MARGIN_LEFT + 12 + labelWidth, linkY);
    const linkWidth = doc.getTextWidth(displayUrl);

    // Visual underline
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(0.15);
    doc.line(MARGIN_LEFT + 12 + labelWidth, linkY + 0.8, MARGIN_LEFT + 12 + labelWidth + linkWidth, linkY + 0.8);

    // Clickable Link hotspot annotation (exactly on the display url text width)
    doc.link(MARGIN_LEFT + 12 + labelWidth, linkY - 2.5, linkWidth, 3.8, { url: rec.url });

    y += cardHeight + 5;
  });

  y += 5;

  // CONCLUDING DISMISSAL BOX & AMAZON AFFILIATE LEAGUE DISCLAIMER
  const legalDisclaimer = "Este reporte representa un pre-diagnóstico preventivo automatizado basado en protocolos de intrusión habituales en España. Para formalizar un plan de protección definitiva y solicitar una inspección física detallada sin coste, póngase en contacto con un asesor certificado del Escudo TISA.";
  const splitDisclaimer = doc.splitTextToSize(legalDisclaimer, CONTENT_WIDTH - 12);
  const legalHeight = (splitDisclaimer.length * 3.8) + 9;

  const affiliateDisclaimer = "Fredys Matos Borges participa en el Programa de Afiliados de Amazon EU, un programa de publicidad para afiliados diseñado para ofrecer a sitios web un modo de obtener comisiones por publicidad, publicitando e incluyendo enlaces a Amazon.es. Como Afiliado de Amazon, percibo ingresos por las compras adscritas que cumplen los requisitos aplicables.";
  const splitAffiliate = doc.splitTextToSize(affiliateDisclaimer, CONTENT_WIDTH - 12);
  const affiliateHeight = (splitAffiliate.length * 3.8) + 9;

  const totalBottomHeight = legalHeight + affiliateHeight + 8;
  
  if (y + totalBottomHeight > PAGE_HEIGHT - 25) {
    doc.addPage();
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, PAGE_WIDTH, 14, 'F');
    doc.setFillColor(37, 99, 235); // blue-600
    doc.rect(0, 0, 8, 14, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text('ANEXOS LEGALES Y DE AFILIADOS', MARGIN_LEFT, 9);
    y = 25;
  }

  // Draw Legal Disclaimer Box
  doc.setFillColor(15, 23, 42); // slate-900 deep
  doc.roundedRect(MARGIN_LEFT, y, CONTENT_WIDTH, legalHeight, 2, 2, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('NOTA INFORMATIVA JURÍDICO-TÉCNICA', MARGIN_LEFT + 6, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text(splitDisclaimer, MARGIN_LEFT + 6, y + 11, { lineHeightFactor: 1.3 });

  y += legalHeight + 4;

  // Draw Amazon Affiliate Disclaimer Box dynamically under it
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.3);
  doc.roundedRect(MARGIN_LEFT, y, CONTENT_WIDTH, affiliateHeight, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('DIVULGACIÓN DE AFILIADOS DE AMAZON', MARGIN_LEFT + 6, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text(splitAffiliate, MARGIN_LEFT + 6, y + 11, { lineHeightFactor: 1.3 });

  // Post-Process All Generated Pages to stamping beautiful footer numbering labels sequentially on each page!
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    drawFooter(i, totalPages);
  }

  // Save the final generated PDF document
  doc.save('Auditoria_Seguridad_Express_Escudo_TISA.pdf');
}
