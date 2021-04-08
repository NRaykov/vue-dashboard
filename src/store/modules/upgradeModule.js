const upgradeModule = {
    namespaced: true, 
    state: {
        credentials: {
           sandbox: 'AX47l41ubtwG9Zv9x_adcVuZrVSRa4MEFMH38Is9qeK2pGa1axTapuoBM5RvfjWxnRYCnJM-ppCIDb5Q',
        },
        order: {
            description: "Upgrade to Pro",
            amount: {
              currency_code: "USD",
              value: 10
            }
        },
        orderStatus: {}
    },
    actions: {
        vx_payPalDepend({state}, setLoaded) {
            const script = document.createElement("script");
            const ClientID = state.credentials.sandbox;
            script.src = `https://www.paypal.com/sdk/js?client-id=${ClientID}`;
            script.addEventListener("load", setLoaded);
            document.body.appendChild(script); 
        },
        vx_renderButton({state, commit}, el) {
            window.paypal
            .Buttons({
                    createOrder: (data, actions) => {
                        return actions.order.create({
                        purchase_units: [state.order]
                        });
                    },
                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture();
                        commit('upgradeToPro', order);
                        console.log(state.orderStatus)
                    },
                    onError: err => {
                        console.log(err);
                    },
                    fundingSource: paypal.FUNDING.PAYPAL,
                })
            .render(el);

        },
        vx_resetOrder({commit}) {
            commit('reserOrder');
        }
    },
    mutations: {
        upgradeToPro(state, order) {
            state.orderStatus = order
        },
        reserOrder(state) {
            state.orderStatus = {}
        }
    },
    getters: {
        getProVersion: state => state.orderStatus.status
    }
}

export default upgradeModule;