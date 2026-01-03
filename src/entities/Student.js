export const StudentSchema ={
    "name": "Student",
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "Student name"
      },
      "degree": {
        "type": "string",
        "enum": [
          "phd",
          "masters"
        ],
        "description": "Degree type"
      },
      "status": {
        "type": "string",
        "enum": [
          "current",
          "former"
        ],
        "description": "Current or former student"
      },
      "institution": {
        "type": "string",
        "description": "University"
      },
      "program": {
        "type": "string",
        "description": "Program/Department"
      },
      "background": {
        "type": "string",
        "description": "Educational background"
      },
      "research_interests": {
        "type": "string",
        "description": "Research areas"
      },
      "thesis_title": {
        "type": "string",
        "description": "Thesis/dissertation title"
      },
      "graduation_year": {
        "type": "string",
        "description": "Year graduated (for former students)"
      },
      "first_position": {
        "type": "string",
        "description": "First position after graduation"
      },
      "current_position": {
        "type": "string",
        "description": "Current position"
      },
      "website_url": {
        "type": "string",
        "description": "Personal website"
      },
      "co_supervisors": {
        "type": "string",
        "description": "Co-supervisors if any"
      },
      "start_year": {
        "type": "string",
        "description": "Year started (for current students)"
      },
      "order": {
        "type": "number",
        "description": "Display order",
        "default": 0
      }
    },
    "required": [
      "name",
      "degree",
      "status"
    ]
  }