'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FilterChips } from './filter-chips';

export function HomesFilterChips({
  options,
}: {
  options: { value: string; label: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTypes = searchParams.getAll('property_type');

  const handleChange = (values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('property_type');
    values.forEach((v) => params.append('property_type', v));
    router.push(`?${params.toString()}`);
  };

  return (
    <FilterChips
      options={options}
      value={currentTypes}
      onChange={handleChange}
      multiple
    />
  );
}
