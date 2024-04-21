export const getCampaign=async(id:string)=>{

    const response=await fetch(`http://localhost:3001/campaigns/${id}`)
    const data=await response.json()
    return data

}