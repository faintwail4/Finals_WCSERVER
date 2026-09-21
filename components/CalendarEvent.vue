<template>
  <div class="event-card">
    <div v-if="!event.edit" class="event-content">
      <span class="event-text">{{ event.details }}</span>
      <div class="event-actions">
        <button class="icon-btn" title="Edit Event" @click="editEvent">✏️</button>
        <button class="icon-btn" title="Delete Event" @click="deleteEvent">🗑️</button>
      </div>
    </div>

    <div v-else class="event-content-edit">
      <input
        type="text"
        v-model="newEventDetails"
        @keyup.enter="updateEvent"
        @keyup.esc="cancelEdit"
        class="edit-input"
      />
      <button class="icon-btn" @click="updateEvent">✔️</button>
    </div>
  </div>
</template>

<script>
import { store } from '../store.js';

export default {
  name: 'CalendarEvent',
  props: {
    event: { type: Object, required: true },
    day: { type: Object, required: true }
  },
  data() {
    return {
      newEventDetails: this.event.details
    };
  },
  methods: {
    editEvent() {
      store.editEvent(this.day.id, this.event.id);
    },
    updateEvent() {
      if (this.newEventDetails.trim() === '') return;
      store.updateEvent(this.day.id, this.event.id, this.newEventDetails);
    },
    cancelEdit() {
      store.resetEditStatus();
      this.newEventDetails = this.event.details;
    },
    deleteEvent() {
      store.deleteEvent(this.day.id, this.event.id);
    }
  }
};
</script>

<style scoped>
.event-card {
  background-color: #2c3e50;
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 6px;
  margin-bottom: 8px;
}
.event-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.icon-btn {
  background: transparent;
  border: none;
  cursor: pointer;
}
.edit-input {
  width: 100%;
  padding: 4px 8px;
  border-radius: 4px;
}
</style>