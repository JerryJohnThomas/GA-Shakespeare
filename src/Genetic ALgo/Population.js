import React from 'react'
import DNA from "./DNA"
function Population(pop_size,dna_size,goal,mut_rate){
    // consists of DNA (200 numbs)
    // console.log("poli");
    this.population=[];
    this.avg_fitness=0;
    this.sum_fitness=0;
    this.generation_count=1;
    this.finished=false;
    this.max_fit_in_set=0;
    this.perfect_score=Math.pow(2,dna_size);
    this.best="";
    this.best_set="";
    for(let i=0;i<pop_size;i++)
    {
        this.population[i]=new DNA(dna_size);
    }


    this.calc_fitness=function(){
        let s=0;
        let max_i=0;
        let max_fit=0;

    
        for(let i=0;i<this.population.length;i++)
        {
            this.population[i].calc_fitness(goal);
            s+=this.population[i].fitness;
            if(this.population[i].fitness>max_fit)
            {
                max_fit=this.population[i].fitness;
                max_i=i;
            }
        }
        this.sum_fitness=s;
        this.max_fit_in_set=max_fit;
        let temp_best="";
        this.population[max_i].genes.forEach((b)=>temp_best+=b);
        this.best_set=temp_best;
        if(string_cmp(this.best_set,goal)>string_cmp(this.best,goal)){
            this.best=this.best_set;
        }
    }

    function string_cmp(a,g)
    {
        let v=0;
        for(let i =0;i<a.length;i++)
        {
            if(a.charAt(i)==g.charAt(i))
                v++;
        }
        return v;
    }

    this.reproduce=function(){
        // this has mutation in built
        let norm_sum=0;
        for(let i=0;i<this.population.length;i++)
        {
            this.population[i].normscore=this.population[i].fitness/this.sum_fitness;
            norm_sum+=this.population[i].normscore;
        }

        this.avg_fitness=norm_sum/pop_size;
        // this.avg_fitness=this.avg_fitness.toFixed(5);

        let new_pop=[];
        for(let i=0;i<this.population.length;i++)
        {
            let parentA=accept_reject(this.population);
            let parentB=accept_reject(this.population);
            let child=parentA.crossover(parentB);
            child.mutate(mut_rate);
            new_pop[i]=child;
            // console.log(parentA.genes);
        }
        this.population=new_pop;
        this.generation_count++;
    }

    function accept_reject(p){
        let r=Math.random();
        let index=0;
        while(r>=0)
        {
            // console.log(p[index].normscore);
            r=r-p[index].normscore;
            index++;
        }
        return p[index-1];

    }

    this.evaluate=function(){
        if(this.max_fit_in_set>=this.perfect_score)
        {   
            this.finished=true;
            // return;
        }
    }


}

export default Population;