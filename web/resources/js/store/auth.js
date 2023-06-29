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
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
