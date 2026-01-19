"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface YearSelectorProps {
  years: number[];
  selectedYear: number;
  onYearChange: (year: number) => void;
}

export function YearSelector({ years, selectedYear, onYearChange }: YearSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">연도 선택:</span>
      <Select
        value={selectedYear.toString()}
        onValueChange={(value) => onYearChange(parseInt(value, 10))}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="연도 선택" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}년
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
