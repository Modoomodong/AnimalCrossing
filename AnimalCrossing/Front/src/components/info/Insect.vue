<template>
  <div>
    <v-text-field
      v-model="searchText"
      @keyup="filter"
      solo-inverted
      flat
      hide-details
      label="Search"
      class="nav-search"
    ></v-text-field>
    <!-- <div class="dogam">곤충 도감</div> -->
    <div class="insectCards">
      <infoCard
        v-for="infoCard in selectedCards"
        :key="infoCard.id"
        :infoCard="infoCard"
        :routePath="routePath"
      />
    </div>
  </div>
</template>

<script>
import { getInsects } from "@/api/info.js";
import infoCard from "./infoCard.vue";

export default {
  name: "insect",
  components: {
    infoCard
  },
  data() {
    return {
      infoCards: [],
      routePath: this.$route.path,
      selectedCards: [],
      searchText: ""
    };
  },
  methods: {
    filter() {
      let check = this.infoCards.filter(
        infoCard => infoCard.name.indexOf(this.searchText.trim()) !== -1
      );
      this.selectedCards = check;
    }
  },
  async mounted() {
    this.infoCards = await getInsects(this.infoCards);
    this.selectedCards = this.infoCards;
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jua&display=swap");
.v-text-field {
  width: 300px;
  background-color: rgba(173, 204, 245, 0.322);
  margin-bottom: 10px;
  margin-left: 35%;
  margin-right: 35%;
}
.dogam {
  text-align: center;
  font-family: "Jua", sans-serif;
  color: rgb(9, 40, 71);
}

.insectCards {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: auto;
  grid-gap: 1rem 1rem;
  /* grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); */
}
@media (max-width: 1600px) {
  .insectCards {
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 1rem 0.4rem;
  }
}

@media (max-width: 1300px) {
  .insectCards {
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 1rem 0.4rem;
  }
}

@media (max-width: 1100px) {
  .insectCards {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem 0.4rem;
  }
}

@media (max-width: 900px) {
  .insectCards {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem 0rem;
  }
}

@media (max-width: 560px) {
  .insectCards {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem 0rem;
  }
}
</style>
