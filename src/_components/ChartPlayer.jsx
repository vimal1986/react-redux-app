import React, { Component } from 'react'; 

const ChartPlayer = ({playerDetails}) => {
    
  const divStyle = {     
  }

  
  if(!playerDetails) {
    return(<div style={divStyle}> Player Details Not found </div>);
  }

  return(  
    <div>
        playerDetails.error && <span className="text-danger">ERROR: {playerDetails.error}</span>}
                    {
                        playerDetails.data &&
                        <table className="table table-bordered">
                        <thead><tr>
                            <th>Ground Name</th>
                            <th>Ground Small Name</th>
                            <th>Match Formatid</th>
                            <th>Opposition Short Name</th>
                            <th>Batsman Ballsfaced</th>
                            <th>Series Name</th>
                            <th>Match Startdate</th>
                            <th>Match Urlcomponent</th>
                            <th>Not Outs</th>
                            <th>Batsman Runs</th>
                        </tr></thead>
                        <tbody>
                            {
                                playerDetails.data.map((playerDetail, index) =>
                                <tr>
                                    <td>{ground_name}</td>
                                    <td>{ground_small_name}</td>
                                    <td>{match_formatid}</td>
                                    <td>{opposition_short_name}</td>
                                    <td>{batsman_ballsfaced}</td>
                                    <td>{series_name}</td>
                                    <td>{match_startdate}</td>
                                    <td>{match_urlcomponent}</td>
                                    <td>{notouts}</td>
                                    <td>{batsman_runs}</td>
                                </tr>    
                                )
                            }
                        </tbody>    
                      </table>                        
                    }
       
       
    </div>
  )
}
 
export default Product ;




