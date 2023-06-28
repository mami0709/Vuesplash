import { createRouter, createWebHistory } from "vue-router";
import PhotoList from "./pages/PhotoList.vue";
import Login from "./pages/Login.vue";

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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
