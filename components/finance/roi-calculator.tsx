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
    <div className="shadow-subtle flex flex-col overflow-hidden rounded-3xl border border-border bg-surface lg:flex-row">
      {/* Left Column: Input Sliders & Controls */}
      <div className="flex-1 space-y-6 border-b border-border p-6 lg:border-r lg:border-b-0 lg:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="rounded-xl bg-fjord/10 p-2 text-fjord">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-h3 font-display font-bold text-ink">
                Financial Intelligence & ROI Modeler
              </h3>
              <p className="text-caption text-muted">
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
            className="rounded-xl p-2 text-muted transition-colors hover:bg-surface-subtle hover:text-ink"
            title="Reset to DLD defaults"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        {/* Input Sliders */}
        <div className="space-y-5">
          {/* Property Price */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-body-sm font-bold text-ink">
                Property Value (AED)
              </label>
              <span className="text-body font-mono font-extrabold text-fjord">
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
              className="h-2 w-full cursor-pointer rounded-lg bg-surface-subtle accent-fjord"
            />
          </div>

          {/* Down Payment % */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-body-sm font-bold text-ink">
                Down Payment ({downPaymentPct}%)
              </label>
              <span className="text-body-sm font-mono font-bold text-ink">
                AED {downPaymentAmount.toLocaleString()}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[20, 30, 50, 100].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setDownPaymentPct(pct)}
                  className={cn(
                    'rounded-xl border py-1.5 text-xs font-bold transition-all',
                    downPaymentPct === pct
                      ? 'border-fjord bg-fjord text-white shadow-sm'
                      : 'border-border bg-surface text-muted hover:text-ink',
                  )}
                >
                  {pct}% {pct === 100 ? '(Cash)' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate & Loan Tenure (only if not cash) */}
          {downPaymentPct < 100 && (
            <div className="grid grid-cols-1 gap-4 border-t border-border pt-2 sm:grid-cols-2">
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-caption font-bold text-ink">
                    Interest Rate (%)
                  </label>
                  <span className="text-caption font-mono font-extrabold text-sky-500">
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
                  className="h-1.5 w-full cursor-pointer rounded-lg bg-surface-subtle accent-sky-500 disabled:opacity-50"
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-caption font-bold text-ink">
                    Loan Tenure
                  </label>
                  <span className="text-caption font-mono font-extrabold text-ink">
                    {loanYears} Years
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[15, 20, 25].map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setLoanYears(yr)}
                      className={cn(
                        'rounded-lg border py-1 text-[11px] font-bold transition-all',
                        loanYears === yr
                          ? 'border-ink bg-ink text-white'
                          : 'border-border bg-surface-subtle text-muted',
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
          <div className="grid grid-cols-1 gap-4 border-t border-border pt-2 sm:grid-cols-2">
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-caption font-bold text-ink">
                  Annual Gross Rent
                </label>
                <span className="text-caption font-mono font-bold text-emerald-500">
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
                className="h-1.5 w-full cursor-pointer rounded-lg bg-surface-subtle accent-emerald-500"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-caption font-bold text-ink">
                  Annual Maintenance / Fee
                </label>
                <span className="text-caption font-mono font-bold text-rose-500">
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
                className="h-1.5 w-full cursor-pointer rounded-lg bg-surface-subtle accent-rose-500"
              />
            </div>
          </div>
        </div>

        {/* Sensitivity / Stress Test Toggle */}
        <div className="flex items-center justify-between rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="h-5 w-5 shrink-0 text-amber-500" />
            <div>
              <span className="text-body-sm font-bold text-ink">
                Stress Test Rate Hike (+1.5%)
              </span>
              <p className="text-[11px] leading-tight text-muted">
                Simulates Central Bank interest rate fluctuation
              </p>
            </div>
          </div>
          <button
            onClick={() => setStressTest(!stressTest)}
            className={cn(
              'relative flex h-6 w-11 shrink-0 items-center rounded-full px-0.5 transition-colors',
              stressTest ? 'bg-amber-500' : 'bg-muted/40 dark:bg-border',
            )}
          >
            <span
              className={cn(
                'h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200',
                stressTest ? 'translate-x-5' : 'translate-x-0',
              )}
            />
          </button>
        </div>
      </div>

      {/* Right Column: Output Summary Dashboard */}
      <div className="flex w-full flex-col justify-between space-y-6 bg-surface-subtle p-6 lg:w-96 lg:p-8">
        <div>
          <span className="text-caption font-extrabold tracking-wider text-muted uppercase">
            Investment Yield & Return
          </span>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-display-md font-display font-extrabold text-emerald-500">
              {netRoiPercentage.toFixed(2)}%
            </span>
            <span className="text-body-sm font-bold text-muted">
              Net Annual Yield
            </span>
          </div>

          {downPaymentPct < 100 && (
            <div className="text-caption mt-1 flex items-center gap-1.5 font-semibold text-ink">
              <TrendingUp className="h-3.5 w-3.5 text-sky-500" />
              <span>
                Cash-on-Cash Return:{' '}
                <strong>{cashOnCashReturn.toFixed(2)}%</strong>
              </span>
            </div>
          )}
        </div>

        {/* Breakdown Cards */}
        <div className="space-y-3">
          <div className="space-y-2 rounded-2xl border border-border bg-surface p-4">
            <div className="text-body-sm flex items-center justify-between">
              <span className="font-medium text-muted">
                Monthly Mortgage Payment
              </span>
              <span className="font-mono font-extrabold text-ink">
                {downPaymentPct === 100
                  ? 'AED 0 (Cash)'
                  : `AED ${Math.round(monthlyMortgage).toLocaleString()}`}
              </span>
            </div>
            {stressTest && downPaymentPct < 100 && (
              <div className="flex items-center justify-end gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
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

          <div className="space-y-2.5 rounded-2xl border border-border bg-surface p-4">
            <span className="text-caption font-bold text-muted uppercase">
              Initial Capital Requirements (DLD Fees)
            </span>

            <div className="text-caption flex items-center justify-between">
              <span className="text-muted">
                Down Payment ({downPaymentPct}%)
              </span>
              <span className="font-mono font-semibold text-ink">
                AED {downPaymentAmount.toLocaleString()}
              </span>
            </div>
            <div className="text-caption flex items-center justify-between">
              <span className="text-muted">DLD Transfer Fee (4%) + NOC</span>
              <span className="font-mono font-semibold text-ink">
                AED {dldFee.toLocaleString()}
              </span>
            </div>
            <div className="text-caption flex items-center justify-between">
              <span className="text-muted">Agency Fee (2% + VAT)</span>
              <span className="font-mono font-semibold text-ink">
                AED {agencyFee.toLocaleString()}
              </span>
            </div>
            <div className="text-body-sm flex items-center justify-between border-t border-border pt-2 font-bold">
              <span className="text-ink">Total Equity Required</span>
              <span className="font-mono text-fjord">
                AED {Math.round(totalInitialEquity).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
            <div>
              <span className="text-caption font-bold text-emerald-700 uppercase dark:text-emerald-300">
                Est. Monthly Net Cashflow
              </span>
              <p className="text-h3 mt-0.5 font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
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
          className="text-body-sm flex w-full items-center justify-center gap-2 rounded-xl bg-fjord py-3.5 font-bold text-white shadow-sm transition-all hover:bg-fjord-hover"
        >
          <span>Save Scenario to Decision Lab</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
