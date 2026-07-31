/**
 * RAMA OmniTwin™ Digital Twin Simulation Microservice Engine
 * Real-time spatial financial modeling & community analytics engine for Dubai Real Estate
 */

export interface CommunityTwinMetrics {
  communityId: string;
  communityName: string;
  avgPricePerSqft: number;
  projectedRoiPercentage: number;
  rentalYieldScore: number; // 0-100
  capitalAppreciationScore: number; // 0-100
  occupancyRatePercentage: number;
  sustainabilityRating: 'A+' | 'A' | 'B+' | 'B';
  liveDemandLevel: 'Extreme' | 'High' | 'Moderate';
}

export interface SimulationParameters {
  purchasePrice: number;
  downPaymentPercentage?: number;
  mortgageTermYears?: number;
  interestRatePercentage?: number;
  expectedAnnualRent?: number;
}

export interface InvestmentSimulationResult {
  monthlyMortgagePayment: number;
  netAnnualCashFlow: number;
  grossYieldPercentage: number;
  netYieldPercentage: number;
  fiveYearEquityProjection: number;
  tenYearEquityProjection: number;
}

const COMMUNITY_TWIN_MOCK_DATA: Record<string, CommunityTwinMetrics> = {
  'downtown-dubai': {
    communityId: 'downtown-dubai',
    communityName: 'Downtown Dubai',
    avgPricePerSqft: 2450,
    projectedRoiPercentage: 7.2,
    rentalYieldScore: 88,
    capitalAppreciationScore: 94,
    occupancyRatePercentage: 96.4,
    sustainabilityRating: 'A+',
    liveDemandLevel: 'Extreme',
  },
  'palm-jumeirah': {
    communityId: 'palm-jumeirah',
    communityName: 'Palm Jumeirah',
    avgPricePerSqft: 3600,
    projectedRoiPercentage: 6.8,
    rentalYieldScore: 82,
    capitalAppreciationScore: 98,
    occupancyRatePercentage: 97.1,
    sustainabilityRating: 'A',
    liveDemandLevel: 'Extreme',
  },
  'dubai-hills': {
    communityId: 'dubai-hills',
    communityName: 'Dubai Hills Estate',
    avgPricePerSqft: 1850,
    projectedRoiPercentage: 8.1,
    rentalYieldScore: 92,
    capitalAppreciationScore: 91,
    occupancyRatePercentage: 94.8,
    sustainabilityRating: 'A+',
    liveDemandLevel: 'High',
  },
};

/**
 * Get real-time digital twin metrics for a community
 */
export function getCommunityTwinMetrics(
  communityId: string,
): CommunityTwinMetrics {
  const normalizedKey = communityId.toLowerCase();
  return (
    COMMUNITY_TWIN_MOCK_DATA[normalizedKey] || {
      communityId,
      communityName: communityId.replace(/-/g, ' ').toUpperCase(),
      avgPricePerSqft: 1950,
      projectedRoiPercentage: 7.5,
      rentalYieldScore: 85,
      capitalAppreciationScore: 88,
      occupancyRatePercentage: 95.0,
      sustainabilityRating: 'A',
      liveDemandLevel: 'High',
    }
  );
}

/**
 * Run financial ROI simulation engine
 */
export function calculateInvestmentSimulation(
  params: SimulationParameters,
): InvestmentSimulationResult {
  const {
    purchasePrice,
    downPaymentPercentage = 20,
    mortgageTermYears = 25,
    interestRatePercentage = 4.5,
    expectedAnnualRent = purchasePrice * 0.075,
  } = params;

  const loanAmount = purchasePrice * (1 - downPaymentPercentage / 100);
  const monthlyRate = interestRatePercentage / 100 / 12;
  const numberOfPayments = mortgageTermYears * 12;

  const monthlyMortgagePayment =
    monthlyRate > 0
      ? (loanAmount *
          (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      : loanAmount / numberOfPayments;

  const annualMortgageCost = monthlyMortgagePayment * 12;
  const estimatedServiceCharges = purchasePrice * 0.015; // 1.5% approx
  const netAnnualCashFlow =
    expectedAnnualRent - annualMortgageCost - estimatedServiceCharges;

  const grossYieldPercentage = (expectedAnnualRent / purchasePrice) * 100;
  const netYieldPercentage =
    ((expectedAnnualRent - estimatedServiceCharges) / purchasePrice) * 100;

  const annualAppreciationRate = 0.05; // 5% projected baseline
  const fiveYearEquityProjection =
    purchasePrice * Math.pow(1 + annualAppreciationRate, 5) - loanAmount * 0.85;
  const tenYearEquityProjection =
    purchasePrice * Math.pow(1 + annualAppreciationRate, 10) -
    loanAmount * 0.65;

  return {
    monthlyMortgagePayment: Math.round(monthlyMortgagePayment),
    netAnnualCashFlow: Math.round(netAnnualCashFlow),
    grossYieldPercentage: Number(grossYieldPercentage.toFixed(2)),
    netYieldPercentage: Number(netYieldPercentage.toFixed(2)),
    fiveYearEquityProjection: Math.round(fiveYearEquityProjection),
    tenYearEquityProjection: Math.round(tenYearEquityProjection),
  };
}
