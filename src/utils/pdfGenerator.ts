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
  image?: string;
}

export function generateSecurityReportPDF(
  score: number,
  vectores: PDFVectores,
  positives: string[],
  vulnerabilities: string[],
  recommendations: PDFRecommendation[],
  viviendaType: string,
  dictamen1: string,
  dictamen2: string
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

  // Metadata block (Date and Dwelling Type spaced onto separate lines to guarantee NO overlap)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85); // slate-700
  doc.text('Instalación Evaluada:', MARGIN_LEFT, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text(viviendaType, MARGIN_LEFT + 38, y);

  y += 5.5;

  const dateStr = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85);
  doc.text('Fecha Diagnóstico:', MARGIN_LEFT, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(dateStr, MARGIN_LEFT + 38, y);

  y += 6;
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.5);
  doc.line(MARGIN_LEFT, y, PAGE_WIDTH - MARGIN_LEFT, y);

  // Position scorecard container deterministic and clean
  y = 86;

  // General Score Card & Risk Indicator Side by Side
  // Left: Score Container
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(241, 245, 249); // slate-100
  doc.setLineWidth(0.3);
  doc.roundedRect(MARGIN_LEFT, y, 75, 42, 4, 4, 'FD');

  // Score title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text('ÍNDICE DE BLINDAJE RESIDENCIAL', MARGIN_LEFT + 8, y + 9);

  // Big Score Number
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(32);
  let scoreColor: [number, number, number] = [22, 163, 74]; // Success Green
  if (score < 50) scoreColor = [220, 38, 38]; // Critical Red
  else if (score < 80) scoreColor = [202, 138, 4]; // Warning Yellow
  doc.setTextColor(...scoreColor);
  doc.text(`${score}`, MARGIN_LEFT + 8, y + 24);
  
  // Calculate text width of score while the font size is still active
  const scoreWidth = doc.getTextWidth(`${score}`);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text('/100', MARGIN_LEFT + 8 + scoreWidth + 2, y + 20);

  // Small rating text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  let lvlText = "NIVEL DE PROTECCIÓN: OPTIMIZADO";
  if (score < 50) lvlText = "NIVEL DE PROTECCIÓN: CRÍTICO";
  else if (score < 80) lvlText = "NIVEL DE PROTECCIÓN: INTERMEDIO";
  doc.text(lvlText, MARGIN_LEFT + 8, y + 35);

  // Right: Risk analysis box
  doc.setFillColor(248, 250, 252); // slate-50
  doc.roundedRect(MARGIN_LEFT + 82, y, 88, 42, 4, 4, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('ESTADO Y CONCLUSIÓN DEL DIAGNÓSTICO', MARGIN_LEFT + 88, y + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
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
  doc.text(splitConclusion, MARGIN_LEFT + 88, y + 16, { lineHeightFactor: 1.3 });

  // Draw the Vectors at fixed coordinate offset to secure Page 1 bottom spacing
  y = 140;

  // SECTION: VECTORES DE SEGURIDAD (TECHNICAL RATINGS)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('ANÁLISIS POR VECTORES TÉCNICOS', MARGIN_LEFT, y);

  y += 7;

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
    const vy = y + (index * 24);

    // Label & value
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(51, 65, 85);
    doc.text(v.label, vx, vy);
    
    const pctText = `${v.val}%`;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...v.color);
    doc.text(pctText, vx + CONTENT_WIDTH - doc.getTextWidth(pctText), vy);

    // Desc
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(v.desc, vx, vy + 4);

    // Progress bar background
    doc.setFillColor(241, 245, 249); // slate-100
    doc.roundedRect(vx, vy + 6.5, CONTENT_WIDTH, 3.5, 1.5, 1.5, 'F');

    // Progress bar value
    const fillWidth = (v.val / 100) * CONTENT_WIDTH;
    if (fillWidth > 0) {
      doc.setFillColor(...v.color);
      doc.roundedRect(vx, vy + 6.5, fillWidth, 3.5, 1.5, 1.5, 'F');
    }
  });


  // ================= PAGE 2: SISTEMAS DETECTADOS & EQUIPAMIENTO RECOMENDADO =================
  doc.addPage();
  
  // Page header banner (standard clean dark theme)
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, PAGE_WIDTH, 14, 'F');
  doc.setFillColor(37, 99, 235); // blue-600
  doc.rect(0, 0, 8, 14, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('SISTEMA EVALUADO Y PLAN DE BLINDAJE', MARGIN_LEFT, 9);
  
  y = 25;

  // Split-layout boxes for Fortalezas & Vulnerabilidades
  let col1Height = 8;
  const col1Lines: string[][] = positives.map(item => doc.splitTextToSize(`• ${item}`, 74));
  col1Lines.forEach(lines => {
    col1Height += (lines.length * 3.8) + 2.5;
  });

  let col2Height = 8;
  const col2Lines: string[][] = vulnerabilities.map(item => doc.splitTextToSize(`• ${item}`, 74));
  col2Lines.forEach(lines => {
    col2Height += (lines.length * 3.8) + 2.5;
  });

  const colBoxHeight = Math.max(col1Height, col2Height, 28);

  // Left Column: Fortalezas Card Box
  doc.setFillColor(240, 253, 244); // green-50
  doc.setDrawColor(220, 252, 231); // green-100
  doc.setLineWidth(0.3);
  doc.roundedRect(MARGIN_LEFT, y, 82, colBoxHeight, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(21, 128, 61); // green-700
  doc.text('FORTALEZAS DETECTADAS', MARGIN_LEFT + 4, y + 5.5);

  let col1Y = y + 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(21, 128, 61);
  col1Lines.forEach(lines => {
    doc.text(lines, MARGIN_LEFT + 4, col1Y, { lineHeightFactor: 1.2 });
    col1Y += (lines.length * 3.8) + 1.0;
  });

  // Right Column: Vulnerabilidades Card Box
  doc.setFillColor(254, 242, 242); // red-50
  doc.setDrawColor(254, 226, 226); // red-100
  doc.roundedRect(MARGIN_LEFT + 88, y, 82, colBoxHeight, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(185, 28, 28); // red-700
  doc.text('FACTORES DE RIESGO HALLADOS', MARGIN_LEFT + 92, y + 5.5);

  let col2Y = y + 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(153, 27, 27); // deep red-800
  col2Lines.forEach(lines => {
    doc.text(lines, MARGIN_LEFT + 92, col2Y, { lineHeightFactor: 1.2 });
    col2Y += (lines.length * 3.8) + 1.0;
  });

  y += colBoxHeight + 8;

  // PLAN DE BLINDAJE Y EQUIPAMIENTO RECOMENDADO header text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('PLAN DE BLINDAJE Y EQUIPAMIENTO RECOMENDADO', MARGIN_LEFT, y);
  y += 6;

  // Render the recommendations dynamically into Page 2
  recommendations.forEach((rec, idx) => {
    const splitReason = doc.splitTextToSize(rec.reason, CONTENT_WIDTH - 24);
    const textHeight = splitReason.length * 3.8;
    
    // Card height is calculated dynamically
    const cardHeight = 12 + textHeight + 7;
    
    // Draw Background card
    doc.setFillColor(248, 250, 252); // slate-50
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.3);
    doc.roundedRect(MARGIN_LEFT, y, CONTENT_WIDTH, cardHeight, 3, 3, 'FD');

    // Left Accent bar
    doc.setFillColor(37, 99, 235);
    doc.roundedRect(MARGIN_LEFT, y, 4, cardHeight, 3, 3, 'F');
    doc.rect(MARGIN_LEFT + 2, y, 2, cardHeight, 'F');

    // Card Badge (Priority)
    doc.setFillColor(239, 246, 255); // blue-50
    doc.setDrawColor(191, 219, 254); // blue-200
    doc.roundedRect(MARGIN_LEFT + 10, y + 3, 24, 4.5, 1, 1, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(29, 78, 216); // blue-700
    doc.text(`PROPUESTA #${idx + 1}`, MARGIN_LEFT + 12, y + 6.2);

    // Product Title Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(rec.name, MARGIN_LEFT + 38, y + 6.5);

    // justification
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105); // slate-600
    doc.text(splitReason, MARGIN_LEFT + 10, y + 11.5, { lineHeightFactor: 1.25 });

    // Clickable link line
    const linkY = y + 11.5 + textHeight + 2.5;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text("Enlace oficial de compra:", MARGIN_LEFT + 10, linkY);
    const labelWidth = doc.getTextWidth("Enlace oficial de compra: ");

    // Truncate URL if too long
    const displayUrl = rec.url.length > 55 ? `${rec.url.substring(0, 52)}...` : rec.url;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(37, 99, 235);
    doc.text(displayUrl, MARGIN_LEFT + 10 + labelWidth, linkY);
    const linkWidth = doc.getTextWidth(displayUrl);

    // Draw visual underline
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(0.15);
    doc.line(MARGIN_LEFT + 10 + labelWidth, linkY + 0.6, MARGIN_LEFT + 10 + labelWidth + linkWidth, linkY + 0.6);

    // Active hotspot link annotation
    doc.link(MARGIN_LEFT + 10 + labelWidth, linkY - 2.5, linkWidth, 3.5, { url: rec.url });

    y += cardHeight + 4.5;
  });


  // ================= PAGE 3: ANÁLISIS DE RIESGOS & DICTAMEN JURÍDICO =================
  doc.addPage();
  
  // Page header banner (standard clean dark theme)
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, PAGE_WIDTH, 14, 'F');
  doc.setFillColor(37, 99, 235); // blue-600
  doc.rect(0, 0, 8, 14, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('ANÁLISIS DE RIESGOS Y DICTAMEN JURÍDICO', MARGIN_LEFT, 9);
  
  y = 25;

  // SECTION TITLE
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('DICTAMEN TÉCNICO Y JURÍDICO DEL EXPERTO', MARGIN_LEFT, y);
  y += 6;

  // Subtitles rewritten to remove Unicode emojis (which caused &–þ rendering errors in standard PDF fonts)
  const d1Text = `[LEGISLACIÓN] Allanamiento de Morada vs Usurpación:\n${dictamen1}`;
  const d2Text = `[SABOTAJE] Respaldo ante Desconexión o Sabotaje Lumínico:\n${dictamen2}`;
  
  const splitD1 = doc.splitTextToSize(d1Text, CONTENT_WIDTH - 12);
  const splitD2 = doc.splitTextToSize(d2Text, CONTENT_WIDTH - 12);
  
  const d1Height = splitD1.length * 3.8;
  const d2Height = splitD2.length * 3.8;
  const dictamenBoxHeight = d1Height + d2Height + 14;

  // Draw dictamen container box
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.3);
  doc.roundedRect(MARGIN_LEFT, y, CONTENT_WIDTH, dictamenBoxHeight, 3, 3, 'FD');

  // Accent line
  doc.setFillColor(37, 99, 235);
  doc.rect(MARGIN_LEFT, y, 2, dictamenBoxHeight, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(51, 65, 85);
  doc.text(splitD1, MARGIN_LEFT + 6, y + 6, { lineHeightFactor: 1.35 });
  
  doc.setDrawColor(241, 245, 249);
  doc.line(MARGIN_LEFT + 6, y + d1Height + 7, MARGIN_LEFT + CONTENT_WIDTH - 6, y + d1Height + 7);

  doc.text(splitD2, MARGIN_LEFT + 6, y + d1Height + 11, { lineHeightFactor: 1.35 });

  y += dictamenBoxHeight + 8;

  // Shortened legal disclaimer and affiliate text
  const legalDisclaimer = "AVISO IMPORTANTE Y EXCLUSIÓN DE RESPONSABILIDAD: Este pre-diagnóstico técnico es de carácter estrictamente informativo y preventivo. Todas las recomendaciones se basan en mis conocimientos técnicos y experiencias prácticas en el sector, por lo que constituyen únicamente una guía de orientación conceptual. No sustituyen de ninguna manera la visita técnica ni la auditoría formal de seguridad que una empresa o profesional homologado de ese tipo deba realizar directamente en su propiedad.";
  const splitDisclaimer = doc.splitTextToSize(legalDisclaimer, CONTENT_WIDTH - 12);
  const legalHeight = (splitDisclaimer.length * 3.8) + 9;

  const affiliateDisclaimer = "Fredys Matos Borges participa en el Programa de Afiliados de Amazon EU, un programa de publicidad para afiliados diseñado para ofrecer a sitios web un modo de obtener comisiones por publicidad, publicitando e incluyendo enlaces a Amazon.es. Como Afiliado de Amazon, percibo ingresos por las compras adscritas que cumplen los requisitos aplicables.";
  const splitAffiliate = doc.splitTextToSize(affiliateDisclaimer, CONTENT_WIDTH - 12);
  const affiliateHeight = (splitAffiliate.length * 3.8) + 9;

  // Draw Legal Disclaimer Box
  doc.setFillColor(15, 23, 42); // slate-900 deep dark
  doc.roundedRect(MARGIN_LEFT, y, CONTENT_WIDTH, legalHeight, 2, 2, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('Aclaración Jurídico-Técnica Importante', MARGIN_LEFT + 6, y + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text(splitDisclaimer, MARGIN_LEFT + 6, y + 10, { lineHeightFactor: 1.35 });

  y += legalHeight + 5;

  // Draw Amazon Affiliate Disclaimer Box dynamically under it
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.3);
  doc.roundedRect(MARGIN_LEFT, y, CONTENT_WIDTH, affiliateHeight, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('DIVULGACIÓN DE AFILIADOS DE AMAZON', MARGIN_LEFT + 6, y + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text(splitAffiliate, MARGIN_LEFT + 6, y + 10, { lineHeightFactor: 1.35 });

  // Post-Process All Generated Pages to stamping beautiful footer numbering labels sequentially on each page!
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    drawFooter(i, totalPages);
  }

  // Save the final generated PDF document
  doc.save('Auditoria_Seguridad_Express_Escudo_TISA.pdf');
}
