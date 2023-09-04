<template>
    <div class="flex-wrap p-2 sm:ml-64">
  
      <div
        class="p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
      >
        <div class="gap-10 sticky top-0">
          <div class="flex flex-col gap-10">
            <!-- NOTE: list view -->
            <div
              class="text-gray-900 dark:text-white mb-5 pb-5 border-gray-600 border-b"
            >
              <p class="text-3xl text-center font-bold">매출 통계</p>
            </div>
            <div>
              <div class="gap-5 grow h-min">
                <div
                  class="p-4 bg-white border rounded-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-5"
                >
                    <div id="import" class="relative sm:rounded-lg">
                      <div class="grid grid-row-3 py-6">
                        <label
                          for="default"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >User_Code</label
                        >
                        <select
                          id="default"
                          v-model="select_usercode"
                          class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option
                            v-for="usercode in all_usercode_array"
                            :key="usercode"
                          >
                            {{ usercode }}
                          </option>
                        </select>
                        
                        <label
                          for="default"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >시작 날짜</label
                        >
                        <input type="date" v-model="startdate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                        <label
                          for="default"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >종료 날짜</label
                        >
                        <input type="date" v-model="enddate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <div class="mb-6">
                          <button
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            @click="onSelectUser"
                          >
                            조회
                          </button>

                          <button
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            @click="onGetSales"
                          >
                              기간 조회
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  
                </div>
              </div>
              <h5
                    class="mb-2 px-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                  >
                    유저 코드 : {{ select_usercode }}
                  </h5>
                  <h5
                    class="mb-2 px-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                  >
                    정산 총액(원) : {{ totalprice }}
                  </h5>
            </div>
            <div class="bg-white " width="600" height="600">
    <canvas id="myChart"></canvas>
  </div>
          </div>
        </div>
      </div>
  </template>
  
   <script>
//import 'chartjs-adapter-date-fns'; // date-fns 어댑터 import
import { Chart, registerables } from "chart.js";
Chart.register(...registerables,);
//import { format } from 'date-fns';

   export default {
     name: "app",
     data() {
        return {
  all_usercode: new Set(), // Set 인스턴스 생성
  all_usercode_array: [],
  select_usercode: 'K10507',
  salesMap: new Map(),// Map 인스턴스 생성
  totalprice:'',
  startdate:'2019-07-23',
  enddate:'2019-07-24',
  dateArray:'',
  saleArray:'',
  chartInstance:null,
};
     },
     methods: {
       toManageStorageMode() {
         this.userEditMode = "manageStorageMode";
       },
       toImportMode() {
         this.userEditMode = "manageImportMode";
       },
       toExportMode() {
         this.userEditMode = "manageExportMode";
       },
       getUserCode() {
         this.$axios
           .get("/product/api/statistics/view", {})
           .then((res) => {
             this.all_usercode = res.data.user_info;
             this.all_usercode_array = Array.from(this.all_usercode);
             console.log(this.all_usercode_array );
           })
           .catch((err) => {
             alert(err);
           });
       },
       onSelectUser() {
        console.log("usercode"+ this.select_usercode);
         this.$axios
           .post("/product/api/statistics/select", {
            usercode: this.select_usercode,
           })
           .then((res) => {
             this.totalprice = res.data.totalPrice;
             console.log(res.data.totalPrice);
             console.log(this.totalprice );
           })
           .catch((err) => {
             alert(err);
           });
       },
       onGetSales(){

        if (this.chartInstance !== null) {
    this.chartInstance.destroy();
    this.chartInstance = null; // Reset the chart instance reference
    console.log("destory1")
  }
        this.$axios
           .post("/product/api/statistics/salesview", {
            usercode: this.select_usercode,
            startdate: this.startdate,
            enddate: this.enddate,
           })
           .then((res) => {
            console.log("this.chartInstance");
             this.saleArray= res.data.saleArray;
             //this.dateArray = res.data.dateArray.map(date => format(new Date(date), 'yyyy-MM-dd'));
             this.dateArray = res.data.dateArray;
             this.dateArray.forEach(element => {
              console.log(element);
             });
             console.log(this.chartInstance);
            console.log("draw");
             this.drawChart();
           })
           .catch((err) => {
             alert(err);
           });
       },
       drawChart(){
        console.log("draw1");
        this.dateArray.forEach(element => {
              console.log(element);
             });
             this.saleArray.forEach(element => {
              console.log(element);
             });
        const ctx = document.getElementById('myChart').getContext('2d');
        console.log("Canvas element:", document.getElementById('myChart'));
        console.log("ctx element:", document.getElementById('myChart').getContext('2d'));
        this.chartInstance=null;
  this.chartInstance=new Chart(ctx, {
    type: 'line',
    data: {
      labels: this.dateArray,
      datasets: [
        {
          label: 'Sales',
          data: this.saleArray,
          borderColor: 'blue',
          fill: false
        }
      ]
    },
    options: {
      scales: {
    x: {
        type: 'category', // 'time' 대신 'linear'
        title: {
          display: true,
          text: 'Date'
        }
      },
    y: {
      title: {
        display: true,
        text: 'Value'
      }
    }
  }
}
  });
       },

     },
     created() {
     const mode = this.$route.query.mode;
     this.userEditMode = mode || "manageImportMode"; // 기본 값은 "manageImportMode"로 설정
     this.getUserCode(); // 쿼리 파라미터를 읽은 후에 데이터를 불러오도록 위치 변경
     this.$router.beforeEach((to, from, next) => {
         if (to.query.mode !== mode) {
           // 파라미터값이 변경된 경우 페이지 리로딩
           location.reload();
         } else {
           next(); // 이동 허용
         }
       });
     },
     watch: {},
   };
   </script>
   