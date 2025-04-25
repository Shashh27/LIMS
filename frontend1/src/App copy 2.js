import React, { useState, useEffect } from 'react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine 
} from 'recharts';
// import { ZoomIn, ZoomOut } from 'lucide-react';
import './MeasurementConverter.css';
import deselectImage from './images/deselect.png';
import angleImage from './images/angle.png';
import returnImage from './images/return.png';
import showpointsImage from './images/showpoints.png';
import zoominImage from './images/zoomin.png';
import zoomoutImage from './images/zoomout.png';
import distanceImage from './images/distance.png';



// Main component for managing page state
const MeasurementConverter = () => {
  const [currentPage, setCurrentPage] = useState('input');
  const [measurementRows, setMeasurementRows] = useState([
    { y1: '', y2: '', x1: '', x2: '' }
  ]);
  const [calculatedPoints, setCalculatedPoints] = useState([]);
  const [diameterErrors, setDiameterErrors] = useState([]);

  useEffect(() => {
    // Load stored data when component mounts
    const storedData = sessionStorage.getItem('measurementData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setMeasurementRows(parsedData);
    }
  }, []);

  // Calculate point coordinates
  const calculatePoint = (input1, input2) => {
    // Handle empty or invalid inputs
    const num1 = input1 ? parseFloat(input1) : 0;
    const num2 = input2 ? parseFloat(input2) : 0;
    
    return Math.abs(num1 - num2) / 2 + 
           Math.min(num1, num2);
  };

  // Calculate radius from inputs
  const calculateRadius = (input1, input2) => {
    // Handle empty or invalid inputs
    const num1 = input1 ? parseFloat(input1) : 0;
    const num2 = input2 ? parseFloat(input2) : 0;
    
    return Math.abs(num1 - num2) / 2;
  };

  // Calculate points and radii from measurement data
  const calculatePoints = (rows) => {
    const points = [];

    // Calculate points and radii from each row
    rows.forEach((row) => {
      const x = calculatePoint(row.x1, row.x2);
      const y = calculatePoint(row.y1, row.y2);
      const radius = calculateRadius(row.y1, row.y2); // Using Y values for radius
      points.push({ x, y, radius });
    });

    return points;
  };

  // Check if distances are equal (x1-x2 should equal y1-y2)
  const validateDiameters = (rows) => {
    const errors = [];
    
    rows.forEach((row, index) => {
      const y1 = parseFloat(row.y1);
      const y2 = parseFloat(row.y2);
      const x1 = parseFloat(row.x1);
      const x2 = parseFloat(row.x2);
      
      // Check if all values are valid numbers
      if (!isNaN(y1) && !isNaN(y2) && !isNaN(x1) && !isNaN(x2)) {
        const yDistance = Math.abs(y1 - y2);
        const xDistance = Math.abs(x1 - x2);
        
        // Check if distances are different (with small tolerance for floating point)
        if (Math.abs(yDistance - xDistance) > 0.001) {
          errors.push({
            row: index + 1,
            yDistance: yDistance.toFixed(2),
            xDistance: xDistance.toFixed(2)
          });
        }
      }
    });
    
    return errors;
  };

  // Function to handle navigation to results page
  const navigateToResults = (data) => {
    // Validate distances
    const errors = validateDiameters(data);
    
    if (errors.length > 0) {
      setDiameterErrors(errors);
      return; // We won't proceed, but we'll show errors in the input form
    }
    
    // Store data in sessionStorage
    sessionStorage.setItem('measurementData', JSON.stringify(data));
    // Calculate points
    const points = calculatePoints(data);
    setCalculatedPoints(points);
    // Show results page
    setCurrentPage('results');
  };

  // Function to navigate to calculated points page
  const navigateToCalculatedPoints = () => {
    setCurrentPage('calculatedPoints');
  };

  // Function to navigate back to input form
  const navigateToInput = () => {
    setCurrentPage('input');
  };

  // Function to navigate to results even with errors
  const proceedToResults = () => {
    setDiameterErrors([]); // Clear errors
    
    // Store data in sessionStorage
    sessionStorage.setItem('measurementData', JSON.stringify(measurementRows));
    // Calculate points
    const points = calculatePoints(measurementRows);
    setCalculatedPoints(points);
    // Show results page
    setCurrentPage('results');
  };

  // Function to navigate back to results
  const navigateToResultsFromPoints = () => {
    setCurrentPage('results');
  };

  return (
    <>
      {currentPage === 'input' && (
        <MeasurementInputForm 
          measurementRows={measurementRows}
          setMeasurementRows={setMeasurementRows}
          navigateToResults={navigateToResults}
          diameterErrors={diameterErrors}
          setDiameterErrors={setDiameterErrors}
          proceedToResults={proceedToResults}
        />
      )}
      
      {currentPage === 'results' && (
        <MeasurementResults 
          measurementData={measurementRows}
          calculatedPoints={calculatedPoints}
          navigateBack={navigateToInput}
          navigateToCalculatedPoints={navigateToCalculatedPoints}
        />
      )}

      {currentPage === 'calculatedPoints' && (
        <CalculatedPointsPage
          calculatedPoints={calculatedPoints}
          navigateBack={navigateToResultsFromPoints}
          measurementData={measurementRows}
        />
      )}
    </>
  );
};

// Export the MeasurementConverter as the default export
export default MeasurementConverter;

// Component for the input form page with inline warning
const MeasurementInputForm = ({ 
  measurementRows, 
  setMeasurementRows, 
  navigateToResults, 
  diameterErrors, 
  setDiameterErrors,
  proceedToResults
}) => {
  // Add a new row to the measurement table
  const addRow = () => {
    setMeasurementRows([...measurementRows, { y1: '', y2: '', x1: '', x2: '' }]);
  };

  // Delete a row from the measurement table
  const deleteRow = (index) => {
    if (measurementRows.length > 1) {
      const newRows = [...measurementRows];
      newRows.splice(index, 1);
      setMeasurementRows(newRows);
    } else {
      alert("Cannot delete the only row.");
    }
  };

  // Update measurement row inputs
  const updateRowInput = (index, field, value) => {
    const newRows = [...measurementRows];
    newRows[index][field] = value;
    setMeasurementRows(newRows);
    
    // Clear errors when inputs change
    if (diameterErrors.length > 0) {
      setDiameterErrors([]);
    }
  };

  // Handle form submission
  const handleCalculatePoints = (e) => {
    e.preventDefault();
    navigateToResults(measurementRows);
  };

  // Reset all input fields
  const handleReset = () => {
    // Reset to a single empty row
    setMeasurementRows([{ y1: '', y2: '', x1: '', x2: '' }]);
    // Clear session storage
    sessionStorage.removeItem('measurementData');
    // Clear any errors
    setDiameterErrors([]);
  };

  return (
    <div className="measurement-converter-container">
      <div className="measurement-converter-wrapper">
        <h1 className="main-title">1D to 2D MEASUREMENT</h1>
        
        {/* Measurements Table */}
        <div className="measurement-section">
          <h2 className="section-title">Measurement Inputs</h2>
          
          {/* Warning Banner - shows directly above the table when there are errors */}
          {diameterErrors.length > 0 && (
            <div className="table-warning-banner">
              <div className="warning-header">
                <h3>Distance Mismatch Warning</h3>
                <button onClick={() => setDiameterErrors([])} className="close-warning-button">×</button>
              </div>
              <div className="warning-content">
                <p>The diameter in X coordinates and Y coordinates must be equal. Issues found in:</p>
                <ul>
                  {diameterErrors.map((error, index) => (
                    <li key={index}>
                      Row {error.row}: Y diameter = {error.yDistance}, X diameter = {error.xDistance}
                    </li>
                  ))}
                </ul>
                <p>Please adjust your coordinate values to ensure equal diameter for accurate measurements.</p>
              </div>
              {/* <div className="warning-buttons">
                <button onClick={() => setDiameterErrors([])} className="warning-button cancel">
                  Back to Edit
                </button>
                <button onClick={proceedToResults} className="warning-button proceed">
                  Proceed Anyway
                </button>
              </div> */}
            </div>
          )}
          
          <div className="table-container">
            <table className="measurement-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Y1</th>
                  <th>Y2</th>
                  <th>X1</th>
                  <th>X2</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {measurementRows.map((row, index) => {
                  // Check if this row has an error
                  const hasError = diameterErrors.some(error => error.row === index + 1);
                  
                  return (
                    <tr key={index} className={hasError ? 'row-with-error' : ''}>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          type="number"
                          value={row.y1}
                          onChange={(e) => updateRowInput(index, 'y1', e.target.value)}
                          placeholder="Y1"
                          className={`table-input ${hasError ? 'input-error' : ''}`}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={row.y2}
                          onChange={(e) => updateRowInput(index, 'y2', e.target.value)}
                          placeholder="Y2"
                          className={`table-input ${hasError ? 'input-error' : ''}`}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={row.x1}
                          onChange={(e) => updateRowInput(index, 'x1', e.target.value)}
                          placeholder="X1"
                          className={`table-input ${hasError ? 'input-error' : ''}`}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={row.x2}
                          onChange={(e) => updateRowInput(index, 'x2', e.target.value)}
                          placeholder="X2"
                          className={`table-input ${hasError ? 'input-error' : ''}`}
                        />
                      </td>
                      <td>
                        <button 
                          onClick={() => deleteRow(index)}
                          className="delete-row-button"
                          title="Delete Row"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Buttons Container */}
          <div className="button-container">
            <button 
              onClick={addRow}
              className="add-row-button"
            >
              Add Row
            </button>
            
            <button 
              onClick={handleCalculatePoints}
              className="calculate-button"
            >
              Calculate Points
            </button>
            
            <button 
              onClick={handleReset}
              className="reset-button"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for displaying calculated points on a separate page
const CalculatedPointsPage = ({ calculatedPoints, navigateBack, measurementData }) => {
  return (
    <div className="measurement-converter-container">
      <div className="measurement-converter-wrapper">
        <h1 className="main-title">Calculated Points</h1>
        
        <div className="calculated-points-container">
          <div className="points-table-container">
            <table className="points-table">
              <thead>
                <tr>
                  <th>Point No.</th>
                  <th>X Coordinate</th>
                  <th>Y Coordinate</th>
                  <th>Radius</th>
                </tr>
              </thead>
              <tbody>
                {calculatedPoints.map((point, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{point.x.toFixed(2)}</td>
                    <td>{point.y.toFixed(2)}</td>
                    <td>{point.radius.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="button-container">
            <button 
              onClick={navigateBack}
              className="back-button"
            >
              Back to Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for the results page with angle arc visualization
const MeasurementResults = ({ measurementData, calculatedPoints, navigateBack, navigateToCalculatedPoints }) => {
  // State for selections and results
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [result, setResult] = useState('');
  const [lines, setLines] = useState([]);
  const [vertexIndex, setVertexIndex] = useState(null);
  // NEW: State for angle arc visualization
  const [angleArc, setAngleArc] = useState(null);
  
  // Zoom state remains the same
  const [zoomLevel, setZoomLevel] = useState(1);
  const [chartDomain, setChartDomain] = useState({ 
    xMin: null, xMax: null, yMin: null, yMax: null 
  });
  // NEW: State for zoom limit message
  const [zoomLimitMsg, setZoomLimitMsg] = useState('');
  
  // Initialize chart domain when points change
  useEffect(() => {
    if (calculatedPoints.length > 0) {
      // Find min/max values for x and y
      const xValues = calculatedPoints.map(p => p.x);
      const yValues = calculatedPoints.map(p => p.y);
      const radiusValues = calculatedPoints.map(p => p.radius);
      const maxRadius = Math.max(...radiusValues);
      
      const xMin = Math.min(...xValues) - maxRadius * 2;
      const xMax = Math.max(...xValues) + maxRadius * 2;
      const yMin = Math.min(...yValues) - maxRadius * 2;
      const yMax = Math.max(...yValues) + maxRadius * 2;
      
      setChartDomain({ xMin, xMax, yMin, yMax });
    }
  }, [calculatedPoints]);
  
  // Check if any point would go outside the chart boundary
  const wouldPointsGoOutOfBounds = (newDomain) => {
    const { xMin, xMax, yMin, yMax } = newDomain;
    
    for (const point of calculatedPoints) {
      const leftEdge = point.x - point.radius;
      const rightEdge = point.x + point.radius;
      const topEdge = point.y + point.radius;
      const bottomEdge = point.y - point.radius;
      
      if (leftEdge < xMin || rightEdge > xMax || bottomEdge < yMin || topEdge > yMax) {
        return true;
      }
    }
    
    return false;
  };
  
  // Handle zoom in with boundary check
  const handleZoomIn = () => {
    if (zoomLevel < 5) {
      const newZoomLevel = zoomLevel + 0.5;
      
      const centerX = (chartDomain.xMin + chartDomain.xMax) / 2;
      const centerY = (chartDomain.yMin + chartDomain.yMax) / 2;
      
      const originalXRange = chartDomain.xMax - chartDomain.xMin;
      const originalYRange = chartDomain.yMax - chartDomain.yMin;
      
      const newXRange = originalXRange / (newZoomLevel / zoomLevel);
      const newYRange = originalYRange / (newZoomLevel / zoomLevel);
      
      const newDomain = {
        xMin: centerX - newXRange / 2,
        xMax: centerX + newXRange / 2,
        yMin: centerY - newYRange / 2,
        yMax: centerY + newYRange / 2
      };
      
      if (wouldPointsGoOutOfBounds(newDomain)) {
        return; // Don't update if points would go out of bounds
      }
      
      setZoomLevel(newZoomLevel);
      setChartDomain(newDomain);
    }
  };
  
  // Handle zoom out
  const handleZoomOut = () => {
    if (zoomLevel > 0.5) {
      const newZoomLevel = zoomLevel - 0.5;
      
      const centerX = (chartDomain.xMin + chartDomain.xMax) / 2;
      const centerY = (chartDomain.yMin + chartDomain.yMax) / 2;
      
      const originalXRange = chartDomain.xMax - chartDomain.xMin;
      const originalYRange = chartDomain.yMax - chartDomain.yMin;
      
      const newXRange = originalXRange * (zoomLevel / newZoomLevel);
      const newYRange = originalYRange * (zoomLevel / newZoomLevel);
      
      const newDomain = {
        xMin: centerX - newXRange / 2,
        xMax: centerX + newXRange / 2,
        yMin: centerY - newYRange / 2,
        yMax: centerY + newYRange / 2
      };
      
      setZoomLevel(newZoomLevel);
      setChartDomain(newDomain);
    }
  };
  
  // State to track button clicks
  const [calculateDistanceClicked, setCalculateDistanceClicked] = useState(false);
  const [calculateAngleClicked, setCalculateAngleClicked] = useState(false);

  // Modified: Function to deselect all points - also clear angle arc
  const handleDeselectAll = () => {
    setSelectedPoints([]);
    setLines([]);
    setResult('');
    setVertexIndex(null);
    setCalculateDistanceClicked(false);
    setCalculateAngleClicked(false);
    setAngleArc(null); // Clear the angle arc
  };

  // Distance calculation between two points
  const calculateDistance = (point1, point2) => {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + 
      Math.pow(point2.y - point1.y, 2)
    );
  };

  // Modified: Point Selection Handler - clear angle arc when points change
  const handlePointSelect = (pointIndex) => {
    let newSelectedPoints;
    if (selectedPoints.includes(pointIndex)) {
      newSelectedPoints = selectedPoints.filter((i) => i !== pointIndex);
      
      // Clear result when a point is deselected
      setResult('');
      
      // Reset button states
      setCalculateDistanceClicked(false);
      setCalculateAngleClicked(false);
      
      // Clear the angle arc
      setAngleArc(null);
    } else {
      if (selectedPoints.length < 3) {
        newSelectedPoints = [...selectedPoints, pointIndex];
      } else {
        alert('You can select a maximum of 3 points.');
        return;
      }
    }
    
    setSelectedPoints(newSelectedPoints);
    
    // Create lines between all selected points
    const newLines = [];
    for (let i = 0; i < newSelectedPoints.length; i++) {
      for (let j = i + 1; j < newSelectedPoints.length; j++) {
        const p1 = calculatedPoints[newSelectedPoints[i]];
        const p2 = calculatedPoints[newSelectedPoints[j]];
        
        newLines.push({
          x1: p1.x,
          y1: p1.y,
          x2: p2.x,
          y2: p2.y,
          color: `hsl(${Math.random() * 360}, 70%, 50%)`
        });
      }
    }
    
    setLines(newLines);
    
    // Reset vertex index if points are deselected
    if (newSelectedPoints.length < 3) {
      setVertexIndex(null);
    }
  };

  // Handle distance calculation - should clear angle arc
  const handleCalculateDistance = () => {
    // Toggle button color
    setCalculateDistanceClicked(true);
    setCalculateAngleClicked(false);
    
    // Clear angle arc
    setAngleArc(null);
    
    // If less than 2 points selected, show error
    if (selectedPoints.length < 2) {
      setResult('Please select at least 2 points to calculate distance.');
      return;
    }

    // Create simplified results
    let resultsText = '';
   
    // Add point coordinates
    selectedPoints.forEach(pointIndex => {
      const point = calculatedPoints[pointIndex];
      resultsText += `${pointIndex + 1}: ${point.x.toFixed(2)}, ${point.y.toFixed(2)}\n`;
    });
    
    resultsText += '\n'; // Add separator

    // Iterate through all point combinations
    for (let i = 0; i < selectedPoints.length; i++) {
      for (let j = i + 1; j < selectedPoints.length; j++) {
        const p1Index = selectedPoints[i];
        const p2Index = selectedPoints[j];
        const p1 = calculatedPoints[p1Index];
        const p2 = calculatedPoints[p2Index];
        
        // Calculate distance
        const distance = calculateDistance(p1, p2).toFixed(2);

        // Add simplified distance result
        resultsText += `${p1Index + 1}-${p2Index + 1}: ${distance}\n`;
      }
    }
    
    setResult(resultsText);
  };

  // In your MeasurementResults component, locate the handleCalculateAngle function
// and enhance the arc visualization code:

const handleCalculateAngle = () => {
  setCalculateAngleClicked(true);
  setCalculateDistanceClicked(false);
  setResult('');
  setAngleArc(null);
  
  if (selectedPoints.length === 3) {
    const p1Index = selectedPoints[0];
    const p2Index = selectedPoints[1]; // This is the vertex point
    const p3Index = selectedPoints[2];
    
    const p1 = calculatedPoints[p1Index];
    const p2 = calculatedPoints[p2Index];
    const p3 = calculatedPoints[p3Index];

    // Calculate vectors from vertex (p2) to other points
    const v1 = { x: p1.x - p2.x, y: p1.y - p2.y };
    const v2 = { x: p3.x - p2.x, y: p3.y - p2.y };
    
    // Calculate dot product
    const dotProduct = v1.x * v2.x + v1.y * v2.y;
    
    // Calculate magnitudes
    const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
    const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
    
    // Calculate angle in radians
    const angleRad = Math.acos(dotProduct / (mag1 * mag2));
    
    // Convert to degrees
    const angle = angleRad * (180 / Math.PI);
    
    // Calculate a reasonable arc radius (adjust as needed)
    const arcRadius = Math.min(mag1, mag2) * 0.3;
    
    // Calculate normalized vectors
    const nv1 = { x: v1.x / mag1, y: v1.y / mag1 };
    const nv2 = { x: v2.x / mag2, y: v2.y / mag2 };
    
    // Calculate start and end points for the arc
    const startPoint = {
      x: p2.x + nv1.x * arcRadius,
      y: p2.y + nv1.y * arcRadius
    };
    
    const endPoint = {
      x: p2.x + nv2.x * arcRadius,
      y: p2.y + nv2.y * arcRadius
    };
    
    // Calculate cross product to determine direction
    const crossProduct = nv1.x * nv2.y - nv1.y * nv2.x;
    
    // Set arc flags based on angle and direction
    const arcLargeFlag = angleRad > Math.PI ? 1 : 0;
    const sweepFlag = crossProduct < 0 ? 1 : 0;
    
    // Create result text
    let resultsText = '';
    resultsText += `Point ${p1Index + 1}: (${p1.x.toFixed(2)}, ${p1.y.toFixed(2)})\n`;
    resultsText += `Point ${p2Index + 1}: (${p2.x.toFixed(2)}, ${p2.y.toFixed(2)})\n`;
    resultsText += `Point ${p3Index + 1}: (${p3.x.toFixed(2)}, ${p3.y.toFixed(2)})\n\n`;
    resultsText += `Angle at Point ${p2Index + 1}: ${angle.toFixed(2)}°`;
    
    setResult(resultsText);
    
    // Set the angle arc with enhanced properties
    setAngleArc({
      cx: p2.x,
      cy: p2.y,
      radius: arcRadius,
      startPoint,
      endPoint,
      arcLargeFlag,
      sweepFlag,
      angle,
      color: '#ff4444' // Bright red for better visibility
    });
  } else if (selectedPoints.length === 2) {
    // Your existing 2-point angle calculation logic
    // ...
  } else {
    setResult('Please select 2 or 3 points for angle calculation.');
  }
};

  // Close result popup
  const closeResultPopup = () => {
    setResult('');
  };
  
  // Close zoom limit message
  const closeZoomLimitMsg = () => {
    setZoomLimitMsg('');
  };
  
 // Modified renderCircleShape function to properly handle zoom levels
const renderCircleShape = (props) => {
  const { cx, cy, payload, xAxis, yAxis } = props;
  const isSelected = selectedPoints.includes(payload.pointIndex);
  const circleRadius = payload.radius;
  
  // Calculate the pixel per unit separately for x and y axes
  const xPixelPerUnit = Math.abs(xAxis.scale(1) - xAxis.scale(0));
  const yPixelPerUnit = Math.abs(yAxis.scale(1) - yAxis.scale(0));
  
  // Use the minimum of the two scales to ensure circles remain circular
  const pixelPerUnit = Math.min(xPixelPerUnit, yPixelPerUnit);
  
  // Scale the radius based on the current zoom level
  const scaledRadius = circleRadius * pixelPerUnit;
  
  return (
    <g 
      onClick={() => handlePointSelect(payload.pointIndex)}
      style={{ cursor: 'pointer' }}
      className={isSelected ? 'circle-selected' : ''}
    >
      <circle 
        cx={cx} 
        cy={cy} 
        r={scaledRadius} 
        fill="rgba(136, 132, 216, 0.4)" 
        stroke={isSelected ? '#131313' : '#131313'}
        strokeWidth={2.5}
        className="circle-path"
      />
      
      <circle 
        cx={cx} 
        cy={cy} 
        r={1.5} 
        fill={isSelected ? '#ff0000' : '#000000'}
        className="circle-center"
      />
      
      <text 
        x={cx} 
        y={cy} 
        textAnchor="middle" 
        dy={2}
        fontSize={10}
        fill="black"
        fontWeight="bold"
        pointerEvents="none"
      >
        {payload.pointIndex + 1}
      </text>
    </g>
  );
};
{/* Add this helper function to generate appropriate tick values */}
const generateTicks = (min, max) => {
  // Determine a reasonable step size based on the range
  const range = max - min;
  let step = 1;
  
  if (range > 50) step = 5;
  else if (range > 20) step = 2;
  else if (range < 10) step = 0.5;
  
  // Generate ticks with the calculated step
  const ticks = [];
  let current = Math.ceil(min / step) * step;
  while (current <= max) {
    ticks.push(current);
    current += step;
  }
  
  return ticks;
};
// Enhanced function to generate angle arc SVG path with arrow
const generateAngleArcPath = (angleArc) => {
  if (!angleArc) return null;
  
  const { cx, cy, radius, startPoint, endPoint, arcLargeFlag, sweepFlag } = angleArc;
  
  // Calculate the start and end points of the arc
  const startX = cx + radius * Math.cos(startPoint.x);
  const startY = cy + radius * Math.sin(startPoint.y);
  const endX = cx + radius * Math.cos(endPoint.x);
  const endY = cy + radius * Math.sin(endPoint.y);
  
  // Determine if we're drawing the large arc
  let angleDiff = endX - startX;
  while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
  while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
  
  const largeArcFlag = Math.abs(angleDiff) > Math.PI ? 1 : 0;
  
  // Draw the angle arc with lines from center
  return `M ${cx},${cy} L ${startX},${startY} ` +
         `A ${radius},${radius} 0 ${largeArcFlag} ${sweepFlag} ${endX},${endY} ` +
         `L ${cx},${cy}`;
};
  
  return (
    <div className="measurement-converter-container">
      <div className="measurement-converter-wrapper">
        {/* <h1 className="main-title">Measurement Results</h1> */}
        
        {/* SVG Circle Plot */}
        {calculatedPoints.length > 0 && (
          <div className="coordinate-plot-container">
            <ResponsiveContainer width="70%" height={600} aspect={1}>
              <ScatterChart 
              

              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              // Force square aspect ratio with explicit width/height
            >
              <CartesianGrid />
              <XAxis 
              type="number" 
              dataKey="x" 
              name="X" 
              domain={[chartDomain.xMin, chartDomain.xMax]}
              allowDataOverflow={true}
              // For custom ticks based on domain
              ticks={generateTicks(chartDomain.xMin, chartDomain.xMax)}
              />
              <YAxis 
              type="number" 
              dataKey="y" 
              name="Y" 
              domain={[chartDomain.yMin, chartDomain.yMax]}
              allowDataOverflow={true}
              // For custom ticks based on domain
              ticks={generateTicks(chartDomain.yMin, chartDomain.yMax)}
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(value, name) => [value.toFixed(2), name]}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                      <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
                        <p><strong>Point {data.pointIndex + 1}</strong></p>
                        <p>X: {data.x.toFixed(2)}</p>
                        <p>Y: {data.y.toFixed(2)}</p>
                        <p>Radius: {data.radius.toFixed(2)}</p>
                      </div>
                      );
                    }
                    return null;
                  }}
              />
  
                   {/* Custom Scatter shape for circle visualization */}
              <Scatter 
              name="Measurement Circles" 
              data={calculatedPoints.map((point, index) => ({
                ...point, 
                pointIndex: index
              }))} 
              shape={renderCircleShape}
              />
              {/* Draw lines between selected points */}
              {lines.map((line, index) => (
                <ReferenceLine 
                  key={index}
                  segment={[{ x: line.x1, y: line.y1 }, { x: line.x2, y: line.y2 }]}
                  stroke={line.color}
                  strokeWidth={2}
                />
                ))}           
                {/* Ensure this code is in your chart's JSX section */}
{angleArc && (
  <ReferenceLine
    key="angle-arc"
    ifOverflow="visible"
    segment={[
      { x: angleArc.cx, y: angleArc.cy },
      { x: angleArc.startPoint.x, y: angleArc.startPoint.y }
    ]}
    shape={(props) => {
      if (!props.xAxis?.scale || !props.yAxis?.scale) return null;
      
      const { xAxis, yAxis } = props;
      const { cx, cy, radius, startPoint, endPoint, arcLargeFlag, sweepFlag, angle, color } = angleArc;
      
      try {
        // Convert to pixel coordinates
        const x = xAxis.scale(cx);
        const y = yAxis.scale(cy);
        const startX = xAxis.scale(startPoint.x);
        const startY = yAxis.scale(startPoint.y);
        const endX = xAxis.scale(endPoint.x);
        const endY = yAxis.scale(endPoint.y);
        
        // Calculate text position (midpoint of the arc)
        const midAngle = angle * (Math.PI / 180) / 2;
        const textRadius = radius * 1.2;
        const textX = cx + textRadius * Math.cos(midAngle);
        const textY = cy + textRadius * Math.sin(midAngle);
        const textXPx = xAxis.scale(textX);
        const textYPx = yAxis.scale(textY);
        
        return (
          <g>
            {/* Draw the lines from center to arc endpoints */}
            <line
              x1={x}
              y1={y}
              x2={startX}
              y2={startY}
              stroke={color}
              strokeWidth={1.5}
              strokeDasharray="3,3"
            />
            <line
              x1={x}
              y1={y}
              x2={endX}
              y2={endY}
              stroke={color}
              strokeWidth={1.5}
              strokeDasharray="3,3"
            />
            
            {/* Draw the arc */}
            <path
              d={`M ${startX},${startY} 
                  A ${Math.abs(startX - x)},${Math.abs(startY - y)} 0 ${arcLargeFlag} ${sweepFlag} ${endX},${endY}`}
              fill="none"
              stroke={color}
              strokeWidth={3} // Increased from 2 for better visibility
              className="angle-arc"
            />
            
            {/* Add angle text */}
            <text
              x={textXPx}
              y={textYPx}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={color}
              fontSize="14"
              fontWeight="bold"
              filter="url(#solid)"
            >
              {angle.toFixed(1)}°
            </text>
            
            {/* Add a white background for the text */}
            <defs>
              <filter x="0" y="0" width="1" height="1" id="solid">
                <feFlood floodColor="white" floodOpacity="0.8"/>
                <feComposite in="SourceGraphic"/>
              </filter>
            </defs>
          </g>
        );
      } catch (error) {
        console.error('Error rendering angle arc:', error);
        return null;
      }
    }}
  />
)}
                
                </ScatterChart>
                  </ResponsiveContainer>
                  
                  {/* Result Popup - positioned at bottom right of the chart */}
                  {result && (
                    <div className="result-popup">
                      <div className="result-popup-header">
                        <h3 className="result-title">Result</h3>
                        <button 
                          onClick={closeResultPopup}
                          className="close-popup-button"
                        >
                          ×
                        </button>
                      </div>
                      <pre className="result-popup-content">{result}</pre>
                    </div>
                  )}
                </div>
              )}
              
              {/* Controls container and buttons remain unchanged */}
              <div className="control-buttons-container">
                <div className="button-row">
                  <button className="control-button zoom-button" onClick={handleZoomIn} title="Zoom In">
                    <img src={zoominImage} alt="Zoom In" />
                  </button>
                  
                  <button className="control-button zoom-button" onClick={handleZoomOut} title="Zoom Out">
                    <img src={zoomoutImage} alt="Zoom Out" />
                  </button>
                  
                  <button onClick={navigateToCalculatedPoints} className="control-button" title="Show Points">
                    <img src={showpointsImage} alt="Show Points" />
                  </button>
                  
                  <button onClick={navigateBack} className="control-button" title="Return">
                    <img src={returnImage} alt="Return" />
                  </button>
                
                  <button 
                    onClick={handleCalculateDistance} 
                    disabled={selectedPoints.length < 2}
                    className={`control-button ${calculateDistanceClicked ? 'active' : ''}`}
                    title="Calculate Distance"
                  >
                    <img src={distanceImage} alt="Distance" />
                  </button>
                  
                  <button 
                    onClick={handleCalculateAngle} 
                    disabled={selectedPoints.length < 2}
                    className={`control-button ${calculateAngleClicked ? 'active' : ''}`}
                    title="Calculate Angle"
                  >
                    <img src={angleImage} alt="Angle" />
                  </button> 
                  
                  <button 
                    onClick={handleDeselectAll}
                    disabled={selectedPoints.length === 0}
                    className="control-button"
                    title="Deselect All"
                  >
                    <img src={deselectImage} alt="Deselect" />
                  </button>

                </div>
              </div>
            </div>
          </div>
  );
};


function MySVGComponent() {
  return (
    <svg width="200" height="200">
      {/* Circle for reference */}
      <circle cx="100" cy="100" r="80" stroke="lightgray" fill="none" />

      {/* Curved chord / arc */}
      <path d="M 60 60 A 80 80 0 0 1 140 60" stroke="red" fill="none" strokeWidth="2" />
    </svg>
  );
}















// Add CSS for the circles
const style = document.createElement('style');
style.textContent = `
.circle-path {
  transition: stroke 0.3s, fill 0.3s;
}

.circle-center {
  transition: fill 0.3s;
}

.circle-selected .circle-path {
  stroke: #ff0000;
}

.circle-selected .circle-center {
  fill: #ff0000;
}

.coordinate-plot-container {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.custom-tooltip {
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

@keyframes pulseArc {
  0% { 
    fill-opacity: 0.2;
    stroke-opacity: 0.7;
  }
  50% { 
    fill-opacity: 0.3;
    stroke-opacity: 0.9;
  }
  100% { 
    fill-opacity: 0.2;
    stroke-opacity: 0.7;
  }
}

.angle-arc {
  animation: pulseArc 2s infinite;
  pointer-events: none;
}

.result-popup {
  max-height: 250px;
  overflow-y: auto;
  font-size: 14px;
  line-height: 1.4;
  padding: 10px;
}

.result-popup-content {
  white-space: pre-wrap;
  margin: 0;
  font-family: monospace;
}
`;
document.head.appendChild(style);
