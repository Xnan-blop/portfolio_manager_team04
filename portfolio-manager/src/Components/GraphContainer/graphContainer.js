// GraphContainer.jsx
import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import './graphContainer.css';

const GraphContainer = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  
  useEffect(() => {
    const PortfolioData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5050/api/portfolio/value');
      const data = await response.json();
      setPortfolioData(data);
    } catch (err) {
      console.error('Failure fetching portfolio data for graph');
    }
  };
  PortfolioData();
  }, []);

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // to prevent duplicate chart renders

  useEffect(() => {
    if (portfolioData.length === 0) return;

    const ctx = chartRef.current;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    console.log(portfolioData);
    const x_axis = portfolioData.map(item => item.date);
    const y_axis = portfolioData.map(item => item.total_value);
   
    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: x_axis,
        datasets: [{
          data: y_axis,
          fill: false,
          borderColor: "#fff",
          tension: 0.1,
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 2, // Add aspect ratio for better proportions
        plugins: {
          legend: { display: false }
        },
        layout: {
          padding: {
            top: 10,
            bottom: 10,
            left: 10,
            right: 10
          }
        },
        scales: {
          x: {
            ticks: {
              color: "#fff",
              maxTicksLimit: 8 // Limit number of x-axis labels
            },
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              display: false
            },
            min: Math.min(...y_axis) - 50,
            max: Math.max(...y_axis) + 50,
            ticks: {
              stepSize: 1,
              color: "#fff",
              maxTicksLimit: 6 // Limit number of y-axis labels
            }
          }
        }
      }
    });

    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, [portfolioData]);

  const getCurrentNetWorth = () => {
    if (portfolioData.length === 0) return '$0.00';
    const latestValue = portfolioData[portfolioData.length - 1]?.total_value || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(latestValue);
  };

  return (
    <div className="graph-container dark-mode">
      <div className="graph-header">
        <h3>Portfolio Value</h3>
        <p className="net-worth-display">Current Value: {getCurrentNetWorth()}</p>
      </div>
      <div className="graph-canvas">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default GraphContainer;
