export interface Award {
  _id?: string;
  id?: number;
  title?: string;
  programmeName?: string;
  image?: string;
  imgUrl?: string;
  year: string;
  description: string;
  awardedBy?: string;
  dateOfProgramme?: string;
  createdAt?: string;
}

export interface Session {
  _id: string;
  year: string;
}