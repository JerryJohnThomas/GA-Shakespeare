import React, { useEffect, useState } from 'react'
import "./GenA.css"
import Population from "./Population"
function GenA() {
    let [target,setTarget]=useState("Jerry John Thomas hebron");
    let [gen_count,setGen_count]=useState(1);
    let[mutation,setMutation]=useState(0.01);
    let[tot_pop,setTot_pop]=useState(200);
    let[avg,setAvg]=useState(0);
    let[best_now,setBest_now]=useState("___AAhy");
    let[best_disp,setBest_disp]=useState(["jj","pop","tin"]);
    let pop=new Population(tot_pop,target.length,target,mutation);
    

   
  

function display_update(){
    setBest_disp([]);
    let dummy_disp=[];
    pop.population.map((a,cc)=>{
        let s="";
        a.genes.forEach((b)=>s+=b);
        dummy_disp[cc]=s;
        // setBest_disp((old)=>[...old,s]);
        // console.log(s);
    })
    setBest_disp(dummy_disp);
    setBest_now(pop.best);
    setAvg(pop.avg_fitness);
    setGen_count(pop.generation_count);
    
}
function update(){
    // console.log("update called");
    
    pop.calc_fitness();
    pop.reproduce();
    pop.evaluate();
    display_update();
}

function update_only_calc(){
    // console.log("update called");
    
    pop.calc_fitness();
    pop.reproduce();
    pop.evaluate();
    // display_update();
}

function overk(){
    console.log("overk");
}

/* Call this function with a string containing the ID name to
 * the element containing the number you want to do a count animation on.*/



useEffect(()=>{
    // doit();     //this works acc to ideal
    doit2();     //this works slwoly
    
},[]);

function doit(){
     setTimeout(()=>{
         update();
        if(pop.finished==false)
        doit();
        else
        display_update();
    },1)
    
}


function doit2(){
    setTimeout(()=>{
        update_only_calc();
        if(pop.finished==false)
        {
           display_update();
           doit2();
       }
       else
       display_update();
   },1)
   
}

let [show,setShow]=useState(false);
let[it,setIt]=useState(target);
function redo(){
    setShow(true);
}

function submit(){
setTarget(it);
setShow(false);
let pop2=new Population(tot_pop,it.length,it,mutation);
console.log(it);
console.log(target);
pop=pop2;
doit2();
}
    return (
        <div>
            
            {show?<div className="inp"> <input className="i1" type="text" value={it} onChange={(e)=>setIt(e.target.value)}/> <button onClick={()=>submit()}>RUN</button> </div>:null}
            <div className="container_1">
                <div className="leftc">
                    <div>Best One so Far:</div>
                    <div className="best_now">{best_now}</div>
                    <div>Target: {target}</div>
                    <div>generation state: {gen_count}</div>
                    <div>mutation rate: {mutation*100} %</div>
                    <div>Total Population: {tot_pop}</div>
                    <div>Average: {avg}</div>
                    <div></div>
                    <button className="btn" onClick={()=>redo()}>Retry</button>
                </div>
                <div className="rightc">
                    
                    {
                        best_disp.map((a,c)=>
                        (
                             <div key={c} >{a}</div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default GenA
