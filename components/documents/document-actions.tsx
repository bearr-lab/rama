'use client';

import * as React from 'react';
import {
  Upload,
  Loader2,
  Sparkles,
  CheckCircle2,
  FilePlus,
  ChevronDown,
  FileText,
  FileCode2,
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { extractDocumentData, ExtractedData } from '@/lib/documents/extractor';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function DocumentActions() {
  // Upload State
  const [file, setFile] = React.useState<File | null>(null);
  const [isExtracting, setIsExtracting] = React.useState(false);
  const [extractedResult, setExtractedResult] = React.useState<ExtractedData | null>(null);

  // Creation State
  const [isCreating, setIsCreating] = React.useState(false);
  const [createdDoc, setCreatedDoc] = React.useState<string | null>(null);
  const [docType, setDocType] = React.useState('form_f');

  const handleExportPDF = () => {
    if (!createdDoc) return;
    const doc = new jsPDF();
    doc.setFontSize(10);
    const splitText = doc.splitTextToSize(createdDoc, 180);
    doc.text(splitText, 15, 20);
    doc.save(`RAMA_Draft_${docType}_${new Date().getTime()}.pdf`);
  };

  const handleExportDOCX = () => {
    if (!createdDoc) return;
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word Document</title></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + `<div style="font-family: Arial, sans-serif; white-space: pre-wrap;">${createdDoc}</div>` + footer;
    
    const blob = new Blob(['\ufeff', sourceHTML], {
        type: 'application/msword'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RAMA_Draft_${docType}_${new Date().getTime()}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle Drag & Drop Upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setIsExtracting(true);
    setExtractedResult(null);
    
    // Simulate reading file and extracting via OCR
    try {
      // Re-use the existing mock extractor which normally takes a URL
      const res = await extractDocumentData('local_file_upload_' + selectedFile.name);
      setExtractedResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExtracting(false);
    }
  };

  // Handle Create Document Workflow
  const handleCreateDocument = async () => {
    setIsCreating(true);
    setCreatedDoc(null);
    // Simulate AI generation time
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mocked generated content based on type
    let mockContent = '';
    if (docType === 'form_f') {
      mockContent = "MEMORANDUM OF UNDERSTANDING (FORM F)\n\nThis Agreement is made on this day between BUYER and SELLER...\n\nPROPERTY: Dubai Marina, Unit 1402\nPRICE: AED 2,500,000\nDEPOSIT: 10%";
    } else {
      mockContent = "NO OBJECTION CERTIFICATE (NOC)\n\nDeveloper: Emaar Properties\nThis is to certify that there are no outstanding service charges on the specified unit.";
    }
    
    setCreatedDoc(mockContent);
    setIsCreating(false);
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {/* LEFT: Upload & Analyze Zone */}
      <div className="shadow-subtle flex flex-1 flex-col rounded-none border border-border bg-surface p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-fjord" />
            <h3 className="text-h3 font-display font-bold text-ink">
              Analyze Document
            </h3>
          </div>
          <span className="text-caption font-semibold text-muted-foreground">
            AI OCR Support
          </span>
        </div>

        {/* Drag & Drop Upload Area */}
        <div className="relative flex w-full flex-col items-center justify-center border-2 border-dashed border-border/60 bg-surface-subtle py-8 transition-colors hover:border-fjord/50">
          <input 
            type="file" 
            className="absolute inset-0 z-10 cursor-pointer opacity-0"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileChange}
            disabled={isExtracting}
          />
          {isExtracting ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="size-8 animate-spin text-fjord" />
              <p className="font-mono text-sm font-bold text-ink">Running AI OCR...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-center">
              <Upload className="size-8 text-muted-foreground" />
              <p className="font-sans text-sm font-bold text-ink">
                {file ? file.name : "Drag & Drop DLD PDF here"}
              </p>
              <p className="font-sans text-xs text-muted-foreground">
                or click to browse local files
              </p>
            </div>
          )}
        </div>

        {/* Extracted Results display */}
        {extractedResult && (
          <div className="animate-in fade-in mt-4 space-y-3 rounded-none border border-border bg-surface-subtle p-4 duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500" />
                <span className="text-body-sm font-display font-bold text-ink">
                  {extractedResult.documentType || 'DLD Document'}
                </span>
              </div>
              <span className="rounded-none border border-fjord/20 bg-fjord/5 px-2 py-0.5 font-mono text-xs font-bold text-fjord">
                Score: {Math.round(extractedResult.confidenceScore * 100)}%
              </span>
            </div>

            {extractedResult.extractedClaude && (
              <div className="flex items-start gap-2 border-t border-border pt-3 text-xs text-ink">
                <Sparkles className="mt-0.5 size-3 shrink-0 text-fjord" />
                <span className="leading-relaxed text-muted-foreground">
                  {extractedResult.extractedClaude}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT: Create Document Zone */}
      <div className="shadow-subtle flex flex-1 flex-col justify-between rounded-none border border-border bg-surface p-6">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <FilePlus className="size-5 text-fjord" />
            <h3 className="text-h3 font-display font-bold text-ink">
              Create Document
            </h3>
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            Instantly draft verified DLD Form F MOUs, No Objection Certificates, and legally-binding Tenancy Contracts using our AI generation engine.
          </p>
        </div>

        <Dialog>
          <DialogTrigger render={
            <Button className="mt-6 w-full rounded-none bg-fjord text-white hover:bg-fjord-hover">
              <Sparkles className="mr-2 size-4" />
              Start Drafting
            </Button>
          } />
          <DialogContent className="max-w-2xl border-none bg-surface p-0 sm:rounded-none">
            <div className="border-b border-border p-6">
              <DialogTitle className="font-display text-2xl font-bold text-ink">Draft Legal Document</DialogTitle>
              <DialogDescription className="font-sans text-sm text-muted-foreground">
                Select the type of document you need to generate. The AI will cross-reference the Dubai Land Department regulations.
              </DialogDescription>
            </div>
            
            <div className="p-6">
              <div className="mb-6 flex gap-4">
                <select 
                  className="flex-1 rounded-none border border-border bg-surface-subtle p-3 text-sm text-ink focus:border-fjord focus:outline-none"
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  disabled={isCreating || !!createdDoc}
                >
                  <option value="form_f">DLD Memorandum of Understanding (Form F)</option>
                  <option value="noc">Developer No Objection Certificate (NOC)</option>
                  <option value="tenancy">Unified Tenancy Contract</option>
                </select>
                
                {!createdDoc && (
                  <Button 
                    onClick={handleCreateDocument} 
                    disabled={isCreating}
                    className="rounded-none bg-fjord px-8 text-white hover:bg-fjord-hover"
                  >
                    {isCreating ? <Loader2 className="size-4 animate-spin" /> : "Generate"}
                  </Button>
                )}
              </div>

              {createdDoc && (
                <div className="animate-in fade-in bg-surface-subtle p-6 duration-300">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle2 className="size-5" />
                      <span className="font-bold">Draft Generated Successfully</span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger render={
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="rounded-none border-fjord text-fjord hover:bg-fjord/10"
                        >
                          Export Document
                          <ChevronDown className="ml-2 size-4" />
                        </Button>
                      } />
                      <DropdownMenuContent align="end" className="w-48 rounded-none">
                        <DropdownMenuItem onClick={handleExportPDF} className="cursor-pointer font-medium">
                          <FileText className="mr-2 size-4 text-emerald-600" />
                          <span>Export as PDF</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleExportDOCX} className="cursor-pointer font-medium">
                          <FileCode2 className="mr-2 size-4 text-blue-600" />
                          <span>Export as DOCX</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <pre className="rounded-none border border-border bg-surface p-4 font-mono text-xs whitespace-pre-wrap text-ink shadow-sm">
                    {createdDoc}
                  </pre>
                  <Button 
                    variant="ghost" 
                    className="mt-4 w-full rounded-none text-muted-foreground hover:bg-surface hover:text-ink"
                    onClick={() => { setCreatedDoc(null); setIsCreating(false); }}
                  >
                    Draft Another Document
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
