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
            >입고 품목</label
          >
          <select
            id="default"
            v-model="product.item"
            class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
          <option value="사과">사과</option>
          <option value="토마토">토마토</option>
          <option value="포도">포도</option>
          <option value="참다래">참다래</option>
          <option value="파프리카">파프리카</option>
          <option value="딸기">딸기</option>
          </select>

          <label
            for="default"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >입고 품종</label
          >
          <select
          v-if="product.item === '품목'"
          id="default"
          v-model="product.kind"
          class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value=""></option>
        </select>
          <select
           v-if="product.item === '사과'"
            id="default"
            v-model="product.kind"
            class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="쓰가루">쓰가루</option>
            <option value="홍로">홍로</option>
            <option value="양광">양광</option>
            <option value="후지">후지</option>
            <option value="기타">기타</option>
          </select>
          <select
           v-if="product.item === '토마토'"
            id="default"
            v-model="product.kind"
            class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="적색계">적색계</option>
            <option value="도색계">도색계</option>
  
          </select>
          <select
          v-if="product.item === '포도'"
            id="default"
            v-model="product.kind"
            class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="캠벨얼리">캠벨얼리</option>
            <option value="거봉">거봉</option>
            <option value="머루">머루</option>
          </select>
          <select
          v-if="product.item === '참다래'"
            id="default"
            v-model="product.kind"
            class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="골드">골드</option>
            <option value="레드">레드</option>
            <option value="그린">그린</option>
          </select>
          <select
          v-if="product.item === '파프리카'"
            id="default"
            v-model="product.kind"
            class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="하계작형">하계작형</option>
            <option value="동계작형">동계작형</option>
          </select>
          <select
          v-if="product.item === '딸기'"
            id="default"
            v-model="product.kind"
            class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="매향">매향</option>
            <option value="설향">설향</option>
            <option value="금향">금향</option>
            <option value="킹스베리">킹스베리</option>
            <option value="아리향">아리향</option>
          </select>

          <label
            for="default"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >박스 색상</label
          >
          <select
            id="default"
            v-model="product.boxcolor"
            class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="초록">초록</option>
            <option value="노랑">노랑</option>
            <option value="빨강">빨강</option>
            <option value="하양">하양</option>
            <option value="기타">기타</option>
          </select>

          <div class="mb-6">
            <label
              for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >박스 무게(단위:Kg)</label
            >
            <input
              type="text"
              v-model="product.kg"
              id="default-input"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div class="mb-6">
            <label
              for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >수량(단위:Box)</label
            >
            <input
              type="text"
              v-model="product.quantity"
              id="default-input"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <label
            for="default-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >총 무게 : {{ product.kg * product.quantity }}Kg</label
          >
        </div>
        <div
          class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
        >
          <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label for="comment" class="sr-only">Your comment</label>
            <textarea
              id="comment"
              v-model="product.others"
              rows="4"
              class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="추가 문의 사항을 적어주세요..."
              required
            ></textarea>
          </div>
        </div>
        <button
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="signUp"
        >
          입고
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {
        item: "품목",
        kind: "품종",
        boxcolor: "색상",
        kg: 1,
        quantity: 1,
        others: "",
      },
    };
  },
  methods: {
    signUp: function () {
      this.$axios
        .post("/product/api/import/upload", {
          user_id: this.$store.getters.getUserId,
          product: this.product,
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
