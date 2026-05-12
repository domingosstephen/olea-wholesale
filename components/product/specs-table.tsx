interface SpecsTableProps {
  specifications: Record<string, { result: string; limit: string }> | null
}

const labelMap: Record<string, string> = {
  free_acidity: 'Free Acidity',
  peroxide_value: 'Peroxide Value',
  absorbency_k270: 'UV K270',
  absorbency_k232: 'UV K232',
  wax_content: 'Wax Content',
  free_fatty_acid: 'Free Fatty Acid',
  oleic_acid: 'Oleic Acid',
  iodine_value: 'Iodine Value',
  smoke_point: 'Smoke Point',
  erucic_acid: 'Erucic Acid',
  omega_3: 'Omega-3',
  saturated_fat: 'Saturated Fat',
  polar_compounds: 'Polar Compounds',
  blend_ratio: 'Blend Ratio',
  moisture: 'Moisture',
  phosphorus: 'Phosphorus',
  color: 'Color',
  melting_point: 'Melting Point',
  miu: 'MIU',
  flash_point: 'Flash Point',
  dobi: 'DOBI',
  carotene: 'Carotene',
}

export function SpecsTable({ specifications }: SpecsTableProps) {
  if (!specifications) return null

  const entries = Object.entries(specifications) as [string, { result: string; limit: string }][]

  return (
    <div className="-mx-margin-mobile overflow-x-auto px-margin-mobile sm:mx-0 sm:px-0">
      <div className="min-w-[400px] overflow-hidden rounded-2xl border border-outline-variant">
        <table className="w-full">
          <thead>
            <tr className="bg-primary-container">
              <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-on-primary sm:px-4 sm:py-3 sm:text-xs">
                Parameter
              </th>
              <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-on-primary sm:px-4 sm:py-3 sm:text-xs">
                Result
              </th>
              <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-on-primary sm:px-4 sm:py-3 sm:text-xs">
                Limit
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([key, { result, limit }]) => (
              <tr key={key} className="border-t border-outline-variant/50 transition-colors hover:bg-surface-container-low">
                <td className="px-3 py-2.5 text-xs text-on-surface sm:px-4 sm:py-3 sm:text-sm">
                  {labelMap[key] || key.replace(/_/g, ' ')}
                </td>
                <td className="px-3 py-2.5 text-xs font-semibold text-on-surface sm:px-4 sm:py-3 sm:text-sm">{result}</td>
                <td className="px-3 py-2.5 text-xs text-on-surface-variant sm:px-4 sm:py-3 sm:text-sm">{limit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
