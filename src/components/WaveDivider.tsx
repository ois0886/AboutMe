function WaveDivider({ flip, fill = 'var(--color-bg)' }: { flip?: boolean; fill?: string }) {
  return (
    <div
      className={`waveDivider ${flip ? 'waveDividerBottom' : 'waveDividerTop'}`}
      style={flip ? { transform: 'rotate(180deg)' } : undefined}
    >
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,20 C200,40 400,0 600,20 C800,40 1000,0 1200,20 L1200,0 L0,0 Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}

export default WaveDivider
