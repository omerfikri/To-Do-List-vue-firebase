<template>
  <div v-if="hataDocument" class="error">{{ hataDocument }}</div>
  <div v-if="job" class="work-details">
    <div class="work-info">
      <div class="image">
        <img :src="job.imageUrl" alt="" />
      </div>
      <h2>{{ job.title }}</h2>
      <p class="username">{{ job.userName }}</p>
      <p class="description">{{ job.description }}</p>
    </div>
    <div class="work-list">
      <h2>Work Stages</h2>
      <JobStageCreate v-if="kullanicijob" :job="job" />
      <div class="work-list">
        <div v-if="!job.stepsOfList.length" class="noJob">No Job Yet</div>
        <div v-else>
          <div
            v-for="step in job.stepsOfList"
            :key="step.id"
            class="single-work"
          >
            <div class="details">
              <h3 style="color: white">{{ step.jobStage }}</h3>
            </div>
            <button v-if="kullanicijob" @click="handleClick(step.id)">
              Delete
            </button>
          </div>
        </div>
      </div>
      <button v-if="kullanicijob" @click="handleDelete">Delete Job</button>
    </div>
  </div>
</template>

<script>
  import getDocument from "@/composables/getDocument";
  import getUser from "@/composables/getUser";
  import useDocument from "@/composables/useDocument";
  import useStorage from "@/composables/useStorage";
  import { computed } from "vue";
  import { useRouter } from "vue-router";
  import JobStageCreate from "@/components/JobStageCreate.vue";

  export default {
    props: ["id"],
    components: {
      JobStageCreate,
      JobStageCreate,
    },
    setup(props) {
      const router = useRouter();
      const { hataDocument, docs: job } = getDocument("lists", props.id);

      const { kullanici } = getUser();

      const { hata, deleteDocument, updateDocument } = useDocument(
        "lists",
        props.id
      );
      const { deleteImage } = useStorage();

      const kullanicijob = computed(() => {
        return (
          job.value &&
          kullanici.value &&
          kullanici.value.uid == job.value.userId
        );
      });

      const handleDelete = async () => {
        await deleteImage(job.value.filePath);
        await deleteDocument();
        router.push({ name: "Home" });
      };

      const handleClick = async (id) => {
        const stepsOfList = job.value.stepsOfList.filter(
          (step) => step.id != id
        );

        updateDocument({ stepsOfList });
      };

      return { hataDocument, job, kullanicijob, handleDelete, handleClick };
    },
  };
</script>

<style scoped>
  .noJob {
    color: white;
    margin-bottom: 10px;
  }
</style>
