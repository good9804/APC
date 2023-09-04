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
            <p class="text-3xl text-center font-bold">저장고 편집 </p>
          </div>
          <div>
            <div class="gap-5 grow h-min">
              <div
                class="p-4 bg-white border rounded-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-5"
              >
                  <div id="import" class="relative sm:rounded-lg">
                    <div class="grid grid-row-3 py-6">
                      <div class="mb-6">
                        <label
                          for="default-input"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Zone number</label
                        >
                        <input
                          type="text"
                          v-model="new_zone_info.zone_number"
                          id="default-input"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>

                      <div class="mb-6">
                        <label
                          for="default-input"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Sector number</label
                        >
                        <input
                          type="text"
                          v-model="new_zone_info.sector_number"
                          id="default-input"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>

                      <label
                        for="default"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >품질</label
                      >
                      <select
                        id="default"
                        v-model="new_zone_info.grade"
                        class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="가공">가공</option>
                      </select>

                      <div class="flex flex-row">
                        <div class="inline-flex items-center px-3 py-2">
                          <div class="mb-6">
                            <button
                              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              @click="onUploadStorage"
                            >
                              추가
                            </button>
                          </div>

                          <div class="mb-6">
                            <button
                              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              @click="onDeleteStorage"
                            >
                              삭제
                            </button>
                          </div>

                          <div class="mb-6">
                            <button
                              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              @click="onUpdateStorage"
                            >
                              변경
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                

               
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      import_zone_info: {
        zone_number: 0,
        sector: {
          sector_number: 0,
          pallet: {
            item: "",
            quantity: 0,
          },
        },
      },
      sector_number: [],
      new_zone_info: {
        zone_number: 0,
        sector_number: 0,
        grade: "",
      },
      all_storage_info: [],
      export_storage_info: {
        zone_number: 0,
        sector_number: 0,
        quantity: 0,
      },
      select_export_storage_info: [],
      export_pallet_info: {
        zone_number: 0,
        sector_number: 0,
      },
      userEditMode: "",
      showPopup: false,
      rfidTagNumber: '',
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
    getStorageInfo() {
      this.$axios
        .get("/dashboard/storage/api/view", {})
        .then((res) => {
          this.all_storage_info = res.data.storage_info;
          console.log(this.all_storage_info);
          var max_count = 0;
          this.all_storage_info.forEach((element) => {
            if (max_count < element.sector.length) {
              this.sector_number = [];
              element.sector.forEach((element) => {
                this.sector_number.push(element.sector_number);
              });
              max_count = element.sector.length;
            }
          });
        })
        .catch((err) => {
          alert(err);
        });
    },

    onImportStorage() {
      this.$axios
        .post("/dashboard/storage/api/import", {
          zone_info: this.import_zone_info,
        })
        .then((res) => {
          if (res.data.success == true) {
            this.all_storage_info = res.data.storage_info;
          }
          alert(res.data.message);
        })
        .catch((err) => {
          alert(err);
        });
    },
    onUploadStorage() {
      this.$axios
        .post("/dashboard/storage/api/upload", {
          new_zone_info: this.new_zone_info,
        })
        .then((res) => {
          if (res.data.success == true) {
            this.all_storage_info = res.data.storage_info;
          }
          alert(res.data.message);
        })
        .catch((err) => {
          alert(err);
        });
    },
    onUpdateStorage() {
      this.$axios
        .post("/dashboard/storage/api/update", {
          new_zone_info: this.new_zone_info,
        })
        .then((res) => {
          if (res.data.success == true) {
            this.all_storage_info = res.data.storage_info;
          }
          alert(res.data.message);
        })
        .catch((err) => {
          alert(err);
        });
    },
    onDeleteStorage() {
      this.$axios
        .post("/dashboard/storage/api/delete", {
          new_zone_info: this.new_zone_info,
        })
        .then((res) => {
          console.log("vue");
          console.log(this.new_zone_info.sector_number);
          console.log(this.new_zone_info.zone_number);
          if (res.data.success == true) {
            this.all_storage_info = res.data.storage_info;
          }
          alert(res.data.message);
        })
        .catch((err) => {
          alert(err);
        });
    },
    onExportStorage() {
      this.$axios
        .post("/dashboard/storage/api/export", {
          zone_number: this.export_storage_info.zone_number,
          sector_number: this.export_storage_info.sector_number,
          quantity: this.export_storage_info.quantity,
        })
        .then((res) => {
          if (res.data.success == true) {
            this.all_storage_info = res.data.storage_info;
          }
          alert(res.data.message);
        })
        .catch((err) => {
          alert(err);
        });
    },
    selectExportStorage() {
      this.$axios
        .post("/dashboard/storage/api/select/export", {
          zone_number: this.export_storage_info.zone_number,
          sector_number: this.export_storage_info.sector_number,
        })
        .then((res) => {
          if (res.data.success == true) {
            res.data.sector_info.pallet.forEach((element) => {
              element["createdAt"] = this.formatDate(element["createdAt"]);
              this.export_pallet_info.zone_number =
                this.export_storage_info.zone_number;
              this.export_pallet_info.sector_number =
                this.export_storage_info.sector_number;
              element["order_quantity"] = 0;
            });
            this.select_export_storage_info = res.data.sector_info;
          }
          alert(res.data.message);
          console.log(this.select_export_storage_info);
        })
        .catch((err) => {
          alert(err);
        });
    },
    formatDate(date) {
      var d = new Date(date);
      var month = "" + (d.getMonth() + 1);
      var day = "" + d.getDate();
      var year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      var date_1 = [year, month, day].join("-");

      var hour = d.getHours().toString();
      var minute = d.getMinutes().toString();
      var second = d.getSeconds().toString();

      if (hour.length < 2) hour = "0" + hour;
      if (minute.length < 2) minute = "0" + minute;
      if (second.length < 2) second = "0" + second;

      var date_2 = [hour, minute, second].join(":");
      return date_1 + " " + date_2;
    },
    async ExportStorage(pallet_info) {
      this.showPopup = true;

      // Create a Promise to handle he popup input
      const rfidTagPromise = new Promise((resolve) => {
        this.submitRFID = () => {
          resolve(this.rfidTagNumber); // Resolve the Promise with the entered RFID tag number
        };
      });
      // Wait for the Promise to be resolved (i.e., the user submits the RFID tag number)
      this.rfidTagNumber = await rfidTagPromise;
      this.$axios
        .post("/dashboard/storage/api/export", {
          zone_number: this.export_pallet_info.zone_number,
          sector_number: this.export_pallet_info.sector_number,
          item: pallet_info.item,
          quantity: pallet_info.order_quantity,
          time: pallet_info.updatedAt,
        })
        .then((res) => {
          if (res.data.success == true) {
            res.data.sector_info.pallet.forEach((element) => {
              element["createdAt"] = this.formatDate(element["createdAt"]);
              element["order_quantity"] = 0;
            });
            this.select_export_storage_info = res.data.sector_info;
          }
          alert(res.data.message);
          console.log(this.select_export_storage_info);
        })
        .catch((err) => {
          alert(err);
        });

    this.rfidTagNumber = '';
      this.showPopup = false;
    },
    closePopup() {
    // 팝업을 닫기 위해 팝업 노출 여부를 false로 설정
    this.showPopup = false;
  },
  submitRFID() {
      console.log('Entered RFID Tag Number:', this.rfidTagNumber);
      this.rfidTagNumber = '';
      this.closePopup();
    },
  },
  created() {
  const mode = this.$route.query.mode;
  this.userEditMode = mode || "manageImportMode"; // 기본 값은 "manageImportMode"로 설정
  this.getStorageInfo(); // 쿼리 파라미터를 읽은 후에 데이터를 불러오도록 위치 변경
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
