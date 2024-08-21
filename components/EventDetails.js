import React from "react";
import { format } from "date-fns";

const EventDetails = ({ event }) => {
  return (
    <div>
      <h2>{event.title}</h2>
      <p><strong>Start:</strong> {format(new Date(event.start), "PPpp")}</p>
      <p><strong>End:</strong> {format(new Date(event.end), "PPpp")}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p>Attendees:</p>
      <ul>
      {event.attendees.map((attendee) => (
        <li>{attendee.name}</li>
      ))}

      </ul>
      <p>Description: {event.description}</p>
    </div>
  );
};

export default EventDetails;
