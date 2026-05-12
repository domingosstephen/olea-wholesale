interface SpecsTableProps {
  specifications: Record<string, { result: string; limit: string }> | null
}

const labelMap: Record<string, string> = {
  free_acidity: 'Free Acidity (Oleic Acid)',
  peroxide_value: 'Peroxide Value',
  absorbency_k270: 'Absorbency in UV (K270)',
  absorbency_k232: 'Absorbency in UV (K232)',
  wax_content: 'Wax Content',
  free_fatty_acid: 'Free Fatty Acid',
  oleic_acid: 'Oleic Acid Content',
  iodine_value: 'Iodine Value',
  smoke_point: 'Smoke Point',
  erucic_acid: 'Erucic Acid',
  omega_3: 'Omega-3 Content',
  saturated_fat: 'Saturated Fat',
  polar_compounds: 'Polar Compounds',
  blend_ratio: 'Blend Ratio',
  moisture: 'Moisture Content',
  phosphorus: 'Phosphorus Content',
  color: 'Color',
  melting_point: 'Melting Point',
  miu: 'MIU (Moisture, Impurities, Unsaponifiables)',
  flash_point: 'Flash Point',
  dobi: 'DOBI (Deterioration of Bleachability Index)',
  carotene: 'Carotene Content',
}

export function SpecsTable({ specifications }: SpecsTableProps) {
  if (!specifications) return null

  const entries = Object.entries(specifications) as [string, { result: string; limit: string }][]

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant">
      <table className="w-full">
        <thead>
          <tr className="bg-primary-container">
            <th className="px-4 py-3 text-left font-label text-label-md text-on-primary">
              Chemical Parameter
            </th>
            <th className="px-4 py-3 text-left font-label text-label-md text-on-primary">Result</th>
            <th className="px-4 py-3 text-left font-label text-label-md text-on-primary">
              Limit (COI)
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([key, { result, limit }]) => (
            <tr key={key} className="border-t border-outline-variant">
              <td className="px-4 py-3 text-body-md text-on-surface">
                {labelMap[key] || key.replace(/_/g, ' ')}
              </td>
              <td className="px-4 py-3 text-body-md font-medium text-on-surface">{result}</td>
              <td className="px-4 py-3 text-body-md text-on-surface-variant">{limit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
