
export const textToAudioUseCase = async (prompt: string, voice: string) => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/text-to-audio`,
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, voice }),
      }
    );

    if (!resp.ok) throw new Error("No se pudo realizar el audio");

    const audioFile = await resp.blob();
    // Generar un tack que se puede colocar en un elemnte html
    const audioUrl = URL.createObjectURL( audioFile )


    return { ok: true, message:prompt, audioUrl: audioUrl};
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo generar el audio",
    };
  }
};
