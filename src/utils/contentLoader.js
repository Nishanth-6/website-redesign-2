// Content loader for local JSON files
// This replaces the Base44 API calls with local file reads

const BASE_PATH = import.meta.env.BASE_URL || '/';

const loadJSON = async (filename) => {
  // Build the correct path: BASE_PATH already includes trailing slash in production
  const path = `${BASE_PATH}content/${filename}`.replace('//', '/');
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${filename} from ${path}`);
  }
  return response.json();
};

export const contentAPI = {
  entities: {
    Content: {
      list: () => loadJSON('site-content.json'),
      create: () => Promise.reject(new Error('Create operation not supported in static mode')),
      update: () => Promise.reject(new Error('Update operation not supported in static mode')),
      delete: () => Promise.reject(new Error('Delete operation not supported in static mode')),
    },
    Publication: {
      list: () => loadJSON('publications.json'),
      create: () => Promise.reject(new Error('Create operation not supported in static mode')),
      update: () => Promise.reject(new Error('Update operation not supported in static mode')),
      delete: () => Promise.reject(new Error('Delete operation not supported in static mode')),
    },
    Course: {
      list: () => loadJSON('courses.json'),
      create: () => Promise.reject(new Error('Create operation not supported in static mode')),
      update: () => Promise.reject(new Error('Update operation not supported in static mode')),
      delete: () => Promise.reject(new Error('Delete operation not supported in static mode')),
    },
    Student: {
      list: () => loadJSON('students.json'),
      create: () => Promise.reject(new Error('Create operation not supported in static mode')),
      update: () => Promise.reject(new Error('Update operation not supported in static mode')),
      delete: () => Promise.reject(new Error('Delete operation not supported in static mode')),
    },
    ResearchArea: {
      list: () => loadJSON('research-areas.json'),
      create: () => Promise.reject(new Error('Create operation not supported in static mode')),
      update: () => Promise.reject(new Error('Update operation not supported in static mode')),
      delete: () => Promise.reject(new Error('Delete operation not supported in static mode')),
    },
  },
};
