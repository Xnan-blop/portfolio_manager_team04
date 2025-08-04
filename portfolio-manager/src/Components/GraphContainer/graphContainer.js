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
    console.log(x_axis);
    console.log(y_axis);
    console.log(Math.max(y_axis));

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
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            ticks: {
              color: "#fff",
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
              color: "#fff"
            }
          }
        }
      }
    });

    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, [portfolioData]);

  

  return (
    <div className="graph-container dark-mode">
      <h2>Net Worth</h2>
      <canvas className = "graph-canvas" ref={chartRef}></canvas>
    </div>
  );
};

export default GraphContainer;
