import { faker } from '@faker-js/faker';
import { Mappable } from './CustomMap.ts';

export class User implements Mappable {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  markerContent: () => string;
  color: string;

  constructor() {
    this.name = faker.person.firstName();

    this.location = {
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
    };

    this.markerContent = (): string => {
      return `Name: ${this.name}`;
    };
  }
}
