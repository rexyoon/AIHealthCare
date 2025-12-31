import React from 'react';
import { motion } from 'framer-motion';
import HealthRecordForm from '../component/health/HealthRecordForm';
import HealthRecordList from '../component/health/HealthRecordList';

const Home: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">AI Fitness Coach</h1>
      <motion.div 
        className="bg-gray-800 p-6 rounded-lg mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl">오늘 상태</h2>
        <p className="text-xl">Ready</p>
        <button className="bg-green-500 text-white p-2 rounded mt-4">체크인 시작</button>
      </motion.div>
      <h2 className="text-2xl mb-2">최근 추천</h2>
      <HealthRecordList />
      <HealthRecordForm />
    </div>
  );
};

export default Home;
