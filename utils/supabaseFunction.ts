import { supabase } from "./supabase";

export const getTargets =  async () => {
    const targets = await supabase.from('Targets').select('*');
    console.log(targets.data);
    return targets.data;
};

export const getThanks =  async () => {
    const thanks = await supabase.from('Thanks').select('*');
    console.log(thanks.data);
    return thanks.data;
};

// ログインしているユーザーのthanksだけ取得する
export const getUserId =  async () => {
    const {
        data: { user },
    } = await supabase.auth.getUser()
    let user_id = user?.user_metadata.sub
    console.log(user_id);
    return user_id;
};