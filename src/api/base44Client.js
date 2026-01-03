const API_URL = import.meta.env.VITE_BASE44_API_URL;
const API_KEY = import.meta.env.VITE_BASE44_API_KEY;

// Entity operations helper
const createEntityAPI = (entityName) => ({
  list: async () => {
    const response = await fetch(`${API_URL}/entities/${entityName}`, {
      headers: {
        'api_key': API_KEY,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error(`Failed to fetch ${entityName}`);
    return response.json();
  },

  create: async (data) => {
    const response = await fetch(`${API_URL}/entities/${entityName}`, {
      method: 'POST',
      headers: {
        'api_key': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`Failed to create ${entityName}`);
    return response.json();
  },

  update: async (id, data) => {
    const response = await fetch(`${API_URL}/entities/${entityName}/${id}`, {
      method: 'PUT',
      headers: {
        'api_key': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`Failed to update ${entityName}`);
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/entities/${entityName}/${id}`, {
      method: 'DELETE',
      headers: {
        'api_key': API_KEY,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error(`Failed to delete ${entityName}`);
    return response.json();
  }
});

export const base44 = {
  entities: {
    Content: createEntityAPI('Content'),
    Publication: createEntityAPI('Publication'),
    Course: createEntityAPI('Course'),
    Student: createEntityAPI('Student'),
    ResearchArea: createEntityAPI('ResearchArea')
  }
};