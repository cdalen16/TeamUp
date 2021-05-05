import { User } from './user';

export class Team {
  class: string;
  teamMembers: User[];
  teamName?: string;
  description: number;
  teamSize: number;
  teamCap: number;
  createdBy: User;
  createdDate: Date;
}
