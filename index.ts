import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.FOOTBALL_DATA_API_KEY;
const BASE_URL = "https://api.football-data.org/v4";

if (!API_KEY) {
  console.error("FOOTBALL_DATA_API_KEY environment variable is required");
  process.exit(1);
}

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-Auth-Token": API_KEY,
  },
});

const server = new Server(
  {
    name: "football-data-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_areas",
        description: "List all available areas",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "get_area",
        description: "Get details for a specific area",
        inputSchema: {
          type: "object",
          properties: { id: { type: "number" } },
          required: ["id"],
        },
      },
      {
        name: "list_competitions",
        description: "List all competitions",
        inputSchema: {
          type: "object",
          properties: { areas: { type: "string", description: "Comma separated list of area IDs" } },
        },
      },
      {
        name: "get_competition",
        description: "Get details for a specific competition",
        inputSchema: {
          type: "object",
          properties: { id: { type: "string", description: "Competition ID or code (e.g., PL, CL)" } },
          required: ["id"],
        },
      },
      {
        name: "get_standings",
        description: "Get standings for a competition",
        inputSchema: {
          type: "object",
          properties: {
            id: { type: "string", description: "Competition ID or code" },
            matchday: { type: "number" },
            season: { type: "string" },
            date: { type: "string" },
          },
          required: ["id"],
        },
      },
      {
        name: "get_competition_matches",
        description: "Get matches for a specific competition",
        inputSchema: {
          type: "object",
          properties: {
            id: { type: "string", description: "Competition ID or code" },
            dateFrom: { type: "string" },
            dateTo: { type: "string" },
            stage: { type: "string" },
            status: { type: "string" },
            matchday: { type: "number" },
            group: { type: "string" },
            season: { type: "string" },
          },
          required: ["id"],
        },
      },
      {
        name: "get_competition_teams",
        description: "Get teams for a specific competition",
        inputSchema: {
          type: "object",
          properties: {
            id: { type: "string", description: "Competition ID or code" },
            season: { type: "string" },
          },
          required: ["id"],
        },
      },
      {
        name: "get_scorers",
        description: "Get top scorers for a competition",
        inputSchema: {
          type: "object",
          properties: {
            id: { type: "string", description: "Competition ID or code" },
            limit: { type: "number" },
            season: { type: "string" },
          },
          required: ["id"],
        },
      },
      {
        name: "list_teams",
        description: "List teams",
        inputSchema: {
          type: "object",
          properties: {
            limit: { type: "number" },
            offset: { type: "number" },
          },
        },
      },
      {
        name: "get_team",
        description: "Get details for a specific team",
        inputSchema: {
          type: "object",
          properties: { id: { type: "number" } },
          required: ["id"],
        },
      },
      {
        name: "get_team_matches",
        description: "Get matches for a specific team",
        inputSchema: {
          type: "object",
          properties: {
            id: { type: "number" },
            dateFrom: { type: "string" },
            dateTo: { type: "string" },
            season: { type: "string" },
            competitions: { type: "string" },
            status: { type: "string" },
            venue: { type: "string" },
            limit: { type: "number" },
          },
          required: ["id"],
        },
      },
      {
        name: "list_matches",
        description: "List matches across several competitions",
        inputSchema: {
          type: "object",
          properties: {
            competitions: { type: "string" },
            ids: { type: "string" },
            dateFrom: { type: "string" },
            dateTo: { type: "string" },
            status: { type: "string" },
          },
        },
      },
      {
        name: "get_match",
        description: "Get details for a specific match",
        inputSchema: {
          type: "object",
          properties: { id: { type: "number" } },
          required: ["id"],
        },
      },
      {
        name: "get_match_h2h",
        description: "Get head-to-head history for a match",
        inputSchema: {
          type: "object",
          properties: {
            id: { type: "number" },
            limit: { type: "number" },
            dateFrom: { type: "string" },
            dateTo: { type: "string" },
            competitions: { type: "string" },
          },
          required: ["id"],
        },
      },
      {
        name: "get_person",
        description: "Get details for a specific person",
        inputSchema: {
          type: "object",
          properties: { id: { type: "number" } },
          required: ["id"],
        },
      },
      {
        name: "get_person_matches",
        description: "Get matches for a specific person",
        inputSchema: {
          type: "object",
          properties: {
            id: { type: "number" },
            dateFrom: { type: "string" },
            dateTo: { type: "string" },
            status: { type: "string" },
            competitions: { type: "string" },
            limit: { type: "number" },
            offset: { type: "number" },
          },
          required: ["id"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let response;
    switch (name) {
      case "list_areas":
        response = await apiClient.get("/areas/");
        break;
      case "get_area":
        response = await apiClient.get(`/areas/${args?.id}`);
        break;
      case "list_competitions":
        response = await apiClient.get("/competitions/", { params: args });
        break;
      case "get_competition":
        response = await apiClient.get(`/competitions/${args?.id}`);
        break;
      case "get_standings":
        response = await apiClient.get(`/competitions/${args?.id}/standings`, { params: { ...args, id: undefined } });
        break;
      case "get_competition_matches":
        response = await apiClient.get(`/competitions/${args?.id}/matches`, { params: { ...args, id: undefined } });
        break;
      case "get_competition_teams":
        response = await apiClient.get(`/competitions/${args?.id}/teams`, { params: { ...args, id: undefined } });
        break;
      case "get_scorers":
        response = await apiClient.get(`/competitions/${args?.id}/scorers`, { params: { ...args, id: undefined } });
        break;
      case "list_teams":
        response = await apiClient.get("/teams/", { params: args });
        break;
      case "get_team":
        response = await apiClient.get(`/teams/${args?.id}`);
        break;
      case "get_team_matches":
        response = await apiClient.get(`/teams/${args?.id}/matches/`, { params: { ...args, id: undefined } });
        break;
      case "list_matches":
        response = await apiClient.get("/matches", { params: args });
        break;
      case "get_match":
        response = await apiClient.get(`/matches/${args?.id}`);
        break;
      case "get_match_h2h":
        response = await apiClient.get(`/matches/${args?.id}/head2head`, { params: { ...args, id: undefined } });
        break;
      case "get_person":
        response = await apiClient.get(`/persons/${args?.id}`);
        break;
      case "get_person_matches":
        response = await apiClient.get(`/persons/${args?.id}/matches`, { params: { ...args, id: undefined } });
        break;
      default:
        throw new Error(`Tool ${name} not found`);
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response.data, null, 2),
        },
      ],
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `API error: ${error.response?.status} ${error.response?.data?.message || error.message}`,
          },
        ],
      };
    }
    return {
      isError: true,
      content: [
        {
          type: "text",
          text: `Error: ${error.message}`,
        },
      ],
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Football Data MCP Server running on stdio");
}

main().catch(console.error);
