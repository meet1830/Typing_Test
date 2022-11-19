import React from 'react'
// line component used to plot chart
import {Line} from 'react-chartjs-2';

// for chartjs 2 to work have to import several depenencies for chartjs to work and then chartjs 2 will work
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// to register at the top of the file
ChartJS.register (
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Graph = ({graphData}) => {
  return (
    <div>
        <Line 
            data = {
                // here specify what does in out x axis and y axis
                // xaxis called labels and y axis called datasets
                // there can be multiple y axis, for example sin and cos curve on same graph
                // each object in data set will refer to different functions
                // but here need only one value in data sets
                {
                    // labels:[1, 2, 3, 4],
                    // graph data is of length 2, but we need only at first index that are time values
                    // the statement will return a array which the first value
                    labels: graphData.map(i => i[0] + 1),
                    datasets: [
                        {
                            // data: [5, 6, 7, 8],
                            data: graphData.map(i => i[1]),
                            // label: "some random values",
                            // label is what the values will be known as
                            label: "wpm",
                            borderColor: 'gold',
                        }
                    ]
                }
            }
        
        >

        </Line>
    </div>
  )
}

export default Graph