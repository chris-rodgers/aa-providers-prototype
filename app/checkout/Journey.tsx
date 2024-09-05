import Card from "@/components/Card";
import { Flight } from "@/types/Flights";

type JourneyProps = {
  title: string;
  flight: Flight;
};

export default function Journey({ title, flight }: JourneyProps) {
  return (
    <Card title={title}>
      <p>Price: ${flight.price}</p>
      <p>
        Route: {flight.departure} - {flight.arrival}
      </p>
      <p>
        Time: {flight.time} ({flight.duration})
      </p>
      <p>Airline: {flight.airline}</p>
    </Card>
  );
}
