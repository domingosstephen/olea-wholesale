'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

const GRADES = [
  { value: 'Extra Virgin', label: 'Extra Virgin' },
  { value: 'Refined', label: 'Refined' },
  { value: 'RBD', label: 'RBD' },
  { value: 'Crude', label: 'Crude' },
  { value: 'High-Oleic', label: 'High-Oleic' },
  { value: 'Expeller Pressed', label: 'Expeller Pressed' },
  { value: 'Feedstock', label: 'Feedstock / UCO' },
]

const ORIGINS = [
  { value: 'Spain', label: 'Spain' },
  { value: 'Ukraine', label: 'Ukraine' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Germany', label: 'Germany' },
  { value: 'Malaysia', label: 'Malaysia' },
  { value: 'Indonesia', label: 'Indonesia' },
  { value: 'EU', label: 'EU' },
  { value: 'Multi-origin', label: 'Multi-origin' },
]

const PACKAGING = [
  { value: '20L', label: '20L' },
  { value: '200L Drum', label: '200L Drum' },
  { value: '1000L IBC', label: '1000L IBC' },
  { value: 'Flexitank', label: 'Flexitank' },
]

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentGrades = searchParams.get('grade')?.split(',').filter(Boolean) || []
  const currentOrigins = searchParams.get('origin')?.split(',').filter(Boolean) || []
  const currentPackaging = searchParams.get('packaging')?.split(',').filter(Boolean) || []

  const updateFilter = useCallback(
    (key: string, value: string, checked: boolean) => {
      const params = new URLSearchParams(searchParams.toString())
      const current = params.get(key)?.split(',').filter(Boolean) || []

      let updated: string[]
      if (checked) {
        updated = [...current, value]
      } else {
        updated = current.filter((v) => v !== value)
      }

      if (updated.length > 0) {
        params.set(key, updated.join(','))
      } else {
        params.delete(key)
      }
      params.delete('page')
      router.push(`/products?${params.toString()}`)
    },
    [router, searchParams]
  )

  const clearFilters = () => {
    router.push('/products')
  }

  const hasFilters = currentGrades.length > 0 || currentOrigins.length > 0 || currentPackaging.length > 0

  return (
    <aside className="space-y-6">
      <div>
        <h2 className="text-headline-md text-on-surface">Catalog Filters</h2>
        <p className="mt-1 text-body-md text-on-surface-variant">Refine your supply selection</p>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="mt-2 text-label-md text-secondary hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      <hr className="border-outline-variant" />

      <FilterGroup
        title="Grade"
        options={GRADES}
        selected={currentGrades}
        filterKey="grade"
        onChange={updateFilter}
      />

      <FilterGroup
        title="Origin"
        options={ORIGINS}
        selected={currentOrigins}
        filterKey="origin"
        onChange={updateFilter}
      />

      <FilterGroup
        title="Packaging Size"
        options={PACKAGING}
        selected={currentPackaging}
        filterKey="packaging"
        onChange={updateFilter}
        asPills
      />
    </aside>
  )
}

function FilterGroup({
  title,
  options,
  selected,
  filterKey,
  onChange,
  asPills,
}: {
  title: string
  options: { value: string; label: string }[]
  selected: string[]
  filterKey: string
  onChange: (key: string, value: string, checked: boolean) => void
  asPills?: boolean
}) {
  return (
    <div>
      <h3 className="mb-3 font-label text-label-md uppercase tracking-wider text-on-surface">
        {title}
      </h3>
      {asPills ? (
        <div className="flex flex-wrap gap-2">
          {options.map((opt) => {
            const isSelected = selected.includes(opt.value)
            return (
              <button
                key={opt.value}
                onClick={() => onChange(filterKey, opt.value, !isSelected)}
                className={`rounded-lg border px-3 py-1.5 text-label-sm transition-colors ${
                  isSelected
                    ? 'border-primary bg-primary text-on-primary'
                    : 'border-outline text-on-surface hover:bg-surface-container'
                }`}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {options.map((opt) => (
            <label key={opt.value} className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                onChange={(e) => onChange(filterKey, opt.value, e.target.checked)}
                className="h-4 w-4 rounded border-outline text-primary focus:ring-primary"
              />
              <span className="text-body-md text-on-surface-variant">{opt.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
