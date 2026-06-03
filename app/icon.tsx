import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div style={{
      background: '#0D3B8E',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      fontWeight: 800,
      fontSize: 20,
      color: 'white',
      letterSpacing: '-1px',
    }}>
      H
    </div>
  )
}
