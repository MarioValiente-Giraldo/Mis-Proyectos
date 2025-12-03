const VITE_RICK_ENDPOINT = import.meta.env.VITE_RICK_ENDPOINT;
export async function fetching(name) {
    try{
        const response = await fetch(`${VITE_RICK_ENDPOINT}${name}`);
        if (!response.ok) throw new Error(" Error a la hora de hacer fetch");
        const data = await response.json();
        return data;

    }catch(error){
        console.log(error)
    }
}
