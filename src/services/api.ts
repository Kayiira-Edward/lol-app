// src/services/api.ts
export async function postJSON(url: string, body: any) {
    const res = await fetch(url, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    
    if (!res.ok) {
      const error = await res.text()
      throw new Error(`API error: ${error}`)
    }
    
    return res.json()
  }
  
  export async function getJSON(url: string) {
    const res = await fetch(url, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
      },
    })
    
    if (!res.ok) {
      const error = await res.text()
      throw new Error(`API error: ${error}`)
    }
    
    return res.json()
  }