export default async function fetching(data) {
    try{
        const response = await fetch(data);
        if(!response.ok){
            throw new Error('Error al obtener los datos haciendo fetch');
        }
        const finalData = await response.json();
        return finalData;
    }catch(error){
        console.log(error);
    }
}
