window.SubmissionItem = {
  name: 'SubmissionItem',
  props: {
    submission: {
      type: Object,
      required: true
    },
    isTopVoted: {
      type: Boolean,
      default: false
    }
  },
  template: `
    <div class="submission-card" :class="{ 'top-voted': isTopVoted }">
      <div class="vote-section">
        <button class="upvote-btn" @click="upvote">▲</button>
        <span class="votes-count">{{ submission.votes }}</span>
      </div>

      <div class="details-section">
        <h3 class="title">
          <a :href="submission.url" target="_blank" rel="noopener noreferrer">
            {{ submission.title }}
          </a>
        </h3>
        <p class="description">{{ submission.description }}</p>
        <div class="meta-info">
          <span>
            Submitted by: 
            <img :src="submission.avatar" :alt="submission.author" class="avatar" />
            <strong>{{ submission.author }}</strong>
          </span>
        </div>
      </div>
    </div>
  `,
  methods: {
    upvote() {
      this.$emit('vote', this.submission.id);
    }
  }
};