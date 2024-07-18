import { Line } from "react-chartjs-2";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart,
  Legend,
  PointElement,
  Tooltip,
  LinearScale, 
  CategoryScale,
  LineElement, 
} from "chart.js";



function Graph() {
  const [array, setArray] = useState([]);
  const [dArray, setDArray] = useState([]);
  const location = useLocation();
  const id = location.state?.id;
  
  
  Chart.register(
    PointElement,
    CategoryScale,
    LineElement,
    LinearScale,
    Legend,
    Tooltip
  );


  useEffect(() => {
    async function getCustomerAndTransaction(id) {
      const transactionData = await axios({
        url: `http://localhost:3000/transactions?customer_id=${id}`,
      });

      let dates = [];
      let counts = [];

      transactionData.data.forEach((transaction) => {
        const dateIndex = dates.indexOf(transaction.date);

        if (dateIndex !== -1) {
          counts[dateIndex] += 1;
        } else {
          dates.push(transaction.date);
          counts.push(1);
        }
      });
      setArray(dates);
      setDArray(counts);
      console.log("dates", dates);
      console.log("counts", counts); 

      console.log(transactionData.data);
    }

    if (id) {
      getCustomerAndTransaction(id);
    }
  }, [id]);

  const data = {
    labels: Array,
    datasets: [
      {
        label: "Dataset",
        data: dArray,
        fill: false,
        borderColor: "#001510",
        tension: 0.3,
        backgroundColor: "#00000",
        pointBorderColor: "red",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return value;
          },
          color: "white",
        },
        grid: {
          color: "white",
        },
      },
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "white",
        },
      },
    },
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-1/2">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default Graph;