import { faker } from "@faker-js/faker";
import { sample } from "lodash";

export const teamsData = [...Array(1000)].map((_, index) => ({
  teamName: faker.person.firstName(),
  sportsEvent: sample([
    "Basketball",
    "Table Tennis",
    "Volleyball",
    "Chess",
    "Swimming",
    "Sipak Takraw",
    "Running",
    "Shot put",
  ]),
  manager: faker.person.fullName(),
  teamColor: faker.vehicle.color(),
  college: sample([
    "College of Education",
    "College of Engineering",
    "College of Nursing and Allied Health Science",
    "College of Science",
    "College of Veterinary Medicine",
    "College of Law",
    "College of Business Administration",
    "College of Agriculture",
    "College of Arts and Communication",
  ]),
}));

export const venuesData = [...Array(1000)].map((_, index) => ({
  venue: sample([
    "UEP Amphiteater",
    "UEP Gymnasium",
    "UEP Field",
    "UEP Tennis Court",
    "UEP Basketball Court",
    "UEP Whitebeach",
    "UEP Volleyball Court",
  ]),
  location: faker.location.city(),
}));

export const sportsEventData = [...Array(1000)].map((_, index) => ({
  sportEventName: sample([
    "Basketball",
    "Table Tennis",
    "Volleyball",
    "Chess",
    "Swimming",
    "Sipak Takraw",
    "Running",
    "Shot put",
  ]),
  facilatator: faker.person.fullName(),
  location: faker.location.city(),
  venue: sample([
    "UEP Amphiteater",
    "UEP Gymnasium",
    "UEP Field",
    "UEP Tennis Court",
    "UEP Basketball Court",
    "UEP Whitebeach",
    "UEP Volleyball Court",
  ]),
  numberOfParticipants: faker.number.int({ min: 10, max: 100 }),
}));

export const scheduleData = [...Array(1000)].map((_, index) => ({
  sportEventName: sample([
    "Basketball",
    "Table Tennis",
    "Volleyball",
    "Chess",
    "Swimming",
    "Sipak Takraw",
    "Running",
    "Shot put",
  ]),
  venue: sample([
    "UEP Amphiteater",
    "UEP Gymnasium",
    "UEP Field",
    "UEP Tennis Court",
    "UEP Basketball Court",
    "UEP Whitebeach",
    "UEP Volleyball Court",
  ]),
  startDate: faker.date.birthdate().toString(),
  startTime: sample(["8:00am", "9:00am", "10:00am"]),
  endDate: faker.date.birthdate().toString(),
  endTime: sample(["3:00am", "4:00am", "5:00am"]),
}));
