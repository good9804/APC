<template>
  <div class="flex-wrap p-2 sm:ml-64">
    <div
      class="p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
    >
      <div class="max-w-[48rem] min-w-[18rem] mx-auto">
        <div class="grid grid-row-3">
          <label
            for="default"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >문의</label
          >
          <select
            id="default"
            v-model="counsel.counsel_item"
            class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="제품">제품</option>
            <option value="배송">배송</option>
            <option value="기타">기타</option>
          </select>

          <div class="mb-6">
            <label
              for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >문의 제목</label
            >
            <input
              type="text"
              v-model="counsel.counsel_title"
              id="default-input"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div
            class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          >
            <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
              <label for="comment" class="sr-only">Your comment</label>
              <textarea
                id="comment"
                v-model="counsel.counsel_content"
                rows="4"
                class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                placeholder="문의 사항을 적어주세요..."
                required
              ></textarea>
            </div>
          </div>
          <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="signUp"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counsel: {
        counsel_item: "대분류",
        counsel_title: "제목",
        counsel_content: "내용",
      },
    };
  },
  methods: {
    signUp: function () {
      this.$axios
        .post("/product/api/counsel/upload", {
          userid: this.$store.getters.getUserId,
          counsel: this.counsel,
        })
        .then((res) => {
          if (res.data.success == true) {
            alert(res.data.message);
          }
          if (res.data.success == false) {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>

<style></style>
