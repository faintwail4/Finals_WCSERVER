import { reactive } from 'vue';

const initialDaysData = [
  {
    id: 1,
    abbvTitle: 'Mon',
    fullTitle: 'Monday',
    active: true,
    events: [
      { id: 101, details: 'Get Groceries', edit: false },
      { id: 102, details: 'Team Standup', edit: false }
    ]
  },
  { id: 2, abbvTitle: 'Tue', fullTitle: 'Tuesday', active: false, events: [] },
  { id: 3, abbvTitle: 'Wed', fullTitle: 'Wednesday', active: false, events: [] },
  { id: 4, abbvTitle: 'Thu', fullTitle: 'Thursday', active: false, events: [] },
  { id: 5, abbvTitle: 'Fri', fullTitle: 'Friday', active: false, events: [] },
  { id: 6, abbvTitle: 'Sat', fullTitle: 'Saturday', active: false, events: [] },
  { id: 7, abbvTitle: 'Sun', fullTitle: 'Sunday', active: false, events: [] }
];

export const store = {
  state: reactive({
    data: initialDaysData
  }),

  getActiveDay() {
    return this.state.data.find((day) => day.active);
  },

  setActiveDay(dayId) {
    this.state.data.forEach((day) => {
      day.active = day.id === dayId;
    });
  },

  submitEvent(eventDetails) {
    const activeDay = this.getActiveDay();
    if (!activeDay) return;

    activeDay.events.push({
      id: Date.now(),
      details: eventDetails,
      edit: false
    });
  },

  editEvent(dayId, eventId) {
    this.resetEditStatus();
    const dayObj = this.state.data.find((day) => day.id === dayId);
    const eventObj = dayObj.events.find((event) => event.id === eventId);
    if (eventObj) eventObj.edit = true;
  },

  updateEvent(dayId, eventId, newDetails) {
    const dayObj = this.state.data.find((day) => day.id === dayId);
    const eventObj = dayObj.events.find((event) => event.id === eventId);
    if (eventObj) {
      eventObj.details = newDetails;
      eventObj.edit = false;
    }
  },

  deleteEvent(dayId, eventId) {
    const dayObj = this.state.data.find((day) => day.id === dayId);
    const eventIndex = dayObj.events.findIndex((event) => event.id === eventId);
    if (eventIndex !== -1) {
      dayObj.events.splice(eventIndex, 1);
    }
  },

  resetEditStatus() {
    this.state.data.forEach((day) => {
      day.events.forEach((event) => {
        event.edit = false;
      });
    });
  }
};