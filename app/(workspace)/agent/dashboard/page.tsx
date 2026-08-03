'use client';

import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { verifyDocument } from '@/app/actions/document-verification';
import { cn } from '@/lib/utils';

export default function AgentDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [propertyId, setPropertyId] = useState('');
  const [documentType, setDocumentType] = useState('EJARI');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    confidence_score: number;
    extracted_data: Record<string, unknown>;
    status?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError(null);
    }
  };

  const handleVerify = async () => {
    if (!file || !propertyId) {
      setError('Property ID and Document are required.');
      return;
    }
    setIsVerifying(true);
    setError(null);

    const formData = new FormData();
    formData.append('propertyId', propertyId);
    formData.append('document', file);
    formData.append('documentType', documentType);

    const result = await verifyDocument(formData);
    
    if (result.error) {
      setError(result.error);
    } else {
      setVerificationResult(result.verification);
    }
    setIsVerifying(false);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6">
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground">
          Agent Verification Hub
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Upload Ejari or Title Deeds. Our AI will verify the documents instantly to grant your listing the &quot;RAMA Verified&quot; badge.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Upload Form */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              Property ID
            </label>
            <input
              type="text"
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
              placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
              className="w-full rounded-none border border-border bg-surface-subtle p-3 text-sm transition-all focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              Document Type
            </label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full appearance-none rounded-none border border-border bg-surface-subtle p-3 text-sm transition-all focus:ring-1 focus:ring-primary focus:outline-none"
            >
              <option value="EJARI">Ejari Contract</option>
              <option value="TITLE_DEED">Title Deed</option>
            </select>
          </div>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={cn(
              'border-2 border-dashed border-border bg-surface-subtle p-8 text-center transition-colors',
              file ? 'border-primary bg-primary/5' : 'hover:border-primary/50 hover:bg-surface'
            )}
          >
            {file ? (
              <div className="flex flex-col items-center gap-3">
                <FileText className="size-8 text-primary" />
                <p className="text-sm font-medium text-foreground">{file.name}</p>
                <button 
                  onClick={() => setFile(null)}
                  className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                >
                  <X className="size-3" /> Remove File
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <Upload className="size-8 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground">
                  Drag & drop your document here, or click to browse
                </p>
                <input
                  type="file"
                  onChange={(e) => e.target.files && setFile(e.target.files[0])}
                  className="hidden"
                  id="file-upload"
                  accept="image/*,application/pdf"
                />
                <label 
                  htmlFor="file-upload"
                  className="mt-2 cursor-pointer border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-subtle"
                >
                  Select File
                </label>
              </div>
            )}
          </div>

          <Button
            onClick={handleVerify}
            disabled={!file || !propertyId || isVerifying}
            className="h-12 w-full rounded-none text-sm font-semibold tracking-widest uppercase"
          >
            {isVerifying ? 'Verifying with AI...' : 'Submit for Verification'}
          </Button>

          {error && (
            <div className="flex items-center gap-2 border border-destructive/20 bg-destructive/10 p-4 text-destructive">
              <AlertCircle className="size-5 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Results Panel */}
        <div className="h-full min-h-100 border border-border bg-surface p-6">
          <h2 className="mb-6 border-b border-border pb-4 font-display text-xl font-semibold">
            Verification Status
          </h2>
          
          {!verificationResult && !isVerifying && (
            <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
              No active verifications.
            </div>
          )}

          {isVerifying && (
            <div className="flex h-48 flex-col items-center justify-center gap-4 text-muted-foreground">
              <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="animate-pulse text-sm">Running OCR & checking DLD registry...</p>
            </div>
          )}

          {verificationResult && (
            <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
              <div className="flex items-start justify-between border border-green-200 bg-green-50/50 p-4 dark:border-green-900 dark:bg-green-950/20">
                <div className="flex items-center gap-3 text-green-700 dark:text-green-400">
                  <CheckCircle className="size-6 shrink-0" />
                  <div>
                    <h3 className="font-bold">Verification Successful</h3>
                    <p className="mt-1 text-xs">Confidence Score: {(verificationResult.confidence_score * 100).toFixed(1)}%</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="border-b border-border pb-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                  Extracted Data
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {Object.entries(verificationResult.extracted_data).map(([key, value]) => (
                    <div key={key} className="flex flex-col gap-1">
                      <span className="text-muted-foreground capitalize">{key.replace('_', ' ')}</span>
                      <span className="font-medium text-foreground">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
