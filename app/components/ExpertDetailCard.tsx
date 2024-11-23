"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { ArrowLeft, Star, Trophy, Clock, Calendar } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TimeSlot {
  id: number;
  time: string;
  available: boolean;
}

interface Expert {
  id: number;
  name: string;
  title: string;
  rating: number;
  reviews: number;
  expertise: string[];
  bio: string;
  image: string;
  timeSlots: {
    [date: string]: TimeSlot[];
  };
}

interface ExpertDetailCardProps {
  expert: Expert;
}

export const ExpertDetailCard: React.FC<ExpertDetailCardProps> = ({ expert }) => {
  const [selectedDate, setSelectedDate] = useState<string>(Object.keys(expert.timeSlots)[0]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(expert.timeSlots[selectedDate]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setTimeSlots(expert.timeSlots[date]);
  };

  const handleBooking = (slotId: number) => {
    setTimeSlots((prevSlots) =>
      prevSlots.map((slot) =>
        slot.id === slotId ? { ...slot, available: false } : slot
      )
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to experts
        </Link>

        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          <Image
            src={expert.image}
            alt={expert.name}
            width={300}
            height={400}
            className="rounded-lg w-full object-cover"
          />

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{expert.name}</h1>
              <p className="text-xl text-muted-foreground mt-1">{expert.title}</p>
            </div>

            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{expert.rating}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{expert.reviews} reviews</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {expert.expertise.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className='border-2 border-primary/20'
                >
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex items-start space-x-2">
              <Trophy className="h-5 w-5 mt-1 text-muted-foreground" />
              <p className="text-muted-foreground">{expert.bio}</p>
            </div>

            <div className="flex items-center space-x-2 text-muted-foreground">
              <Clock className="h-5 w-5" />
              <span>60 minute session</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <h2 className="flex items-center space-x-2 text-xl font-semibold">
              <Calendar className="h-5 w-5" />
              <span>Select a date:</span>
            </h2>
            <div className="flex space-x-2">
              {Object.keys(expert.timeSlots).map((date) => (
                <Button
                  key={date}
                  variant={date === selectedDate ? "default" : "outline"}
                  onClick={() => handleDateChange(date)}
                >
                  {format(parseISO(date), "MMM d")}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {timeSlots.map((slot) => (
              <Button
                key={slot.id}
                variant={slot.available ? "default" : "outline"}
                className={cn(
                  "h-16 text-lg",
                  !slot.available && "opacity-50 cursor-not-allowed"
                )}
                disabled={!slot.available}
                onClick={() => slot.available && handleBooking(slot.id)}
              >
                {slot.time}
                {!slot.available && (
                  <span className="block text-sm font-normal">Booked</span>
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

