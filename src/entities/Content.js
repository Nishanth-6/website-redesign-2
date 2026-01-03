export const ContentSchema = {
    "name": "Content",
    "type": "object",
    "properties": {
      "key": {
        "type": "string",
        "description": "Content identifier (e.g., 'about', 'hero', 'contact')"
      },
      "title": {
        "type": "string",
        "description": "Content title"
      },
      "body": {
        "type": "string",
        "description": "Main content text"
      },
      "image_url": {
        "type": "string",
        "description": "Associated image"
      },
      "metadata": {
        "type": "object",
        "description": "Additional metadata as key-value pairs",
        "additionalProperties": true
      }
    },
    "required": [
      "key"
    ]
  }