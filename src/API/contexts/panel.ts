export const panelDefinition = [
  {
    "label": "Stage",
    "name": "stage",
    "inputs": [
      {
        "type": "text",
        "name": "title",
        "label": "Stage title"
      },
      {
        "type": "action",
        "name": "stageState",
        "values": [
          {
            "name": "show",
            "label": "Show stage"
          },
          {
            "name": "hide",
            "label": "Hide stage"
          }
        ]
      },
      {
        "type": "action",
        "name": "boxesState",
        "values": [
          {
            "name": "show",
            "label": "Show Team Util"
          },
          {
            "name": "hide",
            "label": "Hide Team Util"
          }
        ]
      }
    ]
  }
] as const;