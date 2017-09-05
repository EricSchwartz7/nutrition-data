import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';

const Display = (props) => {

  if (Object.keys(props.data).length > 0){

    const nutrient = props.data[0].nutrients[0].nutrient;
    const unit = props.data[0].nutrients[0].unit;
    const labels = props.data.map( food => food.name );
    const values = props.data.map( food => food.nutrients[0].value );

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: `${nutrient} (${unit})`,
          backgroundColor: 'rgba(99, 134, 255, 0.2)',
          borderColor: 'rgba(99,134,255,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(99,134,255,0.4)',
          hoverBorderColor: 'rgba(99,134,255,1)',
          data: values
        }
      ],

    };

    const options = {
      scales: {
        xAxes: [{
          display: true,
          ticks: {
            beginAtZero: true   // minimum value will be 0.
          }
        }]
      }
    };

    return (
      <HorizontalBar
        data={chartData}
        options={options}
      />
    )
  }
  return (
    <p>Please select a nutrient.</p>
  )
};

export default Display;
