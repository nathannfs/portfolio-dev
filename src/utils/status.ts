import type { Status } from '@/types/status'

export function statusLabel(status: Status | undefined) {
  switch (status) {
    case 'completed':
      return 'Concluído'
    case 'in_progress':
      return 'Em andamento'
    case 'planned':
      return 'Planejado'
    default:
      return ''
  }
}

export function statusColor(status: Status | undefined) {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'in_progress':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'planned':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    default:
      return ''
  }
}
