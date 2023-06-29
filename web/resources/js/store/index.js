import { createStore } from "vuex";
import auth from "./auth";
import error from "./error";

const store = createStore({
    modules: {
        auth,
        error,
    },
});

export default store;
