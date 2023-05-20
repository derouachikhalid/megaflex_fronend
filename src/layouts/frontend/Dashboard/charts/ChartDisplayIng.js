import axios from "axios";
import React, { useEffect, useState } from "react";
import { VictoryPie } from "victory";




function ChartDisplayIng() {
  
  const [applicatifIng, setApplicatifIng] = useState(0);
  const [techiqueIng, setTechiqueIng] = useState(0);

  useEffect(() => {
        axios.get('api/ingenieur/number').then(res => {
      if(res.data.status === 200 ){
        setApplicatifIng(res.data.bioIng.length)
        setTechiqueIng(res.data.appIng.length)
}})
    
  }, []);


  return (
    <div>
          <VictoryPie
            
              standalone={true}
              innerRadius={75}
              
              colorScale={["LightGreen", "tomato"]}
              
              data={[
                { x: 'applicatif', y: applicatifIng },
                { x: 'biomédical', y: techiqueIng }
              ]}
             
              labelPlacement={"perpendicular"}
              startAngle={90}
              endAngle={450}
              
            />

          </div>);
}
export default ChartDisplayIng;