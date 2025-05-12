import { $host, $authHost } from ".";

export const GetSubTypes = async () => {
    const Subs = await $host.get('sub/allSubs')

    return Subs;
}

export const subOrder = async(order) => {

    const message = await $authHost.post('sub/orderSub', order)

    return message;

}

export const getUserSub = async(id) => {
    const activeSub = await $authHost.post('/sub/getUserSub', {id:id})

    return activeSub;
}

