import { OK, CREATED, UNPROCESSABLE_ENTITY } from "../util";

const state = {
    // ログイン済みユーザーを保持する user を追加
    user: null,
    // API 呼び出しが成功したか失敗したかを表す apiStatus
    apiStatus: null,
    loginErrorMessages: null,
    registerErrorMessages: null,
};

const getters = {
    // ログインチェックに使用。確実に真偽値を返すために二重否定
    check: (state) => !!state.user,
    // user が null の場合に呼ばれてもエラーが発生しないように空文字を返す
    username: (state) => (state.user ? state.user.name : ""),
};

const mutations = {
    // user ステートの値を更新する setUser
    setUser(state, user) {
        state.user = user;
    },
    setApiStatus(state, status) {
        state.apiStatus = status;
    },
    setLoginErrorMessages(state, messages) {
        state.loginErrorMessages = messages;
    },
    setRegisterErrorMessages(state, messages) {
        state.registerErrorMessages = messages;
    },
};

const actions = {
    // 会員登録 API を呼び出す register アクション
    async register(context, data) {
        context.commit("setApiStatus", null);
        const response = await axios.post("/api/register", data);

        if (response.status === CREATED) {
            context.commit("setApiStatus", true);
            context.commit("setUser", response.data);
            return false;
        }

        context.commit("setApiStatus", false);
        if (response.status === UNPROCESSABLE_ENTITY) {
            context.commit("setRegisterErrorMessages", response.data.errors);
        } else {
            context.commit("error/setCode", response.status, { root: true });
        }
    },

    // ログイン API を呼び出す login アクション
    async login(context, data) {
        context.commit("setApiStatus", null);
        const response = await axios.post("/api/login", data);

        if (response.status === OK) {
            context.commit("setApiStatus", true);
            context.commit("setUser", response.data);
            return false;
        }

        // ステータスコードが UNPROCESSABLE_ENTITY の場合
        context.commit("setApiStatus", false);
        if (response.status === UNPROCESSABLE_ENTITY) {
            context.commit("setLoginErrorMessages", response.data.errors);
        } else {
            context.commit("error/setCode", response.status, { root: true });
        }
    },

    // ログアウト
    async logout(context) {
        // ログアウト処理が完了したあとは user ステートを null で更新
        context.commit("setApiStatus", null);
        const response = await axios.post("/api/logout");

        if (response.status === OK) {
            context.commit("setApiStatus", true);
            context.commit("setUser", null);
            return false;
        }

        context.commit("setApiStatus", false);
        context.commit("error/setCode", response.status, { root: true });
    },

    // ログインユーザーチェック
    async currentUser(context) {
        context.commit("setApiStatus", null);
        const response = await axios.get("/api/user");
        const user = response.data || null;

        if (response.status === OK) {
            context.commit("setApiStatus", true);
            context.commit("setUser", user);
            return false;
        }

        context.commit("setApiStatus", false);
        context.commit("error/setCode", response.status, { root: true });
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
