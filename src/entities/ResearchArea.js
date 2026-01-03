export const ResearchAreaSchema ={
    "name": "ResearchArea",
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "description": "Research area title"
      },
      "description": {
        "type": "string",
        "description": "Description of the research area"
      },
      "image_url": {
        "type": "string",
        "description": "Representative image"
      },
      "order": {
        "type": "number",
        "description": "Display order",
        "default": 0
      }
    },
    "required": [
      "title",
      "description"
    ]
  }