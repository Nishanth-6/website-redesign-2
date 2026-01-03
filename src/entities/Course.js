export const CourseSchema ={
    "name": "Course",
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "description": "Course code (e.g., IDS 435)"
      },
      "name": {
        "type": "string",
        "description": "Course name"
      },
      "institution": {
        "type": "string",
        "description": "University/Institution"
      },
      "level": {
        "type": "string",
        "enum": [
          "undergraduate",
          "masters",
          "mba",
          "phd"
        ],
        "description": "Course level"
      },
      "semesters": {
        "type": "string",
        "description": "Semesters taught (e.g., Spring 2022/23, Fall 2019)"
      },
      "description": {
        "type": "string",
        "description": "Course description"
      },
      "order": {
        "type": "number",
        "description": "Display order",
        "default": 0
      }
    },
    "required": [
      "name",
      "institution"
    ]
  }