import { ResposeTraslate } from "../../interfaces";


export const traslateUseCase = async (prompt: string, lang: string) => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/traslate`,
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, lang }),
      }
    );

    if (!resp.ok) throw new Error("No se pudo realizar la traducción");

    const data = (await resp.json()) as ResposeTraslate;

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: "No se pudo realizar la corrección",
    };
  }
};
