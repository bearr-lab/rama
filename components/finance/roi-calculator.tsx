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
    <div className="shadow-subtle flex flex-col overflow-hidden border border-stone-300 bg-stone-50 lg:flex-row dark:border-stone-800 dark:bg-stone-950">
      {/* Left Column: Input Sliders & Controls */}
      <div className="flex-1 space-y-6 border-b border-stone-300 p-6 lg:border-r lg:border-b-0 lg:p-8 dark:border-stone-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-stone-900/10 p-2 text-stone-900 dark:bg-stone-100/10 dark:text-stone-100">
              <Calculator className="size-5" />
            </div>
            <div>
              <h3 className="text-h3 font-display font-bold text-stone-900 dark:text-stone-50">
                Financial Intelligence & ROI Modeler
              </h3>
              <p className="text-caption text-stone-500 dark:text-stone-400">
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
            className="p-2 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:bg-stone-900 dark:text-stone-400"
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
              <label className="text-body-sm font-bold text-stone-900 dark:text-stone-50">
                Property Value (AED)
              </label>
              <span className="text-body font-mono font-extrabold text-stone-900 dark:text-stone-100">
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
              className="h-2 w-full cursor-pointer bg-stone-100 accent-fjord dark:bg-stone-900"
            />
          </div>

          {/* Down Payment % */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-body-sm font-bold text-stone-900 dark:text-stone-50">
                Down Payment ({downPaymentPct}%)
              </label>
              <span className="text-body-sm font-mono font-bold text-stone-900 dark:text-stone-50">
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
                      ? 'border-stone-900 bg-stone-900 text-white shadow-sm dark:border-stone-100 dark:bg-stone-100'
                      : 'border-stone-300 bg-stone-50 text-stone-500 hover:text-stone-900 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-400',
                  )}
                >
                  {pct}% {pct === 100 ? '(Cash)' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate & Loan Tenure (only if not cash) */}
          {downPaymentPct < 100 && (
            <div className="grid grid-cols-1 gap-4 border-t border-stone-300 pt-2 sm:grid-cols-2 dark:border-stone-800">
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-caption font-bold text-stone-900 dark:text-stone-50">
                    Interest Rate (%)
                  </label>
                  <span className="text-caption font-mono font-extrabold text-stone-600 dark:text-stone-400">
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
                  className="h-1.5 w-full cursor-pointer bg-stone-100 accent-sky-500 disabled:opacity-50 dark:bg-stone-900"
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-caption font-bold text-stone-900 dark:text-stone-50">
                    Loan Tenure
                  </label>
                  <span className="text-caption font-mono font-extrabold text-stone-900 dark:text-stone-50">
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
                          ? 'border-ink bg-ink text-white'
                          : 'border-stone-300 bg-stone-100 text-stone-500 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400',
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
          <div className="grid grid-cols-1 gap-4 border-t border-stone-300 pt-2 sm:grid-cols-2 dark:border-stone-800">
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-caption font-bold text-stone-900 dark:text-stone-50">
                  Annual Gross Rent
                </label>
                <span className="text-caption font-mono font-bold text-stone-800">
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
                className="h-1.5 w-full cursor-pointer bg-stone-100 accent-emerald-500 dark:bg-stone-900"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-caption font-bold text-stone-900 dark:text-stone-50">
                  Annual Maintenance / Fee
                </label>
                <span className="text-caption font-mono font-bold text-stone-800 dark:text-stone-200">
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
                className="h-1.5 w-full cursor-pointer bg-stone-100 accent-rose-500 dark:bg-stone-900"
              />
            </div>
          </div>
        </div>

        {/* Sensitivity / Stress Test Toggle */}
        <div className="flex items-center justify-between border border-stone-400/20 bg-stone-200/5 p-4 dark:border-stone-600/20 dark:bg-stone-800/5">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="size-5 shrink-0 text-stone-700 dark:text-stone-300" />
            <div>
              <span className="text-body-sm font-bold text-stone-900 dark:text-stone-50">
                Stress Test Rate Hike (+1.5%)
              </span>
              <p className="text-[11px] leading-tight text-stone-500 dark:text-stone-400">
                Simulates Central Bank interest rate fluctuation
              </p>
            </div>
          </div>
          <button
            onClick={() => setStressTest(!stressTest)}
            className={cn(
              'relative flex h-6 w-11 shrink-0 items-center px-0.5 transition-colors',
              stressTest
                ? 'bg-stone-700 dark:bg-stone-300'
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
      <div className="flex w-full flex-col justify-between space-y-6 bg-stone-100 p-6 lg:w-96 lg:p-8 dark:bg-stone-900">
        <div>
          <span className="text-caption font-extrabold tracking-wider text-stone-500 uppercase dark:text-stone-400">
            Investment Yield & Return
          </span>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-display-md font-display font-extrabold text-stone-800">
              {netRoiPercentage.toFixed(2)}%
            </span>
            <span className="text-body-sm font-bold text-stone-500 dark:text-stone-400">
              Net Annual Yield
            </span>
          </div>

          {downPaymentPct < 100 && (
            <div className="text-caption mt-1 flex items-center gap-1.5 font-semibold text-stone-900 dark:text-stone-50">
              <TrendingUp className="size-3.5 text-stone-600 dark:text-stone-400" />
              <span>
                Cash-on-Cash Return:{' '}
                <strong>{cashOnCashReturn.toFixed(2)}%</strong>
              </span>
            </div>
          )}
        </div>

        {/* Breakdown Cards */}
        <div className="space-y-3">
          <div className="space-y-2 border border-stone-300 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-950">
            <div className="text-body-sm flex items-center justify-between">
              <span className="font-medium text-stone-500 dark:text-stone-400">
                Monthly Mortgage Payment
              </span>
              <span className="font-mono font-extrabold text-stone-900 dark:text-stone-50">
                {downPaymentPct === 100
                  ? 'AED 0 (Cash)'
                  : `AED ${Math.round(monthlyMortgage).toLocaleString()}`}
              </span>
            </div>
            {stressTest && downPaymentPct < 100 && (
              <div className="flex items-center justify-end gap-1 text-[11px] font-semibold text-stone-700 dark:text-stone-300 dark:text-stone-700">
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

          <div className="space-y-2.5 border border-stone-300 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-950">
            <span className="text-caption font-bold text-stone-500 uppercase dark:text-stone-400">
              Initial Capital Requirements (DLD Fees)
            </span>

            <div className="text-caption flex items-center justify-between">
              <span className="text-stone-500 dark:text-stone-400">
                Down Payment ({downPaymentPct}%)
              </span>
              <span className="font-mono font-semibold text-stone-900 dark:text-stone-50">
                AED {downPaymentAmount.toLocaleString()}
              </span>
            </div>
            <div className="text-caption flex items-center justify-between">
              <span className="text-stone-500 dark:text-stone-400">
                DLD Transfer Fee (4%) + NOC
              </span>
              <span className="font-mono font-semibold text-stone-900 dark:text-stone-50">
                AED {dldFee.toLocaleString()}
              </span>
            </div>
            <div className="text-caption flex items-center justify-between">
              <span className="text-stone-500 dark:text-stone-400">
                Agency Fee (2% + VAT)
              </span>
              <span className="font-mono font-semibold text-stone-900 dark:text-stone-50">
                AED {agencyFee.toLocaleString()}
              </span>
            </div>
            <div className="text-body-sm flex items-center justify-between border-t border-stone-300 pt-2 font-bold dark:border-stone-800">
              <span className="text-stone-900 dark:text-stone-50">
                Total Equity Required
              </span>
              <span className="font-mono text-stone-900 dark:text-stone-100">
                AED {Math.round(totalInitialEquity).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between border border-stone-800/20 bg-stone-800/10 p-4">
            <div>
              <span className="text-caption font-bold text-stone-800 uppercase dark:text-stone-100">
                Est. Monthly Net Cashflow
              </span>
              <p className="text-h3 mt-0.5 font-mono font-extrabold text-stone-800 dark:text-stone-100">
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
          className="text-body-sm flex w-full items-center justify-center gap-2 bg-stone-900 py-3.5 font-bold text-white shadow-sm transition-all hover:bg-stone-800 dark:bg-stone-100 dark:bg-stone-200"
        >
          <span>Save Scenario to Decision Lab</span>
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
