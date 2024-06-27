import React, { useState, useEffect, ReactNode } from 'react';

interface Registration {
  id: number;
  name: string;
  // Add other fields based on your data structure
}

interface Speaker {
  id: number;
  name: string;
  // Add other fields based on your data structure
}

interface DataFetcherProps {
  children: (data: { registrations: Registration[]; speakers: Speaker[] }) => ReactNode;
}

const DataFetcher: React.FC<DataFetcherProps> = ({ children }) => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  useEffect(() => {
    async function fetchRegistrations() {
      try {
        const generalRegistrations = await fetch('https://web3lagosbackend.onrender.com/api/general-registrations/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const speakerRegistrations = await fetch('https://web3lagosbackend.onrender.com/api/speaker-registrations/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const generalData: Registration[] = await generalRegistrations.json();
        const speakerData: Speaker[] = await speakerRegistrations.json();
        
        setRegistrations(generalData);  
        setSpeakers(speakerData);  
      } catch (error) {
        console.error('Error fetching registration data:', error);
      }
    }

    fetchRegistrations();
  }, []);

  return <>{children({ registrations, speakers })}</>;
};

export default DataFetcher;
