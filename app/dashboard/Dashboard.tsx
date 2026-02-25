import { BookOpen, Dumbbell, Wallet, Plus, BarChart3 } from 'lucide-react';
import { DailyKPI } from './page';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';

interface DashboardProps {
  kpiData: DailyKPI[];
  isDarkMode?: boolean;
  onAddClick: () => void;
}

interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="backdrop-blur-xl rounded-[12px] shadow-xl border p-3 transition-colors duration-300 bg-white/95 border-[#d2d2d7]/50 dark:bg-[#2c2c2e]/95 dark:border-[#38383a]/50">
        <p className="text-[13px] font-medium mb-2 transition-colors duration-300 text-[#1d1d1f] dark:text-white">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-[13px] transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
            <span style={{ color: entry.color }}>{entry.name}: </span>
            {entry.name === '소비' ? `${entry.value}만원` : `${entry.value}시간`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function Dashboard({ kpiData, onAddClick }: DashboardProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Get recent 7 days data
  const last7Days = kpiData.slice(-7);
  
  // Calculate totals and averages
  const totalStudy = last7Days.reduce((sum, d) => sum + d.study, 0);
  const totalExercise = last7Days.reduce((sum, d) => sum + d.exercise, 0);
  const totalSpending = last7Days.reduce((sum, d) => sum + d.spending, 0);
  
  const avgStudy = last7Days.length > 0 ? (totalStudy / last7Days.length).toFixed(1) : '0.0';
  const avgExercise = last7Days.length > 0 ? (totalExercise / last7Days.length).toFixed(1) : '0.0';
  const avgSpending = last7Days.length > 0 ? Math.round(totalSpending / last7Days.length) : 0;

  // Today's data
  const today = new Date().toISOString().split('T')[0];
  const todayData = kpiData.find(k => k.date === today);

  // Prepare chart data - last 14 days for better visualization
  const last14Days = kpiData.slice(-14);
  const chartData = last14Days.map(data => ({
    date: new Date(data.date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
    공부: data.study,
    운동: data.exercise,
    소비: Math.round(data.spending / 10000), // Convert to 만원 for better scale
  }));

  return (
    <div className="space-y-6">
      {/* Add Button */}
      <button
        onClick={onAddClick}
        className="w-full bg-gradient-to-br from-[#007AFF] to-[#0051D5] text-white py-5 px-8 rounded-[18px] text-[19px] font-medium transition-all hover:shadow-xl hover:shadow-blue-500/25 active:scale-[0.98] shadow-lg shadow-blue-500/20"
      >
        <div className="flex items-center justify-center gap-3">
          <Plus className="w-6 h-6" strokeWidth={2.5} />
          <span>오늘의 기록 {todayData ? '수정' : '추가'}하기</span>
        </div>
      </button>

      {/* Today's KPI */}
      {todayData && (
        <div className="backdrop-blur-xl rounded-[24px] shadow-xl border p-6 transition-colors duration-300 bg-white/80 border-[#d2d2d7]/30 dark:bg-[#2c2c2e]/80 dark:border-[#38383a]/30">
          <h3 className="text-[21px] font-semibold mb-4 transition-colors duration-300 text-[#1d1d1f] dark:text-white">
            오늘의 성과
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-[16px] transition-colors duration-300 bg-[#f5f5f7] dark:bg-[#3a3a3c]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#007AFF]/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[#007AFF]" strokeWidth={2.5} />
                </div>
                <span className="text-[15px] font-medium transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">공부</span>
              </div>
              <div className="text-[28px] font-bold transition-colors duration-300 text-[#1d1d1f] dark:text-white">
                {todayData.study}시간
              </div>
            </div>

            <div className="p-4 rounded-[16px] transition-colors duration-300 bg-[#f5f5f7] dark:bg-[#3a3a3c]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#34C759]/10 flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-[#34C759]" strokeWidth={2.5} />
                </div>
                <span className="text-[15px] font-medium transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">운동</span>
              </div>
              <div className="text-[28px] font-bold transition-colors duration-300 text-[#1d1d1f] dark:text-white">
                {todayData.exercise}시간
              </div>
            </div>

            <div className="p-4 rounded-[16px] transition-colors duration-300 bg-[#f5f5f7] dark:bg-[#3a3a3c]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#FF9500]/10 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-[#FF9500]" strokeWidth={2.5} />
                </div>
                <span className="text-[15px] font-medium transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">소비</span>
              </div>
              <div className="text-[28px] font-bold transition-colors duration-300 text-[#1d1d1f] dark:text-white">
                {todayData.spending.toLocaleString()}원
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Charts Section */}
      {chartData.length >= 3 && (
        <div className="backdrop-blur-xl rounded-[24px] shadow-xl border p-6 transition-colors duration-300 bg-white/80 border-[#d2d2d7]/30 dark:bg-[#2c2c2e]/80 dark:border-[#38383a]/30">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-6 h-6 text-[#007AFF]" strokeWidth={2.5} />
            <h3 className="text-[21px] font-semibold transition-colors duration-300 text-[#1d1d1f] dark:text-white">
              활동 추이
            </h3>
          </div>

          {/* Line Chart - Study & Exercise */}
          <div className="mb-8">
            <h4 className="text-[15px] font-medium mb-4 transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
              공부 &amp; 운동 시간
            </h4>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="5 5"
                  stroke={isDark ? '#3a3a3c' : '#e5e5ea'}
                  strokeOpacity={0.3}
                  vertical={false}
                  horizontalPoints={[0, 60, 120, 180, 240]}
                />
                <XAxis
                  dataKey="date"
                  stroke={isDark ? '#98989d' : '#86868b'}
                  style={{ fontSize: '13px' }}
                  tickLine={false}
                  axisLine={{ stroke: isDark ? '#3a3a3c' : '#e5e5ea', strokeWidth: 1 }}
                />
                <YAxis
                  stroke={isDark ? '#98989d' : '#86868b'}
                  style={{ fontSize: '13px' }}
                  tickLine={false}
                  axisLine={false}
                  tickCount={5}
                  label={{
                    value: '시간',
                    angle: -90,
                    position: 'insideLeft',
                    style: {
                      fontSize: '13px',
                      fill: isDark ? '#98989d' : '#86868b'
                    }
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{
                    fontSize: '14px',
                    paddingTop: '16px'
                  }}
                  iconType="circle"
                />
                <Line
                  type="monotone"
                  dataKey="공부"
                  stroke="#007AFF"
                  strokeWidth={3}
                  dot={{ fill: '#007AFF', r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <Line
                  type="monotone"
                  dataKey="운동"
                  stroke="#34C759"
                  strokeWidth={3}
                  dot={{ fill: '#34C759', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart - Spending */}
          <div>
            <h4 className="text-[15px] font-medium mb-4 transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
              소비 금액 (만원)
            </h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="5 5"
                  stroke={isDark ? '#3a3a3c' : '#e5e5ea'}
                  strokeOpacity={0.3}
                  vertical={false}
                  horizontalPoints={[0, 50, 100, 150, 200]}
                />
                <XAxis
                  dataKey="date"
                  stroke={isDark ? '#98989d' : '#86868b'}
                  style={{ fontSize: '13px' }}
                  tickLine={false}
                  axisLine={{ stroke: isDark ? '#3a3a3c' : '#e5e5ea', strokeWidth: 1 }}
                />
                <YAxis
                  stroke={isDark ? '#98989d' : '#86868b'}
                  style={{ fontSize: '13px' }}
                  tickLine={false}
                  axisLine={false}
                  tickCount={5}
                  label={{
                    value: '만원',
                    angle: -90,
                    position: 'insideLeft',
                    style: {
                      fontSize: '13px',
                      fill: isDark ? '#98989d' : '#86868b'
                    }
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{
                    fontSize: '14px',
                    paddingTop: '16px'
                  }}
                  iconType="circle"
                />
                <Bar
                  dataKey="소비"
                  fill="#FF9500"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Weekly Summary */}
      <div className="backdrop-blur-xl rounded-[24px] shadow-xl border p-6 transition-colors duration-300 bg-white/80 border-[#d2d2d7]/30 dark:bg-[#2c2c2e]/80 dark:border-[#38383a]/30">
        <h3 className="text-[21px] font-semibold mb-6 transition-colors duration-300 text-[#1d1d1f] dark:text-white">
          최근 7일 평균
        </h3>

        <div className="space-y-6">
          {/* Study */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-[#007AFF]" strokeWidth={2.5} />
                <span className="text-[17px] font-medium transition-colors duration-300 text-[#1d1d1f] dark:text-white">공부</span>
              </div>
              <span className="text-[17px] font-semibold transition-colors duration-300 text-[#1d1d1f] dark:text-white">
                평균 {avgStudy}시간
              </span>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden transition-colors duration-300 bg-[#e5e5ea] dark:bg-[#3a3a3c]">
              <div
                className="h-full bg-gradient-to-r from-[#007AFF] to-[#0051D5] rounded-full transition-all duration-500"
                style={{ width: `${Math.min((parseFloat(avgStudy) / 8) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Exercise */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Dumbbell className="w-5 h-5 text-[#34C759]" strokeWidth={2.5} />
                <span className="text-[17px] font-medium transition-colors duration-300 text-[#1d1d1f] dark:text-white">운동</span>
              </div>
              <span className="text-[17px] font-semibold transition-colors duration-300 text-[#1d1d1f] dark:text-white">
                평균 {avgExercise}시간
              </span>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden transition-colors duration-300 bg-[#e5e5ea] dark:bg-[#3a3a3c]">
              <div
                className="h-full bg-gradient-to-r from-[#34C759] to-[#30D158] rounded-full transition-all duration-500"
                style={{ width: `${Math.min((parseFloat(avgExercise) / 4) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Spending */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Wallet className="w-5 h-5 text-[#FF9500]" strokeWidth={2.5} />
                <span className="text-[17px] font-medium transition-colors duration-300 text-[#1d1d1f] dark:text-white">소비</span>
              </div>
              <span className="text-[17px] font-semibold transition-colors duration-300 text-[#1d1d1f] dark:text-white">
                평균 {avgSpending.toLocaleString()}원
              </span>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden transition-colors duration-300 bg-[#e5e5ea] dark:bg-[#3a3a3c]">
              <div
                className="h-full bg-gradient-to-r from-[#FF9500] to-[#FF6B00] rounded-full transition-all duration-500"
                style={{ width: `${Math.min((avgSpending / 100000) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* History */}
      {last7Days.length > 0 && (
        <div className="backdrop-blur-xl rounded-[24px] shadow-xl border p-6 transition-colors duration-300 bg-white/80 border-[#d2d2d7]/30 dark:bg-[#2c2c2e]/80 dark:border-[#38383a]/30">
          <h3 className="text-[21px] font-semibold mb-4 transition-colors duration-300 text-[#1d1d1f] dark:text-white">
            최근 기록
          </h3>

          <div className="space-y-3">
            {[...last7Days].reverse().map((data, index) => (
              <div
                key={data.date}
                className="p-4 rounded-[16px] transition-colors duration-300 bg-[#f5f5f7] dark:bg-[#3a3a3c]"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[15px] font-medium transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
                    {new Date(data.date).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })}
                  </span>
                  {index === 0 && (
                    <span className="text-[13px] font-semibold text-[#007AFF] bg-[#007AFF]/10 px-3 py-1 rounded-full">
                      최근
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-[11px] mb-1 transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">공부</div>
                    <div className="text-[17px] font-semibold transition-colors duration-300 text-[#1d1d1f] dark:text-white">{data.study}h</div>
                  </div>
                  <div>
                    <div className="text-[11px] mb-1 transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">운동</div>
                    <div className="text-[17px] font-semibold transition-colors duration-300 text-[#1d1d1f] dark:text-white">{data.exercise}h</div>
                  </div>
                  <div>
                    <div className="text-[11px] mb-1 transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">소비</div>
                    <div className="text-[17px] font-semibold transition-colors duration-300 text-[#1d1d1f] dark:text-white">{(data.spending / 1000).toFixed(0)}k</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {kpiData.length === 0 && (
        <div className="backdrop-blur-xl rounded-[24px] shadow-xl border p-12 text-center transition-colors duration-300 bg-white/80 border-[#d2d2d7]/30 dark:bg-[#2c2c2e]/80 dark:border-[#38383a]/30">
          <div className="w-20 h-20 mx-auto mb-6 rounded-[20px] bg-gradient-to-br from-[#f5f5f7] to-[#e8e8ed] dark:from-[#2c2c2e] dark:to-[#3a3a3c] flex items-center justify-center">
            <BookOpen className="w-10 h-10 transition-colors duration-300 text-[#86868b] dark:text-[#98989d]" strokeWidth={2} />
          </div>
          <p className="text-[21px] font-medium mb-2 transition-colors duration-300 text-[#1d1d1f] dark:text-white">
            첫 기록을 시작하세요
          </p>
          <p className="text-[17px] transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
            매일의 성장을 기록하고 캐릭터를 키워보세요
          </p>
        </div>
      )}
    </div>
  );
}
