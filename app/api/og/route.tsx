import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'Free Printable Planners & Business Documents';
    const subtitle = searchParams.get('subtitle') || 'Vector PDFs | 100% Client-Side & Private | Zero Signup';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px 80px',
            backgroundColor: '#0F172A',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #1E293B 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1E293B 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '14px',
                backgroundColor: '#4F46E5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: '28px',
                fontWeight: 'bold',
                boxShadow: '0 10px 25px rgba(79, 70, 229, 0.4)',
              }}
            >
              L
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: '32px',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '-0.5px',
                }}
              >
                LogoLoom
              </span>
              <span style={{ fontSize: '16px', color: '#818CF8', fontWeight: 600 }}>
                logoloom.app
              </span>
            </div>
          </div>

          {/* Center Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: 'rgba(79, 70, 229, 0.15)',
                border: '1px solid rgba(129, 140, 248, 0.3)',
                padding: '8px 18px',
                borderRadius: '999px',
                alignSelf: 'flex-start', // 'fit-content' is not supported by the OG renderer (crashed every preview)
              }}
            >
              <span style={{ fontSize: '15px', color: '#A5B4FC', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                Zero Account | Free Forever | Instant PDF
              </span>
            </div>

            <h1
              style={{
                fontSize: '56px',
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.15,
                letterSpacing: '-1px',
                maxWidth: '960px',
                margin: 0,
              }}
            >
              {title}
            </h1>

            <p
              style={{
                fontSize: '22px',
                color: '#94A3B8',
                lineHeight: 1.4,
                maxWidth: '900px',
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Footer Features */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid #1E293B',
              paddingTop: '28px',
            }}
          >
            <div style={{ display: 'flex', gap: '16px' }}>
              <span style={{ backgroundColor: '#1E293B', color: '#E2E8F0', padding: '8px 16px', borderRadius: '8px', fontSize: '15px', fontWeight: 600 }}>
                Habit Tracker
              </span>
              <span style={{ backgroundColor: '#1E293B', color: '#E2E8F0', padding: '8px 16px', borderRadius: '8px', fontSize: '15px', fontWeight: 600 }}>
                Weekly Planner
              </span>
              <span style={{ backgroundColor: '#1E293B', color: '#E2E8F0', padding: '8px 16px', borderRadius: '8px', fontSize: '15px', fontWeight: 600 }}>
                Invoice &amp; Quote
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontSize: '16px', fontWeight: 700 }}>
              <span>100% In-Browser Privacy</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate OG image: ${e.message}`, { status: 500 });
  }
}
