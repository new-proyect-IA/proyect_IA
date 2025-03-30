import type { ResposeProsCons } from "../../interfaces";

export const prosConsUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser`,
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!resp.ok) throw new Error("No se pudo realizar la correción");

    const data = (await resp.json()) as ResposeProsCons;

    return {
      ok: true,
      message: data.data.constent,
    };
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo realizar la comparación",
    };
  }
};
