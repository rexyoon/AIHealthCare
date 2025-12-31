import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface HealthRecord {
  id: number;
  bloodSugar: number;
  weight: number;
  note: string;
}

const HealthRecordList: React.FC = () => {
  const [records, setRecords] = useState<HealthRecord[]>([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const response = await axios.get('/api/health-records');
      setRecords(response.data);
    };
    fetchRecords();
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded">
      {records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <ul>
          {records.map(record => (
            <li key={record.id} className="border p-2 mb-2">
              {record.note} - {record.bloodSugar} - {record.weight}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HealthRecordList;
