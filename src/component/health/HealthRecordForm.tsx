import React, { useState } from 'react';
import axios from 'axios';

const HealthRecordForm: React.FC = () => {
  const [bloodSugar, setBloodSugar] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [note, setNote] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newRecord = { bloodSugar, weight, note };
    await axios.post('/api/health-records', newRecord);
    // 성공 메시지 또는 리프레시 로직 추가
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input 
        type="number" 
        placeholder="Blood Sugar" 
        value={bloodSugar} 
        onChange={(e) => setBloodSugar(Number(e.target.value))} 
        className="border p-2 mr-2"
        required
      />
      <input 
        type="number" 
        placeholder="Weight" 
        value={weight} 
        onChange={(e) => setWeight(Number(e.target.value))} 
        className="border p-2 mr-2"
        required
      />
      <input 
        type="text" 
        placeholder="Note" 
        value={note} 
        onChange={(e) => setNote(e.target.value)} 
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">Add Record</button>
    </form>
  );
};

export default HealthRecordForm;
