export const PublicationSchema ={
    "name": "Publication",
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "description": "Paper title"
      },
      "authors": {
        "type": "string",
        "description": "Authors list"
      },
      "type": {
        "type": "string",
        "enum": [
          "working_paper",
          "journal",
          "conference",
          "book_chapter"
        ],
        "description": "Publication type"
      },
      "venue": {
        "type": "string",
        "description": "Journal name, conference, or venue"
      },
      "year": {
        "type": "number",
        "description": "Publication year"
      },
      "abstract": {
        "type": "string",
        "description": "Paper abstract"
      },
      "pdf_url": {
        "type": "string",
        "description": "Link to PDF"
      },
      "doi": {
        "type": "string",
        "description": "DOI link"
      },
      "status": {
        "type": "string",
        "description": "Status (e.g., Under Review, Accepted, Published)"
      },
      "order": {
        "type": "number",
        "description": "Display order",
        "default": 0
      }
    },
    "required": [
      "title",
      "type"
    ]
  }