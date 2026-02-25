import { CharacterStats, DailyKPI } from './page';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from 'next-themes';

interface CharacterDisplayProps {
  characterStats: CharacterStats;
  isDarkMode?: boolean;
  kpiData: DailyKPI[];
}

interface TooltipPayloadItem {
  payload: { stat: string };
  value: number;
  name: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

// Custom tooltip for radar chart
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="backdrop-blur-xl rounded-[12px] shadow-xl border p-3 transition-colors duration-300 bg-white/95 border-[#d2d2d7]/50 dark:bg-[#2c2c2e]/95 dark:border-[#38383a]/50">
        <p className="text-[13px] font-medium transition-colors duration-300 text-[#1d1d1f] dark:text-white">
          {payload[0].payload.stat}: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const STAGE_NAMES = ['알', '유아기', '성장기', '성체', '완전체'];
const STAGE_EMOJIS = ['🥚', '🐣', '🐥', '🦅', '🦅‍🔥'];
const STAGE_DESCRIPTIONS = [
  '새로운 시작',
  '첫 걸음을 뗐어요',
  '꾸준히 성장 중이에요',
  '강력한 모습으로 진화했어요',
  '완전한 형태를 갖췄어요'
];

export function CharacterDisplay({ characterStats, kpiData }: CharacterDisplayProps) {
  const { level, exp, expToNextLevel, evolutionStage } = characterStats;
  const expPercentage = (exp / expToNextLevel) * 100;

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const last7Days = kpiData.slice(-7);
  const totalStudy = last7Days.reduce((sum, d) => sum + d.study, 0);
  const totalExercise = last7Days.reduce((sum, d) => sum + d.exercise, 0);
  const totalSpending = last7Days.reduce((sum, d) => sum + d.spending, 0);
  
  const avgStudy = last7Days.length > 0 ? totalStudy / last7Days.length : 0;
  const avgExercise = last7Days.length > 0 ? totalExercise / last7Days.length : 0;
  const avgSpending = last7Days.length > 0 ? totalSpending / last7Days.length : 0;

  // Normalize stats to 0-100 scale for radar chart
  const studyStat = Math.min((avgStudy / 8) * 100, 100); // Max 8 hours
  const exerciseStat = Math.min((avgExercise / 4) * 100, 100); // Max 4 hours
  const spendingControlStat = avgSpending > 0 ? Math.max(100 - (avgSpending / 100000) * 100, 0) : 100; // Better control = higher score
  const consistencyStat = Math.min((last7Days.length / 7) * 100, 100); // How many days recorded
  const levelProgressStat = (level / 50) * 100; // Level progress (max 50)
  const evolutionProgressStat = (evolutionStage / 4) * 100; // Evolution progress

  const radarData = [
    {
      stat: '공부',
      value: Math.round(studyStat),
      fullMark: 100,
    },
    {
      stat: '운동',
      value: Math.round(exerciseStat),
      fullMark: 100,
    },
    {
      stat: '절약',
      value: Math.round(spendingControlStat),
      fullMark: 100,
    },
    {
      stat: '꾸준함',
      value: Math.round(consistencyStat),
      fullMark: 100,
    },
    {
      stat: '레벨',
      value: Math.round(levelProgressStat),
      fullMark: 100,
    },
    {
      stat: '진화',
      value: Math.round(evolutionProgressStat),
      fullMark: 100,
    },
  ];

  return (
    <div className="backdrop-blur-xl rounded-[24px] shadow-xl border p-8 md:p-12 mb-8 transition-colors duration-300 bg-white/80 border-[#d2d2d7]/30 dark:bg-[#2c2c2e]/80 dark:border-[#38383a]/30">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Character Info */}
        <div className="flex flex-col items-center">
          {/* Character Visual */}
          <div className="relative mb-6">
            <div className={`w-48 h-48 rounded-[32px] flex items-center justify-center transition-all duration-500 ${
              evolutionStage === 0 ? 'bg-gradient-to-br from-gray-200 to-gray-300' :
              evolutionStage === 1 ? 'bg-gradient-to-br from-yellow-200 to-yellow-400' :
              evolutionStage === 2 ? 'bg-gradient-to-br from-orange-200 to-orange-400' :
              evolutionStage === 3 ? 'bg-gradient-to-br from-blue-300 to-blue-500' :
              'bg-gradient-to-br from-purple-400 to-pink-500'
            } shadow-2xl hover:scale-105 transition-transform duration-300`}>
              <div className="text-8xl animate-bounce" style={{ animationDuration: '2s' }}>
                {STAGE_EMOJIS[evolutionStage]}
              </div>
            </div>

            {/* Level Badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-[#007AFF] to-[#0051D5] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
              <div className="text-center">
                <div className="text-[11px] font-medium">Lv.</div>
                <div className="text-[20px] font-bold leading-none">{level}</div>
              </div>
            </div>
          </div>

          {/* Character Info */}
          <div className="w-full">
            <div className="mb-6 text-center">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-3 ${
                evolutionStage === 0 ? 'bg-gray-100 text-gray-700' :
                evolutionStage === 1 ? 'bg-yellow-100 text-yellow-700' :
                evolutionStage === 2 ? 'bg-orange-100 text-orange-700' :
                evolutionStage === 3 ? 'bg-blue-100 text-blue-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                <span className="text-[15px] font-semibold">
                  {STAGE_NAMES[evolutionStage]}
                </span>
              </div>

              <h2 className="text-[28px] md:text-[36px] font-bold mb-2 transition-colors duration-300 text-[#1d1d1f] dark:text-white">
                나의 캐릭터
              </h2>

              <p className="text-[17px] transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
                {STAGE_DESCRIPTIONS[evolutionStage]}
              </p>
            </div>

            {/* Experience Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[15px] font-medium transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
                  경험치
                </span>
                <span className="text-[15px] font-semibold transition-colors duration-300 text-[#1d1d1f] dark:text-white">
                  {exp} / {expToNextLevel}
                </span>
              </div>

              <div className="w-full h-4 rounded-full overflow-hidden transition-colors duration-300 bg-[#e5e5ea] dark:bg-[#3a3a3c]">
                <div
                  className="h-full bg-gradient-to-r from-[#007AFF] to-[#0051D5] transition-all duration-500 ease-out rounded-full shadow-lg"
                  style={{ width: `${expPercentage}%` }}
                />
              </div>
            </div>

            {/* Evolution Progress */}
            <div>
              <div className="text-[13px] font-medium mb-3 uppercase tracking-wide transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
                진화 단계
              </div>
              <div className="flex gap-2">
                {STAGE_NAMES.map((_, index) => (
                  <div
                    key={index}
                    className={`flex-1 h-2 rounded-full transition-all duration-500 ${
                      index <= evolutionStage
                        ? 'bg-gradient-to-r from-[#34C759] to-[#30D158] shadow-sm'
                        : 'bg-[#e5e5ea] dark:bg-[#3a3a3c]'
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {evolutionStage < 4 && (
                  <span className="text-[13px] transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
                    다음 진화: {[5, 15, 30, 50][evolutionStage]}레벨
                  </span>
                )}
                {evolutionStage === 4 && (
                  <span className="text-[13px] font-semibold text-[#34C759]">
                    🎉 최종 진화 완료!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Status Radar Chart */}
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-[21px] font-semibold mb-6 transition-colors duration-300 text-[#1d1d1f] dark:text-white">
            스테이터스
          </h3>

          <ResponsiveContainer width="100%" height={340}>
            <RadarChart data={radarData}>
              <PolarGrid
                stroke={isDark ? '#3a3a3c' : '#e5e5ea'}
                strokeWidth={1}
                strokeOpacity={0.3}
                gridType="circle"
              />
              <PolarAngleAxis
                dataKey="stat"
                tick={{
                  fill: isDark ? '#ffffff' : '#1d1d1f',
                  fontSize: 14,
                  fontWeight: 600
                }}
                stroke={isDark ? '#3a3a3c' : '#e5e5ea'}
                strokeOpacity={0.3}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{
                  fill: isDark ? '#98989d' : '#86868b',
                  fontSize: 11
                }}
                tickCount={3}
                stroke="transparent"
              />
              <Radar
                name="능력치"
                dataKey="value"
                stroke="#007AFF"
                fill="#007AFF"
                fillOpacity={0.6}
                strokeWidth={3}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>

          {/* Stats Legend */}
          <div className="grid grid-cols-2 gap-3 mt-6 w-full">
            {radarData.map((item, index) => (
              <div
                key={index}
                className="p-3 rounded-[12px] transition-colors duration-300 bg-[#f5f5f7] dark:bg-[#3a3a3c]"
              >
                <div className="text-[13px] mb-1 transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
                  {item.stat}
                </div>
                <div className="text-[20px] font-bold transition-colors duration-300 text-[#1d1d1f] dark:text-white">
                  <span className="text-[14px] font-normal opacity-50">/100</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
