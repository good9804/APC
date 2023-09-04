<template>
  <div class="flex-wrap p-2 sm:ml-64">
    <div
      class="p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
    >
      <div
        class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div
          class="text-2xl font-bold text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-white"
          id="fullWidthTab"
        >
          <div
            id="stats-tab"
            class="inline-block w-full p-4 rounded-tl-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            날짜 : {{ selected_counsel_list.createdAt }} 유저 아이디 :
            {{ selected_counsel_list.counsel_id }}
          </div>
        </div>
        <div
          id="fullWidthTabContent"
          class="border-t border-gray-200 dark:border-gray-600"
        >
          <dl
            class="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-3 dark:text-white sm:p-8"
          >
            <div class="flex flex-col items-center justify-center">
              <dt class="mb-2 text-3xl font-extrabold">대분류</dt>
              <dd class="text-xl text-gray-500 dark:text-white">
                {{ selected_counsel_list.counsel_item }}
              </dd>
            </div>
            <div class="flex flex-col items-center justify-center">
              <dt class="mb-2 text-3xl font-extrabold">제목</dt>
              <dd class="text-xl text-gray-500 dark:text-white">
                {{ selected_counsel_list.counsel_title }}
              </dd>
            </div>
            <div class="flex flex-col items-center justify-center">
              <dt class="mb-2 text-3xl font-extrabold">내용</dt>
              <dd class="text-xl text-gray-500 dark:text-white">
                {{ selected_counsel_list.counsel_content }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div class="flex flex-row-2">
        <div
          class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <DatePicker v-model="date" mode="date" />
        </div>
        <div
          class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <div
            id="imagelist"
            class="relative max-h-96 overflow-y-scroll sm:rounded-lg"
          >
            <table
              v-if="counsel_list.length !== 0"
              class="my-3 w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-2xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th scope="col" class="text-center text-white py-3 px-6">
                    목록
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="counsel in counsel_list"
                  :key="counsel.idx"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    class="py-4 px-6 text-2xl font-bold text-gray-900 text-center whitespace-nowrap dark:text-white"
                  >
                    유저 아이디 : {{ counsel["counsel_id"] }} 신청 날짜 :
                    {{ counsel["createdAt"] }}
                    <button
                      v-on:click="viewCounsel(counsel)"
                      class="relative text-2xl inline-flex items-center justify-center overflow-hidden text-2xl font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                    >
                      <span
                        class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                      >
                        확인
                      </span>
                    </button>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductInfo",
  components: {},
  data() {
    return {
      counsel_list: [],
      selected_counsel_list: {},
      date: new Date(),
      all_counsel_list: [],
    };
  },
  mounted() {
    this.getcounselList();
  },
  methods: {
    getcounselList() {
      this.$axios
        .post("/product/api/counsel/view", {
          userid: this.$store.getters.getUserId,
          login_user_role: this.$store.getters.getUserRole,
        })
        .then((res) => {
          res.data.counsel_list.forEach((element) => {
            element["createdAt"] = this.formatDate(element["createdAt"]);
          });
          this.counsel_list = res.data.counsel_list;
          this.all_counsel_list = res.data.counsel_list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    viewCounsel(counselinfo) {
      this.selected_counsel_list = counselinfo;
    },
    formatDate(date) {
      var d = new Date(date);
      var month = "" + (d.getMonth() + 1);
      var day = "" + d.getDate();
      var year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
  },
  watch: {
    //vuex 변수의 값이 변함을 감지하는 곳
    date() {
      this.counsel_list = [];
      this.all_counsel_list.forEach((element) => {
        if (this.formatDate(element.createdAt) == this.formatDate(this.date)) {
          this.counsel_list.push(element);
        }
      });
      console.log(this.counsel_list);
    },
  },
};
</script>

<style scoped></style>
