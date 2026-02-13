import React from 'react';

/**
 * Modern Research Framework Diagram
 * Recreates the conceptual structure: Impact → Pillars → Foundation → Research Streams
 * Uses CSS custom properties for dark/light mode support.
 */
export default function ResearchDiagram() {
    // Colors that adapt via CSS vars where possible, with navy/amber/green palette
    const navy = 'var(--diagram-navy, #1e3a5f)';
    const navyLight = 'var(--diagram-navy-light, #2a5080)';
    const amber = 'var(--diagram-amber, #c9952b)';
    const green = 'var(--diagram-green, #2d8a56)';
    const blue = 'var(--diagram-blue, #3b7dd8)';
    const textColor = 'var(--color-text, #1a1a2e)';
    const textMuted = 'var(--color-text-muted, #888899)';
    const bg = 'var(--diagram-bg, #ffffff)';
    const bgSoft = 'var(--diagram-bg-soft, #f8f9fc)';

    return (
        <svg
            viewBox="0 0 900 580"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Research Overview: Large Scale Computing and Energy"
            style={{
                width: '100%',
                height: 'auto',
                fontFamily: "var(--font-sans, 'Inter', sans-serif)",
            }}
        >
            <defs>
                {/* Gradients */}
                <linearGradient id="impactGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={navy} />
                    <stop offset="100%" stopColor={navyLight} />
                </linearGradient>
                <linearGradient id="pillarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={navy} stopOpacity="0.08" />
                    <stop offset="100%" stopColor={navy} stopOpacity="0.02" />
                </linearGradient>
                <linearGradient id="foundationGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={blue} stopOpacity="0.06" />
                    <stop offset="50%" stopColor={navy} stopOpacity="0.04" />
                    <stop offset="100%" stopColor={green} stopOpacity="0.06" />
                </linearGradient>
                <linearGradient id="streamBlueGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={blue} />
                    <stop offset="100%" stopColor={navyLight} />
                </linearGradient>
                <linearGradient id="streamGreenGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={green} />
                    <stop offset="100%" stopColor="#1f7045" />
                </linearGradient>
                <linearGradient id="arrowAmberGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={amber} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={amber} />
                </linearGradient>

                {/* Arrow markers */}
                <marker id="arrowNavy" viewBox="0 0 10 8" refX="9" refY="4"
                    markerWidth="8" markerHeight="6" orient="auto-start-reverse">
                    <path d="M0,0 L10,4 L0,8 Z" fill={navy} fillOpacity="0.5" />
                </marker>
                <marker id="arrowAmber" viewBox="0 0 10 8" refX="9" refY="4"
                    markerWidth="8" markerHeight="6" orient="auto-start-reverse">
                    <path d="M0,0 L10,4 L0,8 Z" fill={amber} />
                </marker>
                <marker id="arrowGreen" viewBox="0 0 10 8" refX="9" refY="4"
                    markerWidth="8" markerHeight="6" orient="auto-start-reverse">
                    <path d="M0,0 L10,4 L0,8 Z" fill={green} fillOpacity="0.6" />
                </marker>
            </defs>

            {/* ═══════════════════════════════════════════════════════
          LAYER 1 — IMPACT (top banner)
          ═══════════════════════════════════════════════════════ */}
            <rect x="250" y="12" width="400" height="44" rx="22" fill="url(#impactGrad)" />
            <text x="450" y="40" textAnchor="middle" fill="#ffffff"
                fontSize="15" fontWeight="600" letterSpacing="3">
                IMPACT
            </text>

            {/* Connecting lines from Impact to three pillars */}
            <line x1="350" y1="56" x2="150" y2="90" stroke={navy} strokeWidth="1.5" strokeOpacity="0.25" />
            <line x1="450" y1="56" x2="450" y2="90" stroke={navy} strokeWidth="1.5" strokeOpacity="0.25" />
            <line x1="550" y1="56" x2="750" y2="90" stroke={navy} strokeWidth="1.5" strokeOpacity="0.25" />

            {/* ═══════════════════════════════════════════════════════
          LAYER 2 — THREE PILLARS
          ═══════════════════════════════════════════════════════ */}
            {[
                { x: 60, label: 'Scholarship', icon: 'M12,3 L20,8 V20 H4 V8 Z M8,20 V12 H16 V20' },
                { x: 355, label: 'Practice', icon: 'M6,4 H18 V20 H6 Z M9,8 H15 M9,12 H15 M9,16 H13' },
                { x: 650, label: 'Teaching & Service', icon: 'M12,2 A4,4 0 1,1 12,10 A4,4 0 1,1 12,2 M4,20 C4,15 8,13 12,13 S20,15 20,20' },
            ].map(({ x, label, icon }) => (
                <g key={label}>
                    {/* Pillar card */}
                    <rect x={x} y="90" width="190" height="70" rx="10"
                        fill={bgSoft} stroke={navy} strokeWidth="1" strokeOpacity="0.12" />
                    {/* Icon circle */}
                    <circle cx={x + 30} cy="125" r="16" fill={navy} fillOpacity="0.08" />
                    <g transform={`translate(${x + 18}, 113) scale(1)`}>
                        <path d={icon} fill="none" stroke={navy} strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" />
                    </g>
                    {/* Label */}
                    <text x={x + 110} y="130" textAnchor="middle" fill={textColor}
                        fontSize="13" fontWeight="600">
                        {label}
                    </text>
                </g>
            ))}

            {/* ═══════════════════════════════════════════════════════
          LAYER 3 — Upward arrows from Foundation to Pillars
          ═══════════════════════════════════════════════════════ */}
            <line x1="155" y1="160" x2="155" y2="200" stroke={navy} strokeWidth="1.2"
                strokeOpacity="0.2" strokeDasharray="4 3" markerEnd="url(#arrowNavy)"
                transform="rotate(180, 155, 180)" />
            <line x1="450" y1="160" x2="450" y2="200" stroke={navy} strokeWidth="1.2"
                strokeOpacity="0.2" strokeDasharray="4 3" markerEnd="url(#arrowNavy)"
                transform="rotate(180, 450, 180)" />
            <line x1="745" y1="160" x2="745" y2="200" stroke={navy} strokeWidth="1.2"
                strokeOpacity="0.2" strokeDasharray="4 3" markerEnd="url(#arrowNavy)"
                transform="rotate(180, 745, 180)" />

            {/* ═══════════════════════════════════════════════════════
          LAYER 4 — FOUNDATION: RESEARCH PROGRAM
          ═══════════════════════════════════════════════════════ */}
            <rect x="60" y="200" width="780" height="90" rx="12"
                fill="url(#foundationGrad)" stroke={navy} strokeWidth="1" strokeOpacity="0.10" />

            <text x="450" y="232" textAnchor="middle" fill={textColor}
                fontSize="14" fontWeight="700" letterSpacing="1.5">
                FOUNDATION: RESEARCH PROGRAM
            </text>
            <text x="450" y="255" textAnchor="middle" fill={amber}
                fontSize="12" fontWeight="500">
                Decision Performance · Computational Efficiency · Access
            </text>

            {/* Small decorative line under subtitle */}
            <line x1="320" y1="266" x2="580" y2="266" stroke={amber} strokeWidth="1" strokeOpacity="0.3" />

            {/* ═══════════════════════════════════════════════════════
          Arrows from research streams UP to foundation
          ═══════════════════════════════════════════════════════ */}
            <line x1="270" y1="290" x2="270" y2="340" stroke={blue} strokeWidth="1.2"
                strokeOpacity="0.3" strokeDasharray="4 3" markerEnd="url(#arrowNavy)"
                transform="rotate(180, 270, 315)" />
            <line x1="630" y1="290" x2="630" y2="340" stroke={green} strokeWidth="1.2"
                strokeOpacity="0.3" strokeDasharray="4 3" markerEnd="url(#arrowNavy)"
                transform="rotate(180, 630, 315)" />

            {/* ═══════════════════════════════════════════════════════
          LAYER 5 — TWO RESEARCH STREAMS
          ═══════════════════════════════════════════════════════ */}

            {/* Stream A: Self-adapting MDP Approximations */}
            <g>
                <rect x="80" y="340" width="380" height="140" rx="12"
                    fill={bgSoft} stroke={blue} strokeWidth="1.5" strokeOpacity="0.25" />
                {/* Accent bar on left */}
                <rect x="80" y="340" width="4" height="140" rx="2" fill={blue} fillOpacity="0.6" />

                {/* Stream header */}
                <circle cx="115" cy="370" r="14" fill={blue} fillOpacity="0.1" />
                <g transform="translate(105, 360) scale(0.85)">
                    {/* Gear/network icon */}
                    <circle cx="12" cy="12" r="5" fill="none" stroke={blue} strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="2" fill={blue} fillOpacity="0.5" />
                    <line x1="12" y1="2" x2="12" y2="7" stroke={blue} strokeWidth="1.2" />
                    <line x1="12" y1="17" x2="12" y2="22" stroke={blue} strokeWidth="1.2" />
                    <line x1="2" y1="12" x2="7" y2="12" stroke={blue} strokeWidth="1.2" />
                    <line x1="17" y1="12" x2="22" y2="12" stroke={blue} strokeWidth="1.2" />
                </g>

                <text x="140" y="375" fill={textColor} fontSize="14" fontWeight="700">
                    Self-adapting MDP Approximations
                </text>

                {/* Sub-items */}
                <circle cx="108" cy="405" r="3" fill={blue} fillOpacity="0.4" />
                <text x="120" y="409" fill={textMuted} fontSize="11.5" fontWeight="500">
                    Structuring and Selecting Approximations
                </text>
                <circle cx="108" cy="430" r="3" fill={blue} fillOpacity="0.4" />
                <text x="120" y="434" fill={textMuted} fontSize="11.5" fontWeight="500">
                    Guiding the Solution Process
                </text>

                {/* Decorative dots */}
                <circle cx="420" cy="360" r="2" fill={blue} fillOpacity="0.08" />
                <circle cx="435" cy="370" r="3" fill={blue} fillOpacity="0.06" />
                <circle cx="425" cy="385" r="1.5" fill={blue} fillOpacity="0.1" />
            </g>

            {/* Stream B: Energy Real Options */}
            <g>
                <rect x="500" y="340" width="340" height="140" rx="12"
                    fill={bgSoft} stroke={green} strokeWidth="1.5" strokeOpacity="0.25" />
                {/* Accent bar on left */}
                <rect x="500" y="340" width="4" height="140" rx="2" fill={green} fillOpacity="0.6" />

                {/* Stream header */}
                <circle cx="535" cy="370" r="14" fill={green} fillOpacity="0.1" />
                <g transform="translate(525, 360) scale(0.85)">
                    {/* Energy/bolt icon */}
                    <path d="M13,2 L6,14 H11 L9,22 L18,10 H13 Z" fill="none" stroke={green}
                        strokeWidth="1.5" strokeLinejoin="round" />
                </g>

                <text x="560" y="375" fill={textColor} fontSize="14" fontWeight="700">
                    Energy Real Options
                </text>

                {/* Sub-items */}
                <circle cx="528" cy="405" r="3" fill={green} fillOpacity="0.4" />
                <text x="540" y="409" fill={textMuted} fontSize="11.5" fontWeight="500">
                    Energy & Computing
                </text>
                <circle cx="528" cy="430" r="3" fill={green} fillOpacity="0.4" />
                <text x="540" y="434" fill={textMuted} fontSize="11.5" fontWeight="500">
                    Energy Investment & Operations
                </text>

                {/* Decorative dots */}
                <circle cx="800" cy="360" r="2" fill={green} fillOpacity="0.08" />
                <circle cx="810" cy="375" r="3" fill={green} fillOpacity="0.06" />
                <circle cx="795" cy="385" r="1.5" fill={green} fillOpacity="0.1" />
            </g>

            {/* ═══════════════════════════════════════════════════════
          FEEDBACK LOOP — "New Challenges" curved arrow
          ═══════════════════════════════════════════════════════ */}
            <path
                d="M460,480 C460,530 200,540 160,490"
                fill="none"
                stroke={amber}
                strokeWidth="1.5"
                strokeOpacity="0.5"
                strokeDasharray="6 4"
                markerStart="url(#arrowAmber)"
            />
            {/* Horizontal connector from stream A bottom to loop start */}
            <line x1="270" y1="480" x2="460" y2="480" stroke={amber} strokeWidth="1"
                strokeOpacity="0.3" strokeDasharray="4 3" />
            {/* Connector from loop end to stream B */}
            <path d="M460,480 C550,530 680,520 670,490"
                fill="none" stroke={amber} strokeWidth="1.5" strokeOpacity="0.5"
                strokeDasharray="6 4" />

            {/* Label on the feedback loop */}
            <rect x="385" y="518" width="130" height="24" rx="12"
                fill={amber} fillOpacity="0.1" />
            <text x="450" y="534" textAnchor="middle" fill={amber}
                fontSize="10.5" fontWeight="600" letterSpacing="0.5">
                New Challenges
            </text>

            {/* ═══════════════════════════════════════════════════════
          DECORATIVE ELEMENTS — subtle grid dots in background
          ═══════════════════════════════════════════════════════ */}
            {[...Array(8)].map((_, i) => (
                <circle key={`dot-${i}`}
                    cx={100 + i * 100}
                    cy="570"
                    r="1"
                    fill={navy}
                    fillOpacity="0.06"
                />
            ))}
        </svg>
    );
}
