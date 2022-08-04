export interface EventsModel {
  createDate: Date;
  endDate: Date;
  eventDate: Date;
  groupId: number;
  id: number;
  isActive: boolean;
  photo?: string;
  placeEvent: string;
  title: string;
  latitude?: string;
  longitude?: string;
  isNativeCalendar: boolean;
}
