
export default async  function doFetch(petition) {
    try{
    const response = await fetch(petition)
        if(!response.ok){
            throw new Error ('Error a la hora de hacer fetch');
        }
        const data = await response.json()
        return data
    }catch(error){
        console.log(error)
    }
}
