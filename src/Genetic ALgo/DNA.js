import React from 'react'

function DNA(lgt) {
    this.genes=[];
    this.fitness=0;
    this.dna_length=lgt;
    for(let i=0;i<lgt;i++)
        this.genes[i]=getachar();

    this.calc_fitness=function(tar){
        for(let i =0;i<tar.length;i++)
        {
            if(tar.charAt(i)==this.genes[i])
                this.fitness+=1;
        }
        this.fitness=Math.pow(2,this.fitness);
        this.fitness+=0.01;
    }

    this.crossover= function(dd){
        let mid=Math.floor(Math.random()*dd.genes.length);
        let newgene=new DNA(dd.dna_length);
        for(let i=0;i<dd.genes.length;i++)
        {
            if(i<mid)
            newgene.genes[i]=this.genes[i];
            else
            newgene.genes[i]=dd.genes[i];
        }
        return newgene;
    }
    this.mutate=function(dd){
        for(let i=0;i<this.genes.length;i++)
        {
            let r=Math.random();
            if(r<dd)
            this.genes[i]=getachar();
        }
    }
    
}

function getachar(){
    // return (char) (Math.random(32,127));
    let b=32;
    let c=123;
    let a=Math.floor(Math.random()*(c-b))+b;
    let cc=String.fromCharCode(a)
    return cc;
}

export default DNA
