import { useEffect, useId, useRef, useState, type ImgHTMLAttributes } from 'react'
import styles from './ImageViewer.module.css'

interface ImageViewerProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
}

function ImageViewer({ src, alt, ...imageProps }: ImageViewerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isOriginalSize, setIsOriginalSize] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    if (!isOpen) return

    const dialog = dialogRef.current!
    const trigger = triggerRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    closeRef.current?.focus()

    return () => {
      if (dialog.open) dialog.close()
      document.body.style.overflow = previousOverflow
      trigger?.focus()
    }
  }, [isOpen])

  const closeViewer = () => {
    dialogRef.current?.close()
    setIsOpen(false)
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-label={`${alt} 확대 보기`}
        aria-haspopup="dialog"
        onClick={() => {
          setIsOriginalSize(false)
          setIsOpen(true)
        }}
      >
        <img src={src} alt={alt} {...imageProps} />
        <span className={styles.expandHint} aria-hidden="true">확대 ↗</span>
      </button>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby={titleId}
        onClose={() => setIsOpen(false)}
        onKeyDown={(event) => {
          if (event.key !== 'Tab') return

          const dialog = event.currentTarget
          const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ))
          const first = focusable[0]
          const last = focusable[focusable.length - 1]
          if (!first || !last) return
          const isOutsideTabOrder = !focusable.includes(document.activeElement as HTMLElement)

          if (event.shiftKey && (document.activeElement === first || isOutsideTabOrder)) {
            event.preventDefault()
            last.focus()
          } else if (!event.shiftKey && (document.activeElement === last || isOutsideTabOrder)) {
            event.preventDefault()
            first.focus()
          }
        }}
        onCancel={(event) => {
          event.preventDefault()
          closeViewer()
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return

          const bounds = event.currentTarget.getBoundingClientRect()
          if (
            event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom
          ) closeViewer()
        }}
      >
        {isOpen && (
          <>
            <div className={styles.toolbar}>
              <p id={titleId} className={styles.title}>{alt}</p>
              <div className={styles.controls}>
                <button
                  type="button"
                  aria-pressed={isOriginalSize}
                  onClick={() => setIsOriginalSize((value) => !value)}
                >
                  {isOriginalSize ? '화면에 맞추기' : '원본 크기'}
                </button>
                <button ref={closeRef} type="button" onClick={closeViewer}>닫기</button>
              </div>
            </div>
            <div
              className={`${styles.viewport} ${isOriginalSize ? styles.originalSize : ''}`}
              role="region"
              aria-label="확대 이미지"
              tabIndex={isOriginalSize ? 0 : -1}
            >
              <img src={src} alt={alt} className={styles.fullImage} decoding="async" />
            </div>
          </>
        )}
      </dialog>
    </>
  )
}

export default ImageViewer
