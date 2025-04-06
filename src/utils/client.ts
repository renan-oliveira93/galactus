export const client = async (endpoint: string) => {
    try {
        const response = await fetch(endpoint)
        return response.json();
      } catch (error) {
        console.error("Erro na requisição:", error);
      } finally {
      }
}