import React from "react";
import "./ChartBar.css";

const ChartBar = (props) =>{
    let barFillHeight="0%";
    if(props.maxValue>0){
        barFillHeight=Math.round((props.value / props.maxValue) *100) + "%";
    }
    
    let chartbarValue=<p style={{fontSize:"12px"}}>{props.value}€</p>

    return(
        <div className="chart-bar">
            <div className="chart-bar__inner">
                <div className="chart-bar__fill" style={{height:barFillHeight}}>

                </div>
            </div>
            <div className="chart-bar__label">
                {props.label}
            </div>
            {chartbarValue}
        </div>
    );
};

export default ChartBar;