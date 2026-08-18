export default function VGALogo({ className }) {
    return (
        <svg className={className} viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: '32px', width: 'auto', display: 'block' }}>
            <defs>
                <linearGradient id="vgaGrad" x1="0" y1="0" x2="160" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0284c7" />
                    <stop offset="1" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="neuroGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366f1" />
                    <stop offset="1" stopColor="#0284c7" />
                </linearGradient>
            </defs>

            {/* Neural Node Icon */}
            <circle cx="20" cy="20" r="16" stroke="url(#neuroGrad)" strokeWidth="2.5" strokeDasharray="6 3" />
            <circle cx="12" cy="12" r="3.5" fill="#0284c7" />
            <circle cx="28" cy="12" r="3.5" fill="#0284c7" />
            <circle cx="20" cy="28" r="4.5" fill="#6366f1" />
            <path d="M12 12L20 28 L28 12" stroke="url(#neuroGrad)" strokeWidth="1.5" />
            <path d="M12 12L28 12" stroke="url(#neuroGrad)" strokeWidth="1.5" />

            {/* VGA Text Paths */}
            <g transform="translate(50, 0)">
                {/* V */}
                <path d="M0 10L12 30L24 10" stroke="url(#vgaGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

                {/* G */}
                <path d="M48 14C45 11 40 10 35 12C30 14 28 18 28 22C28 26 33 30 38 30C44 30 47 28 48 24H38" stroke="url(#vgaGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

                {/* A */}
                <path d="M60 30L70 10L80 30 M64 22H76" stroke="url(#vgaGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

                {/* Decorative Dot */}
                <circle cx="88" cy="26" r="3.5" fill="#0284c7" />
            </g>
        </svg>
    )
}
