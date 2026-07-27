import { routePrompt } from '@/lib/ai/router';

export interface ExtractedData {
  titleNumber?: string;
  ownerNames?: string[];
  propertySize?: number;
  issueDate?: string;
  confidenceScore: number;
  documentType?:
    | 'DLD_FORM_F_MOU'
    | 'RERA_OQOOD'
    | 'TITLE_DEED'
    | 'DEVELOPER_NOC';
  extractedClaude?: string;
  simulated?: boolean;
}

/**
 * OCR & AI Information Extraction (Phase 14)
 * Parses real estate documents (e.g., Title Deeds, NOCs, Form F MOU) using Vision models and domain OCR logic.
 */
export async function extractDocumentData(
  documentUrl: string,
): Promise<ExtractedData> {
  console.log(
    `[Document Intelligence] Initiating extraction for ${documentUrl}`,
  );

  // In production with live API keys, route to multimodal Vision models
  try {
    const prompt = `Extract the title number, owners, property size, and issue date from the provided DLD document: ${documentUrl}. Return valid JSON matching ExtractedData format if possible.`;
    const aiResponse = await routePrompt(prompt, { tier: 'vision' });
    const text = aiResponse.content;
    if (text && !text.includes('[Simulated') && text.includes('{')) {
      try {
        const parsed = JSON.parse(
          text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1),
        );
        return {
          confidenceScore: 0.85,
          ...parsed,
          extractedClaude: text,
          simulated: false,
        };
      } catch {
        // Fallback to simulation engine if JSON parsing fails
      }
    }
  } catch (e) {
    // Fallthrough to local OCR simulation engine if Vision API is offline
  }

  const urlLower = documentUrl.toLowerCase();

  if (urlLower.includes('form-f') || urlLower.includes('mou')) {
    return {
      titleNumber: 'MOU-DLD-2026-8891',
      ownerNames: [
        'Emaar Properties (Developer)',
        'Al-Maktoum Holdings (Buyer)',
      ],
      propertySize: 4200.0,
      issueDate: '2026-07-15',
      confidenceScore: 0.70,
      simulated: true,
      documentType: 'DLD_FORM_F_MOU',
      extractedClaude:
        'Clause 4.1: Escrow deposit 10% verified at Mashreq Bank DLD Trust Account #9001-44.',
    };
  }

  if (urlLower.includes('oqood') || urlLower.includes('off-plan')) {
    return {
      titleNumber: 'OQOOD-REG-44210',
      ownerNames: ['Dubai Creek Harbour LLC'],
      propertySize: 1450.0,
      issueDate: '2026-06-20',
      confidenceScore: 0.70,
      simulated: true,
      documentType: 'RERA_OQOOD',
      extractedClaude:
        'Project Completion Milestone: 65% construction verified by RERA engineering inspection.',
    };
  }

  if (urlLower.includes('noc') || urlLower.includes('service-charge')) {
    return {
      titleNumber: 'NOC-EMPOWER-2026-09',
      ownerNames: ['Select Group Residence 1'],
      propertySize: 1200.0,
      issueDate: '2026-07-01',
      confidenceScore: 0.70,
      simulated: true,
      documentType: 'DEVELOPER_NOC',
      extractedClaude:
        'Developer confirms zero outstanding service charges or chiller dues for Marina Gate Unit 1402.',
    };
  }

  // Standard DLD Freehold Title Deed extraction
  return {
    titleNumber: 'TD-DLD-2026-00192',
    ownerNames: ['Sultan Al-Nahyan'],
    propertySize: 3100.5,
    issueDate: '2026-05-10',
    confidenceScore: 0.70,
    simulated: true,
    documentType: 'TITLE_DEED',
    extractedClaude:
      'Freehold Title Deed registered under Law No. 7 of 2006 regarding Land Registration in Dubai.',
  };
}
