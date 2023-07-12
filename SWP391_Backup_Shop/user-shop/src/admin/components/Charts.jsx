import React, { useEffect, useState } from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import 'chartjs-plugin-datalabels';

const Charts = ({ type, data, content }) => {
  const [chartId, setChartId] = useState(null);

  // Function to generate a unique ID for each chart instance
  const generateUniqueId = () => {
    return `chart-${Math.random().toString(36).substring(2, 9)}`;
  };

  // Function to destroy the chart instance associated with a given ID
  const destroyChartInstance = (chartId) => {
    const destroyChartInstance = (chartId) => {
        const chartInstance = Chart.instances[chartId];
        if (chartInstance) {
          chartInstance.destroy();
          delete Chart.instances[chartId];
        }
      };
      
  };

  useEffect(() => {
    // Generate a unique ID for the chart instance
    const id = generateUniqueId();

    // Store the ID in the state
    setChartId(id);

    // Clean up the chart instance when the component unmounts
    return () => {
      if (id) {
        destroyChartInstance(id);
      }
    };
  }, []);

  let ChartComponent = null;
  let options = {};

  switch (type) {
    case 'Line':
      ChartComponent = Line;
      break;
    case 'Bar':
      ChartComponent = Bar;
      break;
    case 'Pie':
      ChartComponent = Pie;
      options = {
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              const dataset = ctx.chart.data.datasets[0];
              const total = dataset.data.reduce((acc, data) => acc + data, 0);
              const percentage = ((value * 100) / total).toFixed(2) + '%';
              return percentage;
            },
            color: '#fff',
            display: true,
          },
        },
      };
      break;
    case 'Doughnut':
      ChartComponent = Doughnut;
      break;
    default:
      return null;
  }

  return (
      <div>
          <h4>{content} Chart</h4>
          {chartId && ChartComponent && (
              <ChartComponent
                  data={data}
                  options={options}
                  id={chartId}
                  className={type === 'Line' || type === 'Bar' ? 'w-[540px] h-[360px]' : 'h-[160px]'}
              />
          )}
      </div>
  );
};

export default Charts;
