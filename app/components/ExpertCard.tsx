import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { redirect } from 'next/navigation';

interface ExpertData {
  expert: {
    id: number;
    name: string;
    title: string;
    rating: number;
    reviews: number;
    expertise: string[];
    bio: string;
    image: string;
  }
}

export const ExpertCard = ({ expert }: ExpertData) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          <Image
            src={expert.image}
            alt={expert.name}
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
          <div>
            <CardTitle className="text-lg font-bold">{expert.name}</CardTitle>
            <CardDescription>{expert.title}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center space-x-2 mb-2">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{expert.rating.toFixed(1)}</span>
          <span className="text-muted-foreground">({expert.reviews} reviews)</span>
        </div>
        {/* <p className="text-sm text-muted-foreground mb-4">{expert.bio}</p> */}
        <div className="flex flex-wrap gap-2">
          {expert.expertise.map((skill, index) => (
            <Badge key={index} variant="secondary" className='border-2 border-primary/20'>{skill}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button className="w-full" onClick={()=> redirect(`/${expert.id}`)}>
          <Clock className="mr-2 h-4 w-4" /> Book a Session
        </Button>
      </CardFooter>
    </Card>
  )
}

