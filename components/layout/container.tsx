import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function Container({ children, className, as: Component = 'div' }: ContainerProps) {
  return (
    <Component className={cn('max-w-container mx-auto px-margin-mobile md:px-margin-desktop', className)}>
      {children}
    </Component>
  )
}
