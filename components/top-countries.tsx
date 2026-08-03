import { formatInteger } from '@/components/formater';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowRightIcon } from 'lucide-react';

const FLAGPACK_BASE = 'https://flag.vercel.app';

const rows = [
  { code: 'GB', visits: 14250, delta: 18.4 },
  { code: 'IN', visits: 11840, delta: 22.1 },
  { code: 'SA', visits: 9620, delta: 14.8 },
  { code: 'FR', visits: 6420, delta: 9.6 },
  { code: 'DE', visits: 5890, delta: 12.2 },
  { code: 'AE', visits: 4890, delta: 5.4 },
] as const;

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

function flagUrl(countryCode: string) {
  return `${FLAGPACK_BASE}/s/${countryCode.toUpperCase()}.svg`;
}

export function TopCountries() {
  return (
    <Card className="hover:shadow-floating relative border border-border/40 bg-surface/70 backdrop-blur-md transition-all duration-300 md:col-span-2 lg:col-span-2">
      <CardHeader>
        <CardTitle className="font-display text-lg font-medium text-balance text-fjord">
          International Capital Inflow
        </CardTitle>
        <CardDescription className="text-xs font-light text-pretty text-muted-foreground">
          Top foreign buyer origin markets & 12-month capital deployment
          velocity.
        </CardDescription>
      </CardHeader>
      <CardContent className="mask-b-from-50% mask-b-to-100% p-0 pb-2">
        <Table className="border-t">
          <TableCaption className="sr-only">
            Top countries by visits with year-over-year change.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6" scope="col">
                Country
              </TableHead>
              <TableHead className="text-end tabular-nums" scope="col">
                Active Inquiries
              </TableHead>
              <TableHead className="pr-6 text-end" scope="col">
                Change
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow className="hover:bg-transparent" key={row.code}>
                <TableCell className="max-w-55 truncate pl-6 font-medium">
                  <span className="inline-flex max-w-full items-center gap-2">
                    <Image
                      alt={`Flag of ${row.code}`}
                      className="h-3.5 w-5 shrink-0 rounded-none object-cover"
                      height={14}
                      src={flagUrl(row.code)}
                      width={20}
                    />
                    <span className="min-w-0 truncate text-xs">
                      {regionNames.of(row.code) ?? row.code}
                    </span>
                  </span>
                </TableCell>
                <TableCell className="text-end text-xs text-muted-foreground tabular-nums">
                  {formatInteger(row.visits)}
                </TableCell>
                <TableCell className="pr-6 text-end text-xs text-muted-foreground">
                  <span className="tabular-nums">
                    {row.delta > 0 ? '+' : ''}
                    {row.delta}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <div className="absolute inset-x-0 bottom-0 flex h-1/5 items-center justify-center bg-background mask-t-from-30%">
        <Button
          className="relative"
          variant="ghost"
          render={<a href="#" />}
          nativeButton={false}
        >
          View All
          <ArrowRightIcon aria-hidden="true" />
        </Button>
      </div>
    </Card>
  );
}
