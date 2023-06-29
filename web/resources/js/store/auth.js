const state = {
    // ログイン済みユーザーを保持する user を追加
    user: null,
};

const getters = {};

const mutations = {
    // user ステートの値を更新する setUser
    setUser(state, user) {
        state.user = user;
    },
};

const actions = {
    // 会員登録 API を呼び出す register アクション
    async register(context, data) {
        const response = await axios.post("/api/register", data);
        context.commit("setUser", response.data);
    },
    // ログイン API を呼び出す login アクション
    async login(context, data) {
        const response = await axios.post("/api/login", data);
        context.commit("setUser", response.data);
    },
    async logout(context) {
        const response = await axios.post("/api/logout");
        // ログアウト処理が完了したあとは user ステートを null で更新
        context.commit("setUser", null);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
