# Football Data MCP Server

This is a Model Context Protocol (MCP) server that provides access to the [football-data.org](https://www.football-data.org/) API.

## Setup

1. Get an API key from [football-data.org](https://www.football-data.org/client/register).
2. Create a `.env` file based on `.env.example` and add your API key:
   ```
   FOOTBALL_DATA_API_KEY=your_api_key_here
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the server:
   ```bash
   npm run build
   ```

## Usage

This server is designed to be used with an MCP client (like Claude Desktop).

### Example Configuration for Claude Desktop

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "football": {
      "command": "node",
      "args": ["/path/to/mcp-football/dist/index.js"],
      "env": {
        "FOOTBALL_DATA_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Available Tools

- `list_areas`: List all available areas.
- `get_area`: Get details for a specific area.
- `list_competitions`: List all competitions.
- `get_competition`: Get details for a specific competition.
- `get_standings`: Get standings for a competition.
- `get_competition_matches`: Get matches for a specific competition.
- `get_competition_teams`: Get teams for a specific competition.
- `get_scorers`: Get top scorers for a competition.
- `list_teams`: List teams.
- `get_team`: Get details for a specific team.
- `get_team_matches`: Get matches for a specific team.
- `list_matches`: List matches across several competitions.
- `get_match`: Get details for a specific match.
- `get_match_h2h`: Get head-to-head history for a match.
- `get_person`: Get details for a specific person.
- `get_person_matches`: Get matches for a specific person.
