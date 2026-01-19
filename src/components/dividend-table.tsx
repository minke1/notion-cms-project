"use client";

import { useMemo, memo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { PivotTableRow, PivotTableFooter } from "@/types/dividend";
import { formatUSD, formatKRW, formatMonthShort } from "@/lib/dividend-utils";

interface DividendTableProps {
  rows: PivotTableRow[];
  footer: PivotTableFooter;
}

// rerender-memo: 테이블 컴포넌트 메모이제이션
export const DividendTable = memo(function DividendTable({ rows, footer }: DividendTableProps) {
  // 동적으로 월 컬럼 추출
  const months = useMemo(() => {
    if (rows.length === 0) return [];
    const firstRow = rows[0];
    return Object.keys(firstRow)
      .filter((key) => key.match(/^\d{4}-\d{2}$/))
      .sort();
  }, [rows]);

  // 컬럼 정의
  const columns = useMemo<ColumnDef<PivotTableRow>[]>(() => {
    const baseColumns: ColumnDef<PivotTableRow>[] = [
      {
        accessorKey: "ticker",
        header: "종목",
        cell: ({ row }) => (
          <div className="font-medium">
            <div>{row.original.ticker}</div>
            <div className="text-xs text-muted-foreground">{row.original.name}</div>
          </div>
        ),
      },
    ];

    const monthColumns: ColumnDef<PivotTableRow>[] = months.map((month) => ({
      accessorKey: month,
      header: formatMonthShort(month),
      cell: ({ row }) => {
        const value = row.original[month] as number;
        return value > 0 ? (
          <div className="text-right font-mono">{formatUSD(value)}</div>
        ) : (
          <div className="text-right text-muted-foreground">-</div>
        );
      },
    }));

    const totalColumn: ColumnDef<PivotTableRow> = {
      accessorKey: "total",
      header: "합계",
      cell: ({ row }) => {
        const value = row.original.total as number;
        return <div className="text-right font-mono font-bold">{formatUSD(value)}</div>;
      },
    };

    return [...baseColumns, ...monthColumns, totalColumn];
  }, [months]);

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Footer 합계 계산
  const totalUSD = useMemo(
    () => Object.values(footer.totalUSD).reduce((sum, val) => sum + val, 0),
    [footer.totalUSD]
  );
  const totalKRW = useMemo(
    () => Object.values(footer.totalKRW).reduce((sum, val) => sum + val, 0),
    [footer.totalKRW]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>종목별 배당 내역</CardTitle>
        <CardDescription>종목별 월별 배당금 (USD)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={header.column.id !== "ticker" ? "text-right" : ""}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    배당 내역이 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              {/* USD 합계 행 */}
              <TableRow className="bg-muted/50">
                <TableCell className="font-bold">합계 (USD)</TableCell>
                {months.map((month) => (
                  <TableCell key={month} className="text-right font-mono">
                    {formatUSD(footer.totalUSD[month] || 0)}
                  </TableCell>
                ))}
                <TableCell className="text-right font-mono font-bold">{formatUSD(totalUSD)}</TableCell>
              </TableRow>
              {/* KRW 합계 행 */}
              <TableRow className="bg-muted/50">
                <TableCell className="font-bold">합계 (KRW)</TableCell>
                {months.map((month) => (
                  <TableCell key={month} className="text-right font-mono text-xs">
                    {formatKRW(footer.totalKRW[month] || 0)}
                  </TableCell>
                ))}
                <TableCell className="text-right font-mono font-bold text-xs">
                  {formatKRW(totalKRW)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
});
