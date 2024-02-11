<template>
  <div class="add-work">
    <button type="button" v-if="!form" @click="form = true">
      Create Job's Stage
    </button>
    <form v-if="form" @submit.prevent="handleSubmit">
      <h4>New Job's Stage</h4>
      <input
        type="text"
        placeholder="Job's Stage"
        required
        v-model="jobStage"
      />
      <button>Create</button>
    </form>
  </div>
</template>

<script>
  import { ref } from "vue";
  import useDocument from "@/composables/useDocument";

  export default {
    props: ["job"],
    setup(props) {
      const jobStage = ref(null);
      const form = ref(false);

      const { updateDocument } = useDocument("lists", props.job.id);

      const handleSubmit = async () => {
        const newJobStage = {
          jobStage: jobStage.value,
          id: Math.floor(Math.random() * 10000000),
        };

        const res = await updateDocument({
          stepsOfList: [...props.job.stepsOfList, newJobStage],
        });
        jobStage.value = null;
        form.value = false;
      };

      return { jobStage, form, handleSubmit };
    },
  };
</script>

<style scoped>
  .add-work {
    text-align: center;
    margin-top: 40px;
  }
  form {
    max-width: 100%;
    text-align: left;
  }
</style>
