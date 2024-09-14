export interface ExcelRow {
  name: string
  score: number
}

export interface ExcelDropzoneProps {
  onSheetDrop: (rows: ExcelRow[]) => void
  label: string
}
