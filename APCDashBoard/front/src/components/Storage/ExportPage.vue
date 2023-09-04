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
              <p class="text-3xl text-center font-bold">출고 관리</p>
            </div>
            <div>
              <div class="gap-5 grow h-min">
                <div
                  class="p-4 bg-white border rounded-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-5"
                >
                    <div id="export" class="relative sm:rounded-lg">
                      <div class="flex flex-col">
                        <div class="flex flex-row">
                          <div class="m-auto">
                            <div class="flex flex-row">
                              <div class="items-center px-3 py-2">
                                <select
                                  id="Zone"
                                  v-model="export_storage_info.zone_number"
                                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                  <option
                                    v-for="storage_info in all_storage_info"
                                    :key="storage_info.idx"
                                    :value="storage_info.zone_number"
                                  >
                                    {{ storage_info.zone_number }}
                                  </option>
                                </select>
                              </div>
                              <div class="items-center px-3 py-2">
                                <select
                                  id="Sector"
                                  v-model="export_storage_info.sector_number"
                                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                  <option
                                    v-for="sector_info in sector_number"
                                    :key="sector_info.idx"
                                    :value="sector_info"
                                  >
                                    {{ sector_info }}
                                  </option>
                                </select>
                              </div>
  
                              <div class="items-center px-3 py-2">
                                <button
                                  @click="selectExportStorage"
                                  class="relative inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                  선택
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
  
                        <div class="px-12 block w-full">
                          <div
                            v-for="pallet_info in select_export_storage_info.pallet"
                            :key="pallet_info.idx"
                            class="inline-flex"
                          >
                            <div
                              class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                            >
                              <div class="flex flex-col">
                                <div class="inline-flex items-center px-3 py-2">
                                  <h5
                                    class="mb-2 px-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                                  >
                                    원물 : {{ pallet_info.item }}
                                  </h5>
                                </div>
                                <div class="inline-flex items-center px-3 py-2">
                                  <h5
                                    class="mb-2 px-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                                  >
                                    수량(단위:Box) :
                                    {{
                                      pallet_info.quantity -
                                      pallet_info.order_quantity
                                    }}
                                  </h5>
                                </div>
                                <div class="inline-flex items-center px-3 py-2">
                                  <h5
                                    class="mb-2 px-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                                  >
                                    시간 : {{ pallet_info.createdAt }}
                                  </h5>
                                </div>
  
                                <div
                                  class="m-auto inline-flex flex-row items-center px-3 py-2"
                                >
                                  <input
                                    type="text"
                                    v-model="pallet_info.order_quantity"
                                    id="default-input"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-l rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  />
                                  <button
                                    @click="ExportStorage(pallet_info)"
                                    class="relative inline-flex items-center px-5 py-2.5 text-l font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                  >
                                    저장고 출고
                                  </button>
                                </div>
                                <div v-if="showPopup" class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                                  <!-- 팝업 내용 -->
                                  <div class="bg-white p-5 rounded-lg shadow-lg">
                                    <!-- 팝업 내용을 표시할 부분 -->
                                    <p>RFID 태그번호를 입력해주세요.</p>
                                    <input type="text" v-model="rfidTagNumber" class="mt-2 px-3 py-1 border border-gray-300 rounded" placeholder="RFID 태그번호 입력">
                                    <!-- 팝업 내용 끝 -->
                                    <button @click="submitRFID" class="mt-4 px-3 py-1 text-white bg-blue-500 rounded">입력</button>
                                    <button @click="closePopup" class="mt-4 px-3 py-1 text-white bg-red-500 rounded">취소</button>
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

            this.$router.push('/dashboard/view/storage');
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
  