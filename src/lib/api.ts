export async function fetchProjects() {
    const response = await fetch('https://portfoliostrapicms.onrender.com/api/projects?populate=*')
    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }
    return response.json()
  }
  
  