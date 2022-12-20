import { createClient } from "@supabase/supabase-js";

const options = {
  db: {
    schema: "public",
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: { "x-poly-app": "polyart" },
  },
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey, options);

export { supabase };

async function uploadFile(file: File | null | undefined) {
  try {
    if (file !== null && file !== undefined) {
      if (file.name.includes(" ")) {
        return {
          error: true,
          message: "ERRO! Nome da imagem contém espaços!",
        };
      }

      if (file.size > 500000) {
        return {
          error: true,
          message: "ERRO! Imagem maior que 500 KB!",
        };
      }

      const { data, error } = await supabase.storage
        .from("polyart")
        .upload(`layouts/${file.name}`, file, { cacheControl: "3600" });

      if (error) {
        switch (error.message) {
          case "The resource already exists":
            const result = window.confirm(
              "IMAGEM COM NOME DUPLICADO!\nVOCÊ DESEJA SUBSTITUÍ-LA?"
            );

            if (result) {
              const { error } = await supabase.storage
                .from("polyart")
                .remove([`layouts/${file.name}`]);

              if (error) {
                console.log("Hey! An error has ocuured: " + error.message);
                return { error: true, message: "ERROR! Contate um admin!" };
              } else {
                const image = await supabase.storage
                  .from("polyart")
                  .upload(`layouts/${file.name}`, file, {
                    cacheControl: "3600",
                  });

                if (image.error) {
                  console.log(
                    "Hey! An error has ocuured: " + image.error.message
                  );
                  return { error: true, message: "ERROR! Contate um admin!" };
                } else {
                  return {
                    error: false,
                    message: null,
                    path: image.data.path,
                  };
                }
              }
            }
            return {
              error: true,
              message: "Imagem duplicada! Você cancelou o upload.",
            };
            break;

          default:
            return { error: true, message: error.message };
            break;
        }
      } else {
        return { error: false, message: null, path: data.path };
      }
    }

    return { error: false, message: null, path: null };
  } catch (error: any) {
    console.log("Hey! An error has ocurred: " + error.message);
    return {
      error: true,
      message: "Upload ERROR! Contate um admin!",
    };
  }
}

export { uploadFile };
