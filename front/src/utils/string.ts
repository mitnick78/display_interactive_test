const titleMap: Record<string, string> = {
  m: 'Mr',
  mme: 'Mme',
}

export function formatTitle(str: string): string {
  if (!str) return ''
  return titleMap[str.toLowerCase()] ?? capitalize(str)
}
export function capitalize(str: string): string{
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}