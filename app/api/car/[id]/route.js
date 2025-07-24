import { NextResponse } from 'next/server';
import { dummyCars } from '@/app/lib/data/car';

export async function GET(request, context) {
  const { id } = context.params;
  const carId = parseInt(id);
  const car = dummyCars.find((car) => car.id === carId);

  if (!car) {
    return NextResponse.json({ error: 'Car not found' }, { status: 404 });
  }

  return NextResponse.json(car);
}