<template>
  <div class="entry-container">
    <div class="entry-card">
      <h3>Add Event for: <span class="active-day-label">{{ activeDayTitle }}</span></h3>

      <div class="form-group">
        <input
          type="text"
          placeholder="New Event Details..."
          v-model="inputEntry"
          @keyup.enter="submitEvent"
          :class="{ 'is-invalid': error }"
        />
        <button class="btn-submit" @click="submitEvent">Add</button>
      </div>

      <p v-if="error" class="error-msg">Please enter event details before submitting.</p>
    </div>
  </div>
</template>

<script>
import { store } from '../store.js';

export default {
  name: 'CalendarEntry',
  data() {
    return {
      inputEntry: '',
      error: false
    };
  },
  computed: {
    activeDayTitle() {
      const activeDay = store.getActiveDay();
      return activeDay ? activeDay.fullTitle : 'Select a Day';
    }
  },
  methods: {
    submitEvent() {
      if (this.inputEntry.trim() === '') {
        this.error = true;
        return;
      }

      store.submitEvent(this.inputEntry);
      this.inputEntry = '';
      this.error = false;
    }
  }
};
</script>

<style scoped>
.entry-container {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}
.entry-card {
  width: 100%;
  max-width: 500px;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.active-day-label {
  color: #42b983;
}
.form-group {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}
input[type="text"] {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
input.is-invalid {
  border-color: #e74c3c;
}
.btn-submit {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
.error-msg {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 8px;
}
</style>