<template>
  <div class="calendar-week">
    <CalendarDay
      v-for="day in sharedState.data"
      :key="day.id"
      :day="day"
    />
  </div>
</template>

<script>
import { store } from '../store.js';
import CalendarDay from './CalendarDay.vue';

export default {
  name: 'CalendarWeek',
  components: { CalendarDay },
  data() {
    return {
      sharedState: store.state
    };
  }
};
</script>

<style scoped>
.calendar-week {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 12px;
}
</style>