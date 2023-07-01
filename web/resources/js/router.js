import { createRouter, createWebHistory } from "vue-router";
import PhotoList from "./pages/PhotoList.vue";
import Login from "./pages/Login.vue";
import store from "./store";
import SystemError from "./pages/errors/System.vue";
import PhotoDetail from "./pages/PhotoDetail.vue";
import NotFound from "./pages/errors/NotFound.vue";

const routes = [
    {
        path: "/",
        component: PhotoList,
        props: (route) => {
            const page = route.query.page;
            return { page: /^[1-9][0-9]*$/.test(page) ? page * 1 : 1 };
        },
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound,
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
