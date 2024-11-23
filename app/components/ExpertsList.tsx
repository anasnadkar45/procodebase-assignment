"use client"
import React, { useState } from 'react'
import expertsData from '../data/experts.json'
import { ExpertCard } from './ExpertCard';

export const ExpertsList = () => {
    const [experts, setExperts] = useState(expertsData);
    console.log(experts);
    
  return (
    <div className='flex flex-col gap-2'>
        {experts.experts.map((expert)=>(
            <ExpertCard key={expert.id} expert={expert}/>
        ))}
    </div>
  )
}
