import type { LucideIcon } from 'lucide-react'
import * as Icons from 'lucide-react'

export function getIcon(name: string, fallback: LucideIcon = Icons.Circle): LucideIcon {
  const icon = (Icons as unknown as Record<string, LucideIcon>)[name]
  return icon ?? fallback
}
