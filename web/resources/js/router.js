import { createRouter, createWebHistory } from "vue-router";
import PhotoList from "./pages/PhotoList.vue";
import Login from "./pages/Login.vue";
import store from "./store";

const routes = [
    {
        path: "/",
        component: PhotoList,
    },
    {
        path: "/login",
        component: Login,
    },
    // Laravel側が存在しないパスを入力するとPhotoListに飛ぶ仕様なので念のため統一
    {
        path: "/:catchAll(.*)",
        component: PhotoList,
    },
    {
        // ログインしていればトップページに切り替え、ログインしていなければそのままログインページを表示
        path: "/login",
        component: Login,
        beforeEnter(to, from, next) {
            if (store.getters["auth/check"]) {
                next("/");
            } else {
                next();
            }
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
