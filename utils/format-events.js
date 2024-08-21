export const formatEvents =(events) => {
  return events.map(event => {
    return {
      id: event.id,
      title: event.subject,
      start: new Date(event.start.dateTime),
      end: new Date(event.end.dateTime),
      description: event.body && event.body.content ? event.body.content : '', // Check if body and body.content exist
      location: event.location.displayName,
      attendees: event.attendees.map(attendee => ({
        name: attendee.emailAddress.name,
        email: attendee.emailAddress.address,
        type: attendee.type
      })),
      organizer: {
        name: event.organizer.emailAddress.name,
        email: event.organizer.emailAddress.address
      },
      isOnlineMeeting: event.isOnlineMeeting,
      onlineMeetingUrl: event.isOnlineMeeting && event.onlineMeeting ? event.onlineMeeting.joinUrl : null, // Check if onlineMeeting exists
      reminderMinutesBeforeStart: event.reminderMinutesBeforeStart,
    };
  });
}