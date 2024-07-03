import { supabase } from "./supabase";

// ログインしているユーザーのthanksだけ取得する
export const getUserId =  async () => {
    const {
        data: { user },
    } = await supabase.auth.getUser()
    let user_id = user?.user_metadata.sub
    console.log(user_id);
    return user_id;
};

export const getTargets =  async () => {
    const targets = await supabase.from('Targets').select('*');
    console.log(targets.data);
    return targets.data;
};

// export const getTargetsByUserId =  async (user_id: string) => {
//     const targets = await supabase.from('Targets').select('*').eq('user_id', user_id);
//     console.log(targets.data);
//     return targets.data;
// };

export const getThanks =  async () => {
    const thanks = await supabase.from('Thanks').select('*');
    console.log(thanks.data);
    return thanks.data;
};

// リレーションを組む
export const getTargetsByUserId =  async (user_id: string) => {
    const targets = await supabase.from('Targets').select('*').eq('user_id', user_id);
    console.log(targets.data);
    return targets.data;
};

export const getThanksByTargetId =  async (target_id: string) => {
    const thanks = await supabase.from('Thanks').select('*').eq('target_id', target_id);
    console.log(thanks.data);
    return thanks.data;
};

// targets.data?.[0].id)