import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CropData {
  id: string;
  name: string;
  variety: string;
  farmingArea: number; // in acres
  waterUsage: number; // in liters/day
  yieldIncrease: number; // percentage
  plantingDate: string;
  expectedHarvest: string;
  status: 'planted' | 'growing' | 'harvesting' | 'harvested';
  healthScore: number; // 0-100
}

export interface FarmStats {
  totalCrops: number;
  totalFarmArea: number;
  totalWaterUsage: number;
  avgYieldIncrease: number;
}

interface FarmDataContextType {
  crops: CropData[];
  farmStats: FarmStats;
  addCrop: (crop: Omit<CropData, 'id'>) => void;
  updateCrop: (id: string, crop: Partial<CropData>) => void;
  deleteCrop: (id: string) => void;
  getFarmStats: () => FarmStats;
}

const FarmDataContext = createContext<FarmDataContextType | undefined>(undefined);

export const useFarmData = () => {
  const context = useContext(FarmDataContext);
  if (!context) {
    throw new Error('useFarmData must be used within a FarmDataProvider');
  }
  return context;
};

interface FarmDataProviderProps {
  children: React.ReactNode;
}

export const FarmDataProvider: React.FC<FarmDataProviderProps> = ({ children }) => {
  const [crops, setCrops] = useState<CropData[]>(() => {
    // Load from localStorage on initialization
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('krishimitra-farm-data');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (error) {
          console.warn('Failed to parse saved farm data');
        }
      }
    }
    
    // Default demo data
    return [
      {
        id: '1',
        name: 'Wheat',
        variety: 'HD-2967',
        farmingArea: 5.2,
        waterUsage: 450,
        yieldIncrease: 18,
        plantingDate: '2024-11-15',
        expectedHarvest: '2025-04-20',
        status: 'growing',
        healthScore: 85
      },
      {
        id: '2',
        name: 'Rice',
        variety: 'Basmati 1121',
        farmingArea: 3.8,
        waterUsage: 680,
        yieldIncrease: 22,
        plantingDate: '2024-07-10',
        expectedHarvest: '2024-11-25',
        status: 'harvested',
        healthScore: 92
      },
      {
        id: '3',
        name: 'Corn',
        variety: 'NK 6240',
        farmingArea: 4.5,
        waterUsage: 520,
        yieldIncrease: 15,
        plantingDate: '2024-06-20',
        expectedHarvest: '2024-10-15',
        status: 'harvested',
        healthScore: 78
      }
    ];
  });

  // Save to localStorage whenever crops change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('krishimitra-farm-data', JSON.stringify(crops));
    }
  }, [crops]);

  const addCrop = (newCrop: Omit<CropData, 'id'>) => {
    const crop: CropData = {
      ...newCrop,
      id: Date.now().toString()
    };
    setCrops(prev => [...prev, crop]);
  };

  const updateCrop = (id: string, updatedData: Partial<CropData>) => {
    setCrops(prev => prev.map(crop => 
      crop.id === id ? { ...crop, ...updatedData } : crop
    ));
  };

  const deleteCrop = (id: string) => {
    setCrops(prev => prev.filter(crop => crop.id !== id));
  };

  const getFarmStats = (): FarmStats => {
    if (crops.length === 0) {
      return {
        totalCrops: 0,
        totalFarmArea: 0,
        totalWaterUsage: 0,
        avgYieldIncrease: 0
      };
    }

    const totalFarmArea = crops.reduce((sum, crop) => sum + crop.farmingArea, 0);
    const totalWaterUsage = crops.reduce((sum, crop) => sum + crop.waterUsage, 0);
    const avgYieldIncrease = crops.reduce((sum, crop) => sum + crop.yieldIncrease, 0) / crops.length;

    return {
      totalCrops: crops.length,
      totalFarmArea: Math.round(totalFarmArea * 10) / 10,
      totalWaterUsage,
      avgYieldIncrease: Math.round(avgYieldIncrease * 10) / 10
    };
  };

  const farmStats = getFarmStats();

  const value: FarmDataContextType = {
    crops,
    farmStats,
    addCrop,
    updateCrop,
    deleteCrop,
    getFarmStats
  };

  return (
    <FarmDataContext.Provider value={value}>
      {children}
    </FarmDataContext.Provider>
  );
};