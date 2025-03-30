export async function* prosConsStreamGeneratorUseCase (prompt: string, abortSignal: AbortSignal) {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`,
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
        // todo: abortSignal
        signal: abortSignal
      }
    );

    if (!resp.ok) throw new Error("No se pudo realizar la correción");

    const reader = resp.body?.getReader()

    if( !reader){
      console.log('No se pudo construir el reader')
      return null;
    }

    const decoder = new TextDecoder();

    let text = '';

    while(true) {
      const {value, done} = await reader.read()
      if(done) {
        break;
      }

      const decodedChunk = decoder.decode( value, { stream: true });
      text += decodedChunk

      yield text

    }

    
  } catch (error) {
    return null;
  }
};
