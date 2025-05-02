import { $host, $authHost } from ".";

export const GetSubTypes = async () => {
    const Subs = await $host.get('sub/allSubs')

    return Subs;
}

