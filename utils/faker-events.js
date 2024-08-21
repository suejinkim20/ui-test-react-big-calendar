const fs = require('fs');
const path = require('path');

const eventsFilePath = path.join(__dirname, 'events.js');

const { faker } = require('@faker-js/faker');

function generateFakeEvent() {
  const timeZones = ["Eastern Standard Time", "Central Standard Time", "Pacific Standard Time"];
  const startDate = faker.date.between(new Date(), new Date('2024-12-10T23:59:59Z'));
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour later

  return {
	id: faker.datatype.uuid(),
	subject: faker.lorem.words(3),
	body: {
  	contentType: "HTML",
  	content: faker.lorem.paragraph(),
	},
	start: {
  	dateTime: startDate.toISOString(),
  	timeZone: faker.helpers.arrayElement(timeZones),
	},
	end: {
  	dateTime: endDate.toISOString(),
  	timeZone: faker.helpers.arrayElement(timeZones),
	},
	location: {
  	displayName: faker.company.name(),
  	locationType: faker.helpers.arrayElement(["conferenceRoom", "default"]),
  	uniqueIdType: "locationStore",
  	address: {
    	street: faker.address.streetAddress(),
    	city: faker.address.city(),
    	state: faker.address.stateAbbr(),
    	countryOrRegion: faker.address.countryCode(),
    	postalCode: faker.address.zipCode(),
  	},
  	coordinates: {
    	latitude: faker.address.latitude(),
    	longitude: faker.address.longitude(),
  	},
	},
	attendees: [
  	{
    	emailAddress: {
      	address: faker.internet.email(),
      	name: faker.person.fullName(),
    	},
    	type: "required",
  	},
  	{
    	emailAddress: {
      	address: faker.internet.email(),
      	name: faker.person.fullName(),
    	},
    		type: "optional",
  	},
	],
	organizer: {
  	emailAddress: {
    	address: faker.internet.email(),
    	name: faker.person.fullName(),
  	},
	},
	isOnlineMeeting: faker.datatype.boolean(),
	onlineMeeting: {
  		joinUrl: faker.internet.url(),
	},
	reminderMinutesBeforeStart: faker.datatype.number({ min: 5, max: 30 }),
	isReminderOn: faker.datatype.boolean(),
  };
}

const fakeEvents = faker.helpers.multiple(generateFakeEvent, { count: 5 });


const formatEvents =(events) => {
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

const mappedEvents = formatEvents(fakeEvents);

// Formatting the output as a JavaScript file
const output = `export const events = ${JSON.stringify(mappedEvents, null, 2)};`;

// Ensure the directory exists
fs.mkdirSync(path.dirname(eventsFilePath), { recursive: true });

// Writing the output to src/data/events.js
fs.writeFileSync(eventsFilePath, output, 'utf8');

console.log('events.js file has been generated at src/data/events.js');
