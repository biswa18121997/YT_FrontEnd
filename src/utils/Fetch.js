import { useState, useEffect } from "react";
//fetch hook for api calls..
export function useFetch(url){
    let [data,setData] = useState({});
    let [error,setError] = useState(false);
    let [loading,setLoading] = useState(true);

    
        useEffect( ()=>{
            async function Fetcher(){
                try {
                    setLoading(false);
                    let data = await fetch(url);
                    let finalData = await data.json();
                    setData(finalData);
                } catch (error) {
                    setError(error);
                    setLoading(false);
                }
                finally{
                    setLoading(false);
                }
            }
            Fetcher();            
        },[url])
        return {data,error,loading}
    }
