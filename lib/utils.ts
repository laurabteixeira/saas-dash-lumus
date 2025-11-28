import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format ISO date string to Brazilian format: DD/MM/YYYY - HH:mm
 * @param dateString - ISO date string (e.g., "2025-11-13T20:04:41.009Z")
 * @returns Formatted date string (e.g., "13/11/2025 - 20:04")
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
    
    return `${day}/${month}/${year}, às ${hours}:${minutes}`
  } catch (error) {
    console.error("Error formatting date:", error)
    return dateString
  }
}

