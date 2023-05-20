import axios from "axios";
import React, { useEffect, useState } from "react";


import { VictoryPie } from "victory";




function ChartDisplayMach() {
  const [upMachines, setUpMachines] = useState(0);
  const [downMachines, setDownMachines] = useState(0);
  

  useEffect(() => {
    axios.get('api/machine/number').then(res => {
      if(res.data.status === 200 ){
        setUpMachines(res.data.upMachines.length)
        setDownMachines(res.data.downMachines.length)

      }
      
    }

    )
    
    
  }, []);


  return (
    <div className="w-100 h-100">
            <VictoryPie
            
              standalone={true}
              innerRadius={75}
              colorScale={["LightGreen", "tomato"]}
              data={[
                { x: 'Working', y: upMachines },
                { x: 'Not W', y: downMachines }
              ]}
            />
 </div>

  );
}
export default ChartDisplayMach;