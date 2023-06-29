import { createRouter, createWebHistory } from "vue-router";
import PhotoList from "./pages/PhotoList.vue";
import Login from "./pages/Login.vue";
import store from "./store";
import SystemError from "./pages/errors/System.vue";
import PhotoDetail from "./pages/PhotoDetail.vue";

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
    {
        path: "/500",
        component: SystemError,
    },
    {
        path: "/photos/:id",
        component: PhotoDetail,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
