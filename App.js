const { createApp, ref, computed, watch, TransitionGroup } = Vue;

const app = createApp({
  components: {
    'submission-item': window.SubmissionItem,
    TransitionGroup
  },
  setup() {
    const defaultSubmissions = [
      {
        id: 1,
        title: 'Yellow Pail',
        description: 'On-demand sand castle construction materials.',
        url: '#',
        votes: 16,
        author: 'Daniel',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Daniel'
      },
      {
        id: 2,
        title: 'Super-Sized Paperclips',
        description: 'Because standard paperclips are simply too small.',
        url: '#',
        votes: 11,
        author: 'John',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=John'
      },
      {
        id: 3,
        title: 'Tinfoil Hat',
        description: 'Blocks high-frequency brain waves.',
        url: '#',
        votes: 9,
        author: 'Sarah',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Sarah'
      }
    ];

    const savedData = localStorage.getItem('upvote_submissions');
    const submissions = ref(savedData ? JSON.parse(savedData) : defaultSubmissions);

    // Form inputs state
    const showForm = ref(false);
    const newTitle = ref('');
    const newDescription = ref('');
    const newAuthor = ref('');
    const newUrl = ref('');

    watch(
      submissions,
      (newSubmissions) => {
        localStorage.setItem('upvote_submissions', JSON.stringify(newSubmissions));
      },
      { deep: true }
    );

    const sortedSubmissions = computed(() => {
      return [...submissions.value].sort((a, b) => b.votes - a.votes);
    });

    const handleVote = (submissionId) => {
      const target = submissions.value.find((sub) => sub.id === submissionId);
      if (target) {
        target.votes++;
      }
    };

    // Add new submission
    const addSubmission = () => {
      if (!newTitle.value || !newDescription.value || !newAuthor.value) return;

      const newEntry = {
        id: Date.now(), 
        title: newTitle.value,
        description: newDescription.value,
        url: newUrl.value || '#',
        votes: 1, 
        author: newAuthor.value,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(newAuthor.value)}`
      };

      submissions.value.push(newEntry);

      newTitle.value = '';
      newDescription.value = '';
      newAuthor.value = '';
      newUrl.value = '';
      showForm.value = false;
    };

    return {
      submissions,
      sortedSubmissions,
      handleVote,
      showForm,
      newTitle,
      newDescription,
      newAuthor,
      newUrl,
      addSubmission
    };
  }
});

app.mount('#app');