import { DOWNLOAD_URL } from '../../config'
import { btnPrimary, btnPrimaryLg } from '../../lib/ui'

export function DownloadIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M4 21h16" />
    </svg>
  )
}

interface DownloadButtonProps {
  label?: string
  large?: boolean
  className?: string
}

export default function DownloadButton({ label = 'Get for Mac', large = false, className = '' }: DownloadButtonProps) {
  return (
    <a
      href={DOWNLOAD_URL}
      target="_blank"
      rel="noreferrer"
      className={`${large ? btnPrimaryLg : btnPrimary} ${className}`}
    >
      <span>{label}</span>
      <DownloadIcon className="h-4 w-4" />
    </a>
  )
}