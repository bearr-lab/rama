'use client';

import * as React from 'react';
import {
  Calculator,
  TrendingUp,
  DollarSign,
  PieChart,
  ShieldAlert,
  Sliders,
  ArrowRight,
  RefreshCw,
  Check,
  Percent,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoiCalculatorProps {
  initialPrice?: number;
  initialRent?: number;
  initialServiceCharge?: number;
}

export function RoiCalculator({
  initialPrice = 18500000,
  initialRent = 1250000,
  initialServiceCharge = 84000,
}: RoiCalculatorProps) {
  const [price, setPrice] = React.useState(initialPrice);
  const [downPaymentPct, setDownPaymentPct] = React.useState(20);
  const [interestRate, setInterestRate] = React.useState(5.25);
  const [loanYears, setLoanYears] = React.useState(25);
  const [grossRent, setGrossRent] = React.useState(initialRent);
  const [serviceCharge, setServiceCharge] =
    React.useState(initialServiceCharge);
  const [stressTest, setStressTest] = React.useState(false);

  // Calculations
  const downPaymentAmount = (price * downPaymentPct) / 100;
  const loanAmount = price - downPaymentAmount;

  // Mandatory DLD Transfer Fee (4%) + Admin Fee
  const dldFee = price * 0.04 + 4200;
  // Agency Fee (2% + 5% VAT)
  const agencyFee = price * 0.02 * 1.05;
  // Total Initial Cash Equity Required
  const totalInitialEquity = downPaymentAmount + dldFee + agencyFee;

  // Monthly Mortgage Math: M = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
  const effectiveRate = stressTest ? interestRate + 1.5 : interestRate;
  const monthlyRate = effectiveRate / 100 / 12;
  const totalMonths = loanYears * 12;

  const monthlyMortgage =
    loanAmount > 0
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : 0;

  const annualMortgage = monthlyMortgage * 12;
  const netAnnualIncome = grossRent - annualMortgage - serviceCharge;
  const netRoiPercentage = ((grossRent - serviceCharge) / price) * 100;
  const cashOnCashReturn =
    totalInitialEquity > 0 ? (netAnnualIncome / totalInitialEquity) * 100 : 0;

  return (
    <div className="shadow-subtle flex flex-col overflow-hidden border border-border bg-surface lg:flex-row dark:border-border dark:bg-fjord-hover">
      {/* Left Column: Input Sliders & Controls */}
      <div className="flex-1 space-y-6 border-b border-border p-6 lg:border-r lg:border-b-0 lg:p-8 dark:border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-fjord-hover/10 p-2 text-fjord dark:bg-surface-subtle/10 dark:text-muted">
              <Calculator className="size-5" />
            </div>
            <div>
              <h3 className="text-h3 font-display font-bold text-fjord dark:text-white">
                Financial Intelligence & ROI Modeler
              </h3>
              <p className="text-caption text-muted dark:text-muted">
                Mortgage & Cashflow Engine
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setPrice(initialPrice);
              setDownPaymentPct(20);
              setInterestRate(5.25);
              setLoanYears(25);
              setGrossRent(initialRent);
              setServiceCharge(initialServiceCharge);
              setStressTest(false);
            }}
            className="p-2 text-muted transition-colors hover:bg-surface-subtle hover:text-fjord dark:bg-fjord-hover dark:text-muted"
            title="Reset to DLD defaults"
          >
            <RefreshCw className="size-4" />
          </button>
        </div>

        {/* Input Sliders */}
        <div className="space-y-5">
          {/* Property Price */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-body-sm font-bold text-fjord dark:text-white">
                Property Value (AED)
              </label>
              <span className="text-body font-mono font-extrabold text-fjord dark:text-muted">
                AED {price.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={1000000}
              max={50000000}
              step={250000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="h-2 w-full cursor-pointer bg-surface-subtle accent-fjord dark:bg-fjord-hover"
            />
          </div>

          {/* Down Payment % */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-body-sm font-bold text-fjord dark:text-white">
                Down Payment ({downPaymentPct}%)
              </label>
              <span className="text-body-sm font-mono font-bold text-fjord dark:text-white">
                AED {downPaymentAmount.toLocaleString()}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[20, 30, 50, 100].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setDownPaymentPct(pct)}
                  className={cn(
                    'border py-1.5 text-xs font-bold transition-all',
                    downPaymentPct === pct
                      ? 'border-border bg-fjord-hover text-white shadow-sm dark:border-border dark:bg-surface-subtle'
                      : 'border-border bg-surface text-muted hover:text-fjord dark:border-border dark:bg-fjord-hover dark:text-muted',
                  )}
                >
                  {pct}% {pct === 100 ? '(Cash)' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate & Loan Tenure (only if not cash) */}
          {downPaymentPct < 100 && (
            <div className="grid grid-cols-1 gap-4 border-t border-border pt-2 sm:grid-cols-2 dark:border-border">
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-caption font-bold text-fjord dark:text-white">
                    Interest Rate (%)
                  </label>
                  <span className="text-caption font-mono font-extrabold text-muted dark:text-muted">
                    {effectiveRate.toFixed(2)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={2.5}
                  max={8.5}
                  step={0.05}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  disabled={stressTest}
                  className="h-1.5 w-full cursor-pointer bg-surface-subtle accent-sky-500 disabled:opacity-50 dark:bg-fjord-hover"
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-caption font-bold text-fjord dark:text-white">
                    Loan Tenure
                  </label>
                  <span className="text-caption font-mono font-extrabold text-fjord dark:text-white">
                    {loanYears} Years
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[15, 20, 25].map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setLoanYears(yr)}
                      className={cn(
                        'border py-1 text-[11px] font-bold transition-all',
                        loanYears === yr
                          ? 'border-ink bg-fjord text-white'
                          : 'border-border bg-surface-subtle text-muted dark:border-border dark:bg-fjord-hover dark:text-muted',
                      )}
                    >
                      {yr}y
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Expected Rent & Service Charges */}
          <div className="grid grid-cols-1 gap-4 border-t border-border pt-2 sm:grid-cols-2 dark:border-border">
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-caption font-bold text-fjord dark:text-white">
                  Annual Gross Rent
                </label>
                <span className="text-caption font-mono font-bold text-fjord">
                  AED {grossRent.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={50000}
                max={4000000}
                step={25000}
                value={grossRent}
                onChange={(e) => setGrossRent(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer bg-surface-subtle accent-emerald-500 dark:bg-fjord-hover"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-caption font-bold text-fjord dark:text-white">
                  Annual Maintenance / Fee
                </label>
                <span className="text-caption font-mono font-bold text-fjord dark:text-muted">
                  AED {serviceCharge.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={10000}
                max={300000}
                step={5000}
                value={serviceCharge}
                onChange={(e) => setServiceCharge(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer bg-surface-subtle accent-rose-500 dark:bg-fjord-hover"
              />
            </div>
          </div>
        </div>

        {/* Sensitivity / Stress Test Toggle */}
        <div className="flex items-center justify-between border border-stone-400/20 bg-surface-subtle/5 p-4 dark:border-stone-600/20 dark:bg-surface-subtle/5">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="size-5 shrink-0 text-muted dark:text-muted" />
            <div>
              <span className="text-body-sm font-bold text-fjord dark:text-white">
                Stress Test Rate Hike (+1.5%)
              </span>
              <p className="text-[11px] leading-tight text-muted dark:text-muted">
                Simulates Central Bank interest rate fluctuation
              </p>
            </div>
          </div>
          <button
            onClick={() => setStressTest(!stressTest)}
            className={cn(
              'relative flex h-6 w-11 shrink-0 items-center px-0.5 transition-colors',
              stressTest
                ? 'bg-surface-subtle dark:bg-stone-300'
                : 'bg-muted/40 dark:bg-border',
            )}
          >
            <span
              className={cn(
                'size-5 transform bg-white shadow-md transition-transform duration-200',
                stressTest ? 'translate-x-5' : 'translate-x-0',
              )}
            />
          </button>
        </div>
      </div>

      {/* Right Column: Output Summary Dashboard */}
      <div className="flex w-full flex-col justify-between space-y-6 bg-surface-subtle p-6 lg:w-96 lg:p-8 dark:bg-fjord-hover">
        <div>
          <span className="text-caption font-extrabold tracking-wider text-muted uppercase dark:text-muted">
            Investment Yield & Return
          </span>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-display-md font-display font-extrabold text-fjord">
              {netRoiPercentage.toFixed(2)}%
            </span>
            <span className="text-body-sm font-bold text-muted dark:text-muted">
              Net Annual Yield
            </span>
          </div>

          {downPaymentPct < 100 && (
            <div className="text-caption mt-1 flex items-center gap-1.5 font-semibold text-fjord dark:text-white">
              <TrendingUp className="size-3.5 text-muted dark:text-muted" />
              <span>
                Cash-on-Cash Return:{' '}
                <strong>{cashOnCashReturn.toFixed(2)}%</strong>
              </span>
            </div>
          )}
        </div>

        {/* Breakdown Cards */}
        <div className="space-y-3">
          <div className="space-y-2 border border-border bg-surface p-4 dark:border-border dark:bg-fjord-hover">
            <div className="text-body-sm flex items-center justify-between">
              <span className="font-medium text-muted dark:text-muted">
                Monthly Mortgage Payment
              </span>
              <span className="font-mono font-extrabold text-fjord dark:text-white">
                {downPaymentPct === 100
                  ? 'AED 0 (Cash)'
                  : `AED ${Math.round(monthlyMortgage).toLocaleString()}`}
              </span>
            </div>
            {stressTest && downPaymentPct < 100 && (
              <div className="flex items-center justify-end gap-1 text-[11px] font-semibold text-muted dark:text-muted dark:text-muted">
                <span>
                  +AED{' '}
                  {Math.round(
                    monthlyMortgage -
                      (loanAmount *
                        (interestRate / 100 / 12) *
                        Math.pow(1 + interestRate / 100 / 12, totalMonths)) /
                        (Math.pow(1 + interestRate / 100 / 12, totalMonths) -
                          1),
                  ).toLocaleString()}
                  /mo rate hike impact
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2.5 border border-border bg-surface p-4 dark:border-border dark:bg-fjord-hover">
            <span className="text-caption font-bold text-muted uppercase dark:text-muted">
              Initial Capital Requirements (DLD Fees)
            </span>

            <div className="text-caption flex items-center justify-between">
              <span className="text-muted dark:text-muted">
                Down Payment ({downPaymentPct}%)
              </span>
              <span className="font-mono font-semibold text-fjord dark:text-white">
                AED {downPaymentAmount.toLocaleString()}
              </span>
            </div>
            <div className="text-caption flex items-center justify-between">
              <span className="text-muted dark:text-muted">
                DLD Transfer Fee (4%) + NOC
              </span>
              <span className="font-mono font-semibold text-fjord dark:text-white">
                AED {dldFee.toLocaleString()}
              </span>
            </div>
            <div className="text-caption flex items-center justify-between">
              <span className="text-muted dark:text-muted">
                Agency Fee (2% + VAT)
              </span>
              <span className="font-mono font-semibold text-fjord dark:text-white">
                AED {agencyFee.toLocaleString()}
              </span>
            </div>
            <div className="text-body-sm flex items-center justify-between border-t border-border pt-2 font-bold dark:border-border">
              <span className="text-fjord dark:text-white">
                Total Equity Required
              </span>
              <span className="font-mono text-fjord dark:text-muted">
                AED {Math.round(totalInitialEquity).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between border border-border/20 bg-surface-subtle/10 p-4">
            <div>
              <span className="text-caption font-bold text-fjord uppercase dark:text-muted">
                Est. Monthly Net Cashflow
              </span>
              <p className="text-h3 mt-0.5 font-mono font-extrabold text-fjord dark:text-muted">
                AED {Math.round(netAnnualIncome / 12).toLocaleString()} /mo
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() =>
            alert(
              `Financial scenario saved to your Decision Lab for comparison!`,
            )
          }
          className="text-body-sm flex w-full items-center justify-center gap-2 bg-fjord-hover py-3.5 font-bold text-white shadow-sm transition-all hover:bg-surface-subtle dark:bg-surface-subtle dark:bg-surface-subtle"
        >
          <span>Save Scenario to Decision Lab</span>
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
