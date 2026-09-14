import React from 'react';

interface FinOpsCycleRadarProps {
  activePhase: number;
  onSelectPhase?: (index: number) => void;
}

export const FinOpsCycleRadar: React.FC<FinOpsCycleRadarProps> = ({
  activePhase,
  onSelectPhase,
}) => {
  const phases = [
    'PLAN',
    'MEASURE',
    'ALLOCATE',
    'ANALYZE',
    'OPTIMIZE',
    'FORECAST',
    'GOVERN',
    'CONTINUOUSLY IMPROVE',
  ];

  const nodeColors = [
    '#60a5fa', // PLAN
    '#a78bfa', // MEASURE
    '#fbbf24', // ALLOCATE
    '#fb923c', // ANALYZE
    '#4ade80', // OPTIMIZE
    '#22d3ee', // FORECAST
    '#f87171', // GOVERN
    '#f472b6', // CONTINUOUSLY IMPROVE
  ];

  const sweepDeg = [0, 45, 90, 135, 180, 225, 270, 315];
  const activeColor = nodeColors[activePhase] || '#4ade80';
  const currentDeg = sweepDeg[activePhase] ?? 0;
  const currentLabel = phases[activePhase] || 'OPTIMIZE';

  return (
    <div className="relative w-full max-w-[460px] mx-auto select-none">
      <svg
        viewBox="-30 -20 480 460"
        width="100%"
        className="block max-w-[460px] mx-auto overflow-visible"
        aria-label="FinOps Continuous Delivery Loop"
      >
        {/* Outer Octagon Polygon */}
        <polygon
          points="210,40 330,90 380,210 330,330 210,380 90,330 40,210 90,90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-slate-300 dark:text-white/20"
        />

        {/* Rotating sweep line from center to active node */}
        <line
          x1="210"
          y1="210"
          x2="210"
          y2="40"
          stroke={activeColor}
          strokeWidth="2"
          opacity="0.85"
          style={{
            transform: `rotate(${currentDeg}deg)`,
            transformOrigin: '210px 210px',
            transition: 'transform 1.4s cubic-bezier(0.65, 0, 0.35, 1), stroke 0.6s ease',
          }}
        />

        {/* Center Technology Value Circle */}
        <circle
          cx="210"
          cy="210"
          r="72"
          className="fill-base-100"
          stroke="#0A63CE"
          strokeWidth="1.5"
        />

        {/* Center Text */}
        <text
          x="210"
          y="198"
          textAnchor="middle"
          className="fill-base-content"
          fontFamily="Montserrat, sans-serif"
          fontWeight="600"
          fontSize="15"
          letterSpacing="0.5"
        >
          TECHNOLOGY
        </text>
        <text
          x="210"
          y="217"
          textAnchor="middle"
          className="fill-base-content"
          fontFamily="Montserrat, sans-serif"
          fontWeight="600"
          fontSize="15"
          letterSpacing="0.5"
        >
          VALUE
        </text>
        <text
          x="210"
          y="238"
          textAnchor="middle"
          fill="#084EA3"
          className="dark:fill-[#60A5FA]"
          fontFamily="Montserrat, sans-serif"
          fontWeight="600"
          fontSize="10"
          letterSpacing="1"
        >
          {currentLabel}
        </text>

        {/* 8 Phase Nodes & Labels */}
        <g
          fontFamily="Montserrat, sans-serif"
          fontWeight="600"
          fontSize="12"
          letterSpacing="1"
          className="fill-base-content"
        >
          {/* Node 0: PLAN */}
          <g
            className="cursor-pointer"
            onClick={() => onSelectPhase && onSelectPhase(0)}
          >
            <circle
              cx="210"
              cy="40"
              r={activePhase === 0 ? 16 : 0}
              fill={nodeColors[0]}
              opacity={activePhase === 0 ? 0.35 : 0}
              style={{ transition: 'all 0.35s ease' }}
            />
            <circle
              cx="210"
              cy="40"
              r={activePhase === 0 ? 7 : 5}
              fill={nodeColors[0]}
              style={{ transition: 'all 0.3s ease' }}
            />
            <text x="210" y="16" textAnchor="middle">
              PLAN
            </text>
          </g>

          {/* Node 1: MEASURE */}
          <g
            className="cursor-pointer"
            onClick={() => onSelectPhase && onSelectPhase(1)}
          >
            <circle
              cx="330"
              cy="90"
              r={activePhase === 1 ? 16 : 0}
              fill={nodeColors[1]}
              opacity={activePhase === 1 ? 0.35 : 0}
              style={{ transition: 'all 0.35s ease' }}
            />
            <circle
              cx="330"
              cy="90"
              r={activePhase === 1 ? 7 : 5}
              fill={nodeColors[1]}
              style={{ transition: 'all 0.3s ease' }}
            />
            <text x="347" y="73" textAnchor="start">
              MEASURE
            </text>
          </g>

          {/* Node 2: ALLOCATE */}
          <g
            className="cursor-pointer"
            onClick={() => onSelectPhase && onSelectPhase(2)}
          >
            <circle
              cx="380"
              cy="210"
              r={activePhase === 2 ? 16 : 0}
              fill={nodeColors[2]}
              opacity={activePhase === 2 ? 0.35 : 0}
              style={{ transition: 'all 0.35s ease' }}
            />
            <circle
              cx="380"
              cy="210"
              r={activePhase === 2 ? 7 : 5}
              fill={nodeColors[2]}
              style={{ transition: 'all 0.3s ease' }}
            />
            <text x="404" y="215" textAnchor="start">
              ALLOCATE
            </text>
          </g>

          {/* Node 3: ANALYZE */}
          <g
            className="cursor-pointer"
            onClick={() => onSelectPhase && onSelectPhase(3)}
          >
            <circle
              cx="330"
              cy="330"
              r={activePhase === 3 ? 16 : 0}
              fill={nodeColors[3]}
              opacity={activePhase === 3 ? 0.35 : 0}
              style={{ transition: 'all 0.35s ease' }}
            />
            <circle
              cx="330"
              cy="330"
              r={activePhase === 3 ? 7 : 5}
              fill={nodeColors[3]}
              style={{ transition: 'all 0.3s ease' }}
            />
            <text x="347" y="352" textAnchor="start">
              ANALYZE
            </text>
          </g>

          {/* Node 4: OPTIMIZE */}
          <g
            className="cursor-pointer"
            onClick={() => onSelectPhase && onSelectPhase(4)}
          >
            <circle
              cx="210"
              cy="380"
              r={activePhase === 4 ? 16 : 0}
              fill={nodeColors[4]}
              opacity={activePhase === 4 ? 0.35 : 0}
              style={{ transition: 'all 0.35s ease' }}
            />
            <circle
              cx="210"
              cy="380"
              r={activePhase === 4 ? 7 : 5}
              fill={nodeColors[4]}
              style={{ transition: 'all 0.3s ease' }}
            />
            <text x="210" y="404" textAnchor="middle">
              OPTIMIZE
            </text>
          </g>

          {/* Node 5: FORECAST */}
          <g
            className="cursor-pointer"
            onClick={() => onSelectPhase && onSelectPhase(5)}
          >
            <circle
              cx="90"
              cy="330"
              r={activePhase === 5 ? 16 : 0}
              fill={nodeColors[5]}
              opacity={activePhase === 5 ? 0.35 : 0}
              style={{ transition: 'all 0.35s ease' }}
            />
            <circle
              cx="90"
              cy="330"
              r={activePhase === 5 ? 7 : 5}
              fill={nodeColors[5]}
              style={{ transition: 'all 0.3s ease' }}
            />
            <text x="73" y="352" textAnchor="end">
              FORECAST
            </text>
          </g>

          {/* Node 6: GOVERN */}
          <g
            className="cursor-pointer"
            onClick={() => onSelectPhase && onSelectPhase(6)}
          >
            <circle
              cx="40"
              cy="210"
              r={activePhase === 6 ? 16 : 0}
              fill={nodeColors[6]}
              opacity={activePhase === 6 ? 0.35 : 0}
              style={{ transition: 'all 0.35s ease' }}
            />
            <circle
              cx="40"
              cy="210"
              r={activePhase === 6 ? 7 : 5}
              fill={nodeColors[6]}
              style={{ transition: 'all 0.3s ease' }}
            />
            <text x="16" y="215" textAnchor="end">
              GOVERN
            </text>
          </g>

          {/* Node 7: CONTINUOUSLY IMPROVE */}
          <g
            className="cursor-pointer"
            onClick={() => onSelectPhase && onSelectPhase(7)}
          >
            <circle
              cx="90"
              cy="90"
              r={activePhase === 7 ? 16 : 0}
              fill={nodeColors[7]}
              opacity={activePhase === 7 ? 0.35 : 0}
              style={{ transition: 'all 0.35s ease' }}
            />
            <circle
              cx="90"
              cy="90"
              r={activePhase === 7 ? 7 : 5}
              fill={nodeColors[7]}
              style={{ transition: 'all 0.3s ease' }}
            />
            <text x="73" y="73" textAnchor="end">
              CONTINUOUSLY
            </text>
            <text x="73" y="88" textAnchor="end">
              IMPROVE
            </text>
          </g>
        </g>
      </svg>

      {/* Bottom Phase Tag / Status Bar */}
      <div className="text-center mt-4">
        <span className="inline-block text-[11px] tracking-[0.14em] uppercase text-base-content/60 border border-base-300 dark:border-white/15 px-3 py-1.5 rounded-[2px] bg-base-100/60 shadow-sm dark:shadow-none">
          CONTINUOUS FINOPS — NOW:{' '}
          <span style={{ color: activeColor, fontWeight: 700 }}>
            {currentLabel}
          </span>
        </span>
      </div>
    </div>
  );
};
