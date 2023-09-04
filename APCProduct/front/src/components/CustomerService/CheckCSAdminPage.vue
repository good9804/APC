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
            날짜 : {{ selected_counsel_info.createdAt }} 유저 아이디 :
            {{ selected_counsel_info.counsel_id }}
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
                {{ selected_counsel_info.counsel_item }}
              </dd>
            </div>
            <div class="flex flex-col items-center justify-center">
              <dt class="mb-2 text-3xl font-extrabold">제목</dt>
              <dd class="text-xl text-gray-500 dark:text-white">
                {{ selected_counsel_info.counsel_title }}
              </dd>
            </div>
            <div class="flex flex-col items-center justify-center">
              <dt class="mb-2 text-3xl font-extrabold">내용</dt>
              <dd class="text-xl text-gray-500 dark:text-white">
                {{ selected_counsel_info.counsel_content }}
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
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >Search</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              v-model="searchId"
              id="default-search"
              class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Id로 검색"
              required
            />
          </div>
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
                    <button
                      v-on:click="checkOrder(counsel)"
                      class="relative text-2xl inline-flex items-center justify-center overflow-hidden text-2xl font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                    >
                      <span
                        class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                      >
                        상담내용작성
                      </span>
                    </button>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="showPopup" class="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50">
          <!-- 팝업 내용 -->
          <div v-for="counsel in counsel_list"
                  :key="counsel.idx"
                  class="bg-white p-5 rounded-lg shadow-lg" style="width: 400px; height: 300px;">
            <!-- 팝업 내용을 표시할 부분 -->
            <p>답변을 작성해주세요</p>
            <textarea v-model="new_counsel_answer" class="w-full h-40 mt-2 px-3 py-1 border border-gray-300 rounded" >
            </textarea>   
            <!-- 팝업 내용 끝 -->
            <div class="flex justify-end mt-4">
            <button @click="submitAnswer(counsel,new_counsel_answer)" class="px-3 py-1 text-white bg-blue-500 rounded">입력</button>
            <button @click="closePopup" class="ml-2 px-3 py-1 text-white bg-red-500 rounded">취소</button>
            </div>
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
      selected_counsel_info: {},
      date: new Date(),
      all_counsel_list: [],
      searchId: "",
      showPopup: false,
    };
  },
  mounted() {
    this.getcounselList();
  },
  methods: {
    getcounselList() {
      this.$axios
        .post("/product/api/counsel/view", {
          user_id: this.$store.getters.getUserId,
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
    viewCounsel(counsel_info) {
      this.selected_counsel_info = counsel_info;
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
    checkOrder(counsel_info) {
      this.showPopup=true;
      //상담체크
      this.$axios
        .post("/product/api/counsel/check", {
          user_id: this.$store.getters.getUserId,
          login_user_role: this.$store.getters.getUserRole,
          counsel_info: counsel_info,
        })
        .then((res) => {
          res.data.counsel_list.forEach((element) => {
            element["createdAt"] = this.formatDate(element["createdAt"]);
          });
          //this.counsel_list = res.data.counsel_list;
          //this.all_counsel_list = res.data.counsel_list;
        })
        .catch((err) => {
          alert(err);
        });
    },
    submitAnswer(counsel_info,new_counsel_answer){
      console.log('write new Answer', counsel_info)
      console.log('write new Answer', new_counsel_answer)
      this.$axios
        .post("/product/api/counsel/answer", {
          user_id: this.$store.getters.getUserId,
          counsel_answer:new_counsel_answer,
          counsel_info: counsel_info
        })
        .then((res) => {
          if (res.data.success == true) {
            alert(res.data.message);
          }
          if (res.data.success == false) {
            alert(res.data.message);
          }
        })
        .catch((err)=>{
          alert(err);
        }); 
      this.Answertext='';
      this.closePopup();
    },

    closePopup() {
    // 팝업을 닫기 위해 팝업 노출 여부를 false로 설정
    this.showPopup = false;
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
    searchId() {
      this.counsel_list = [];
      this.all_counsel_list.forEach((element) => {
        if (this.searchId == element["counsel_id"]) {
          this.counsel_list.push(element);
        }
      });
    },
  },
};
</script>

<style scoped></style>
