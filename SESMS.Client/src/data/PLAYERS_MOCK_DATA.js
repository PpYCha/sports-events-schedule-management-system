import { faker } from "@faker-js/faker";
import { sample } from "lodash";

export const playersData = [...Array(1000)].map((_, index) => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  gender: sample(["Female", "Male"]),
  college: faker.image.avatar(),
  course: faker.internet.password(),

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
  course: sample([
    "Bachelor of Physical Education",
    "Bachelor of Elementary Education – Home Economic",
    "Bachelor of Science in Biology",
    "Bachelor of Science in Chemistry",
    "Bachelor of Science in Environmental Science",
    "Doctor Veterinary Medicine",
    "Bachelor of Science in Meat Technology",
    "Bachelor of Science in Automotive Technology",
    "Bachelor of Technician Education",
    "Bachelor of Science in Hospitality Management ",
    "Bachelor of Science in Entrepreneurship",
    "Bachelor of Science in Hotel and Restaurant Management",
  ]),
}));
