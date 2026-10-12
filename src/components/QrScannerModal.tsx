import React, { useState } from 'react';
import { PurchasedTicket } from '../data/eventsData';
import { X, QrCode, CheckCircle2, AlertTriangle, XCircle, ShieldCheck, RefreshCw } from 'lucide-react';

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  validTickets: PurchasedTicket[];
}

export const QrScannerModal: React.FC<QrScannerModalProps> = ({
  isOpen,
  onClose,
  validTickets
}) => {
  const [ticketInput, setTicketInput] = useState('');
  const [scanResult, setScanResult] = useState<{
    status: 'success' | 'used' | 'invalid' | null;
    ticket?: PurchasedTicket;
    message: string;
  }>({ status: null, message: '' });

  const [isScanning, setIsScanning] = useState(false);

  if (!isOpen) return null;

  const handleVerify = (codeToVerify?: string) => {
    const code = (codeToVerify || ticketInput).trim().toUpperCase();
    if (!code) return;

    setIsScanning(true);
    setScanResult({ status: null, message: '' });

    setTimeout(() => {
      setIsScanning(false);

      const found = validTickets.find(
        (t) =>
          t.ticketNumber.toUpperCase() === code ||
          t.qrCodeSeed.toUpperCase() === code ||
          code.includes(t.ticketNumber.toUpperCase())
      );

      if (found) {
        if (found.status === 'Hore Loo Isticmaalay (Used)') {
          setScanResult({
            status: 'used',
            ticket: found,
            message: 'Digniin: Tigidhkan hore ayaa loogu galay xafladda! Lama ogola laba jeer.'
          });
        } else {
          setScanResult({
            status: 'success',
            ticket: found,
            message: `Tigidh Sax ah! Soo dhawoow ${found.customerName} (${found.tierName} Tier).`
          });
        }
      } else {
        setScanResult({
          status: 'invalid',
          message: 'Khalad: Tigidhkan kuma jiro diiwaanka xogta Martiqaad ee xafladdan.'
        });
      }
    }, 600);
  };

  const handleSampleTest = (type: 'valid' | 'used' | 'invalid') => {
    if (type === 'valid') {
      const firstValid = validTickets[0];
      const code = firstValid ? firstValid.ticketNumber : 'MQ-2026-8814';
      setTicketInput(code);
      handleVerify(code);
    } else if (type === 'used') {
      const code = 'MQ-2026-OLD99';
      setTicketInput(code);
      setIsScanning(true);
      setTimeout(() => {
        setIsScanning(false);
        setScanResult({
          status: 'used',
          message: 'Digniin: Tigidhkan waxaa la baaray 20 daqiiqo kahor! Albaabka lama furi karo.'
        });
      }, 500);
    } else {
      const code = 'MQ-FAKE-0000';
      setTicketInput(code);
      handleVerify(code);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-2xl shadow-2xl overflow-hidden my-8 transition-colors">
        {/* Header */}
        <div className="p-5 border-b border-[var(--border-subtle)] bg-[var(--bg-page-secondary)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-light)] text-[var(--accent)] border border-[var(--border-accent)] flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[var(--text-primary)]">Baaraha Tigidhada ee Albaabka</h2>
              <p className="text-[11px] text-[var(--text-muted)]">Gate QR Scanner Simulation Tool</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[var(--bg-card)] hover:bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] flex items-center justify-center transition-colors shadow-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Simulated Scanner Viewport */}
          <div className="relative bg-[var(--bg-card-subtle)] border border-[var(--border-accent)] rounded-2xl p-6 text-center overflow-hidden flex flex-col items-center justify-center min-h-[190px]">
            {/* Animated laser line */}
            <div className="absolute inset-x-8 top-0 h-0.5 bg-[var(--accent)] opacity-80 animate-pulse" />

            <div className="w-16 h-16 border-2 border-dashed border-[var(--accent)] rounded-xl flex items-center justify-center mb-3 text-[var(--accent)] bg-[var(--accent-light)]">
              <QrCode className="w-8 h-8 animate-bounce" />
            </div>

            <p className="text-xs text-[var(--text-primary)] font-semibold">Kaamirada Baaraha Albaabka (Active)</p>
            <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Geli lambarka tigidhka ama dooro tusaale hoose</p>
          </div>

          {/* Quick Test Buttons */}
          <div>
            <span className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
              Tijaabi Tusaalooyinka Hadda:
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleSampleTest('valid')}
                className="py-2 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-semibold transition-colors text-[11px] flex items-center justify-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Tigidh Sax ah</span>
              </button>
              <button
                type="button"
                onClick={() => handleSampleTest('used')}
                className="py-2 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-semibold transition-colors text-[11px] flex items-center justify-center gap-1"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Hore loo galay</span>
              </button>
              <button
                type="button"
                onClick={() => handleSampleTest('invalid')}
                className="py-2 px-2.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-800 font-semibold transition-colors text-[11px] flex items-center justify-center gap-1"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Tigidh Been ah</span>
              </button>
            </div>
          </div>

          {/* Manual Input */}
          <div className="space-y-2">
            <span className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              Ama Geli Lambarka Tigidhka:
            </span>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Tusaale: MQ-2026-8814"
                value={ticketInput}
                onChange={(e) => setTicketInput(e.target.value)}
                className="flex-1 bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl px-3.5 py-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] font-mono uppercase focus:outline-none focus:border-[var(--accent)]"
              />
              <button
                onClick={() => handleVerify()}
                disabled={isScanning || !ticketInput.trim()}
                className="py-2.5 px-4 rounded-xl bg-[var(--accent)] hover:opacity-90 disabled:opacity-40 text-[var(--accent-text)] font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
              >
                {isScanning ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <ShieldCheck className="w-3.5 h-3.5" />
                )}
                <span>Baar</span>
              </button>
            </div>
          </div>

          {/* Scan Results Output */}
          {scanResult.status && (
            <div
              className={`p-4 rounded-xl border text-xs animate-in fade-in duration-300 ${
                scanResult.status === 'success'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : scanResult.status === 'used'
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-red-50 border-red-300 text-red-900'
              }`}
            >
              <div className="flex items-start gap-3">
                {scanResult.status === 'success' && <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />}
                {scanResult.status === 'used' && <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />}
                {scanResult.status === 'invalid' && <XCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />}

                <div className="flex-1">
                  <p className="font-semibold text-sm leading-snug">{scanResult.message}</p>
                  {scanResult.ticket && (
                    <div className="mt-2.5 pt-2 border-t border-black/10 space-y-1 text-[11px]">
                      <p><span className="font-medium">Xafladda:</span> {scanResult.ticket.eventTitle}</p>
                      <p><span className="font-medium">Heerka:</span> {scanResult.ticket.tierName} (${scanResult.ticket.totalPrice})</p>
                      <p><span className="font-medium">Magaca:</span> {scanResult.ticket.customerName} ({scanResult.ticket.customerPhone})</p>
                      <p><span className="font-medium">Tirada Boosaska:</span> {scanResult.ticket.quantity} kursi</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
