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