import React, { useState } from 'react';
import { DollarSign, TrendingUp, Calendar, Download, ArrowLeft } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface EarningsScreenProps {
  onBack: () => void;
}

type Period = 'daily' | 'weekly' | 'monthly' | 'yearly';

export function EarningsScreen({ onBack }: EarningsScreenProps) {
  const [period, setPeriod] = useState<Period>('daily');
  
  const earningsData = {
    daily: {
      total: 245.50,
      trips: 12,
      tips: 28.50,
      chart: [
        { time: '8AM', earnings: 45 },
        { time: '10AM', earnings: 32 },
        { time: '12PM', earnings: 58 },
        { time: '2PM', earnings: 41 },
        { time: '4PM', earnings: 35 },
        { time: '6PM', earnings: 34.50 }
      ]
    },
    weekly: {
      total: 1456.80,
      trips: 68,
      tips: 182.40,
      chart: [
        { time: 'Mon', earnings: 198 },
        { time: 'Tue', earnings: 234 },
        { time: 'Wed', earnings: 189 },
        { time: 'Thu', earnings: 245 },
        { time: 'Fri', earnings: 312 },
        { time: 'Sat', earnings: 156 },
        { time: 'Sun', earnings: 122.80 }
      ]
    },
    monthly: {
      total: 6234.20,
      trips: 287,
      tips: 824.60,
      chart: [
        { time: 'Week 1', earnings: 1456 },
        { time: 'Week 2', earnings: 1623 },
        { time: 'Week 3', earnings: 1589 },
        { time: 'Week 4', earnings: 1566.20 }
      ]
    },
    yearly: {
      total: 74810.40,
      trips: 3442,
      tips: 9895.20,
      chart: [
        { time: 'Jan', earnings: 5234 },
        { time: 'Feb', earnings: 5823 },
        { time: 'Mar', earnings: 6456 },
        { time: 'Apr', earnings: 6234 },
        { time: 'May', earnings: 6789 },
        { time: 'Jun', earnings: 7012 },
        { time: 'Jul', earnings: 6890 },
        { time: 'Aug', earnings: 6234 },
        { time: 'Sep', earnings: 5987 },
        { time: 'Oct', earnings: 6234 },
        { time: 'Nov', earnings: 6002 },
        { time: 'Dec', earnings: 5915.40 }
      ]
    }
  };
  
  const data = earningsData[period];
  
  return (
    <div className="min-h-full bg-black p-6 safe-area flex flex-col items-center">
      <div className="w-full max-w-md pt-4 pb-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={onBack}
            className="p-3 glass-card rounded-xl text-[#D4AF37] min-w-[48px] min-h-[48px] flex items-center justify-center"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl text-[#D4AF37]">Earnings</h1>
          </div>
          <button className="p-3 glass-card rounded-xl text-[#D4AF37] min-w-[48px] min-h-[48px] flex items-center justify-center">
            <Download size={24} />
          </button>
        </div>
        
        {/* Period Selector */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scroll-smooth w-full">
          {(['daily', 'weekly', 'monthly', 'yearly'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all min-h-[48px] flex-shrink-0 ${
                period === p
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4E5A1] text-black'
                  : 'glass-card text-gray-400'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Total Earnings */}
        <GlassCard variant="strong" className="mb-6 border-[#D4AF37]">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">Total Earnings</p>
            <h2 className="text-5xl text-[#D4AF37] mb-4">${data.total.toFixed(2)}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-3 rounded-xl min-h-[70px] flex flex-col justify-center">
                <p className="text-sm text-gray-400">Trips</p>
                <p className="text-2xl">{data.trips}</p>
              </div>
              <div className="glass-card p-3 rounded-xl min-h-[70px] flex flex-col justify-center">
                <p className="text-sm text-gray-400">Tips</p>
                <p className="text-2xl text-green-400">${data.tips.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </GlassCard>
        
        {/* Chart */}
        <GlassCard className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-[#D4AF37]">Earnings Trend</h3>
            <TrendingUp size={20} className="text-green-500" />
          </div>
          
          <div className="h-64 -mx-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.chart}>
                <XAxis 
                  dataKey="time" 
                  stroke="#666"
                  tick={{ fill: '#999', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#666"
                  tick={{ fill: '#999', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    border: '1px solid #D4AF37',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Earnings']}
                />
                <Bar 
                  dataKey="earnings" 
                  fill="#D4AF37"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
        
        {/* Tip Summary */}
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-[#D4AF37]">Tip Summary</h3>
            <DollarSign size={20} className="text-[#D4AF37]" />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-[#D4AF37]/20">
              <span className="text-gray-400">Total Tips</span>
              <span className="text-lg text-green-400">${data.tips.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[#D4AF37]/20">
              <span className="text-gray-400">Avg Tip per Trip</span>
              <span className="text-lg">${(data.tips / data.trips).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-400">Tips as % of Earnings</span>
              <span className="text-lg text-[#D4AF37]">
                {((data.tips / data.total) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
} 