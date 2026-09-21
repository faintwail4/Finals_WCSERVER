<template>
  <div
    class="day-column"
    :class="{ 'is-active': day.active }"
    @click="setActiveDay"
  >
    <div class="day-header">
      <h3>{{ day.abbvTitle }}</h3>
      <span class="day-number">Day {{ day.id }}</span>
    </div>

    <div class="day-body">
      <CalendarEvent
        v-for="event in day.events"
        :key="event.id"
        :event="event"
        :day="day"
      />
    </div>
  </div>
</template>

<script>
import { store } from '../store.js';
import CalendarEvent from './CalendarEvent.vue';

export default {
  name: 'CalendarDay',
  components: { CalendarEvent },
  props: {
    day: { type: Object, required: true }
  },
  methods: {
    setActiveDay() {
      store.setActiveDay(this.day.id);
    }
  }
};
</script>

<style scoped>
.day-column {
  flex: 1;
  min-width: 130px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
  padding: 12px;
  cursor: pointer;
}
.day-column.is-active {
  border-color: #42b983;
  background-color: #f0fdf4;
  box-shadow: 0 0 0 2px #42b983;
}
.day-header {
  text-align: center;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 8px;
  margin-bottom: 12px;
}
</style>