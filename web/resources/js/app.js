import "./bootstrap";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App).use(router).use(store).mount("#app");

store.dispatch("auth/currentUser").then(() => {
    createApp(App).use(router).use(store).mount("#app");
});
