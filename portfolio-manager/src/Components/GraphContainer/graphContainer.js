// GraphContainer.jsx
import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import './graphContainer.css';

const GraphContainer = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // to prevent duplicate chart renders

  useEffect(() => {
    const ctx = chartRef.current;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [{
          data: [7, 8, 8, 9, 4, 9, 10],
          fill: false,
          borderColor: "rgba(0,0,255,1.0)",
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            min: 0,
            max: 15,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });

    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, []);

  return (
    <div className="graph-container dark-mode">
      <h2>Net Worth</h2>
      <canvas className = "graph-canvas" ref={chartRef}></canvas>
    </div>
  );
};

export default GraphContainer;
