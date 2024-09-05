export type Flights = Flight[];

export type Flight = {
    id: number;
    airline: string;
    departure: string;
    arrival: string;
    time: string;
    duration: string;
    price: number;
};