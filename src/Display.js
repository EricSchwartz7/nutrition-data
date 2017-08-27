import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';

// const nutrientCodes = {
//   '208': 'Calories',
//   '203': 'Protein',
//   '204': 'Lipids (fat)',
//   '205': 'Carbohydrates',
//   '269': 'Sugars'
// }


const Display = function (props) {

  // const nutrient = nutrientCodes[props.filter];
  // const unit = prop

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
      ]
    };

    return (
      <HorizontalBar
        data={chartData}
      />
    )
  }
  return (
    <p>Please select a nutrient.</p>
  )
}

export default Display;
