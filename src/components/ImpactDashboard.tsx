import React from 'react';
import { TrendingUp, Globe, DollarSign, Beaker } from 'lucide-react';
import type { ImpactSummary } from '@/types';

interface ImpactDashboardProps {
  data: ImpactSummary;
}

export default function ImpactDashboard({ data }: ImpactDashboardProps) {
  const cards = [
    {
      title: 'Policy Developments',
      value: data.policy_developments,
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      hover: 'hover:bg-blue-100'
    },
    {
      title: 'International Updates',
      value: data.international_updates,
      icon: Globe,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      hover: 'hover:bg-orange-100'
    },
    {
      title: 'Economic Indicators',
      value: data.economic_indicators,
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-50',
      hover: 'hover:bg-green-100'
    },
    {
      title: 'Scientific Advances',
      value: data.scientific_advances,
      icon: Beaker,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      hover: 'hover:bg-purple-100'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Today's Impact</h2>
          <p className="text-lg text-gray-600">Key developments across major domains</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className={`${card.bg} ${card.hover} rounded-2xl p-6 transition-all duration-300 cursor-pointer group hover:shadow-xl hover:scale-105`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`h-8 w-8 ${card.color}`} />
                  <span className="text-3xl font-bold text-gray-900 group-hover:scale-110 transition-transform">
                    {card.value}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900">{card.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}