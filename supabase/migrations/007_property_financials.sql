-- Migration: 007_property_financials
-- Description: Adds core financial projection metrics to properties for ROI and yield modeling.

ALTER TABLE properties
ADD COLUMN cap_rate_percentage numeric(5,2),
ADD COLUMN est_annual_rental numeric(12,2);

-- Update RLS if needed (already managed by broader policies, but explicitly stating for audit)
-- Commenting on columns for postgrest reflection
COMMENT ON COLUMN properties.cap_rate_percentage IS 'Estimated capitalization rate percentage (yield)';
COMMENT ON COLUMN properties.est_annual_rental IS 'Estimated annual rental income in AED';
