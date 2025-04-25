import React, { useState } from 'react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const MeasurementConverter = () => {
  const [yPoints, setYPoints] = useState([{ input1: '', input2: '' }]);
  const [xPoints, setXPoints] = useState([{ input1: '', input2: '' }]);
  const [calculatedPoints, setCalculatedPoints] = useState([]);

  // Add Y Point
  const addYPoint = () => {
    setYPoints([...yPoints, { input1: '', input2: '' }]);
  };

  // Add X Point
  const addXPoint = () => {
    setXPoints([...xPoints, { input1: '', input2: '' }]);
  };

  // Update Y Point
  const updateYPoint = (index, field, value) => {
    const newYPoints = [...yPoints];
    newYPoints[index][field] = value;
    setYPoints(newYPoints);
  };

  // Update X Point
  const updateXPoint = (index, field, value) => {
    const newXPoints = [...xPoints];
    newXPoints[index][field] = value;
    setXPoints(newXPoints);
  };

  // Calculate Points
  const handlePointCalculation = () => {
    const points = [];
    const maxPoints = Math.max(xPoints.length, yPoints.length);

    for (let i = 0; i < maxPoints; i++) {
      const x = calculatePoint(
        xPoints[i]?.input1 || '0', 
        xPoints[i]?.input2 || '0'
      );
      const y = calculatePoint(
        yPoints[i]?.input1 || '0', 
        yPoints[i]?.input2 || '0'
      );

      points.push({ x, y });
    }

    setCalculatedPoints(points);
  };

  // Point Calculation Utility
  const calculatePoint = (input1, input2) => {
    const num1 = input1 ? parseFloat(input1) : 0;
    const num2 = input2 ? parseFloat(input2) : 0;
    
    return Math.abs(num1 - num2) / 2 + Math.min(num1, num2);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Measurement Converter
      </h1>

      {/* Y-Axis Inputs */}
      <div className="mb-4">
        <h2 className="text-xl mb-2">Y-Axis Measurements</h2>
        {yPoints.map((point, index) => (
          <div key={index} className="flex mb-2 space-x-2">
            <input 
              type="number" 
              value={point.input1}
              onChange={(e) => updateYPoint(index, 'input1', e.target.value)}
              placeholder={`Y${index+1} Input 1`}
              className="border p-2 w-full"
            />
            <input 
              type="number" 
              value={point.input2}
              onChange={(e) => updateYPoint(index, 'input2', e.target.value)}
              placeholder={`Y${index+1} Input 2`}
              className="border p-2 w-full"
            />
          </div>
        ))}
        <button 
          onClick={addYPoint}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Y Point
        </button>
      </div>

      {/* X-Axis Inputs */}
      <div className="mb-4">
        <h2 className="text-xl mb-2">X-Axis Measurements</h2>
        {xPoints.map((point, index) => (
          <div key={index} className="flex mb-2 space-x-2">
            <input 
              type="number" 
              value={point.input1}
              onChange={(e) => updateXPoint(index, 'input1', e.target.value)}
              placeholder={`X${index+1} Input 1`}
              className="border p-2 w-full"
            />
            <input 
              type="number" 
              value={point.input2}
              onChange={(e) => updateXPoint(index, 'input2', e.target.value)}
              placeholder={`X${index+1} Input 2`}
              className="border p-2 w-full"
            />
          </div>
        ))}
        <button 
          onClick={addXPoint}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add X Point
        </button>
      </div>

      {/* Calculate Button */}
      <div className="text-center mb-4">
        <button 
          onClick={handlePointCalculation}
          className="bg-green-500 text-white p-2 rounded"
          id= "calculate"
        >
          Calculate Points
        </button>
      </div>

      {/* Chart */}
      {calculatedPoints.length > 0 && (
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="X" />
              <YAxis type="number" dataKey="y" name="Y" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Points" data={calculatedPoints} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default MeasurementConverter;

