<template>
    <div id="imagelist" class="relative max-h-96 overflow-y-scroll sm:rounded-lg">
        <table v-if="waiting_list.length !== 0" class="my-3 w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-2xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="text-center text-white py-3 px-6">
                        목록
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="waiting in waiting_list" :key="waiting.idx"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row"
                        class="py-4 px-6 text-2xl font-bold text-gray-900 text-center whitespace-nowrap dark:text-white">
                        유저 아이디 : {{ waiting["user_id"] }} 입고 신청 날짜 :
                        {{ waiting["createdAt"] }}
                        <button @click="input(waiting)"
                            class="bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                            <span
                                class="mr-2">
                                시작
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                         <path fill="currentcolor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                        </svg>
                        </button>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name: "WaitingInfo",
    components: {},
    data() {
        return {
            waiting_list: [],
            date: new Date(),
            all_waiting_list: [],
        };
    },
    mounted() {
        this.getWaitingList();
    },
    methods: {
        getWaitingList() {
            this.$axios
                .post("/product/api/import/inputview", {
                    user_id: this.$store.getters.getUserId,
                    login_user_role: this.$store.getters.getUserRole,
                })
                .then((res) => {
                    console.log(res.data);
                    res.data.waiting_list.forEach((element) => {
                        element["createdAt"] = this.formatDate(element["createdAt"]);
                    });
                    this.waiting_list = res.data.waiting_list;
                    this.all_waiting_list = res.data.waiting_list;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    
        viewProduct(productInfo) {
            this.selected_product = productInfo;
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
        input(waiting){
                this.$axios
                    .post("/product/api/import/input", {
                        user_id: this.$store.getters.getUserId,
                        product: waiting,

                    })
                    .then((res) => {
                        if (res.data.success == true) {
                            alert(res.data.message);
                            this.waiting_list
                            this.getWaitingList();
                        }
                        if (res.data.success == false) {
                            alert(res.data.message);
                        }
                        const currentUrl = window.location.href;
                        console.log(currentUrl);
                        let url=currentUrl.split('/');
                        console.log(url);
                        const changeurl=url[0]+'//'+url[2]+'/dashboard';
                        console.log(changeurl);
                        window.location.href=changeurl;
                    })
                    .catch((err) => {
                        alert(err);
                    });
            },
    },
    watch: {
        date() {
            this.waiting_list = [];
            this.all_waiting_list.forEach((element) => {
                if (this.formatDate(element.createdAt) == this.formatDate(this.date)) {
                    this.waiting_list.push(element);
                }
            });
            console.log(this.waiting_list);
        },
        searchId() {
            this.waiting_list = [];
            this.all_waiting_list.forEach((element) => {
                if (this.searchId == element["user_id"]) {
                    this.waiting_list.push(element);
                }
            });
        },
    },
};
</script>
 
<style scoped></style>