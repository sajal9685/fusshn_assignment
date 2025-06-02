import React from 'react';
import Trendy from '../components/trendy'; 
import Artist from '../components/artist';
import Banners from '../components/banner';

export default function AvailableConcert() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ECEFCA] to-[#94B4C1] py-2 px-4 sm:px-6 lg:px-12">
      <div className="mb-8">
        <Banners />
      </div>

      <section className="mb-0">
        <Artist />
      </section>

      <section>
        <Trendy />
      </section>
    </div>
  );
}
