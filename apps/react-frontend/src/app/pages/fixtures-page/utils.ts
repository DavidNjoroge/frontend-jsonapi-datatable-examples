import qs from "qs";
import { FixtureTableRow } from "./fixture-table/fixture-table";
import { JsonapiModelResponse } from "../../interfaces/jsonapi-response";
import { PageParams } from "../../utils/url-params-util";


export function convertFixturesToFixturesRows(fixturesObjects: JsonapiModelResponse[]): FixtureTableRow[] {
  // debugger
  return fixturesObjects.map(obj => ({
    key: obj.id,
    id: obj.id,
    away_id: obj.attributes.away_id,
    away_score: obj.attributes.away_score,
    awayName: obj.relationships.away.data.relationships.team.data.attributes.name,
    homeName: obj.relationships.home.data.relationships.team.data.attributes.name,
    home_id: obj.attributes.home_id,
    home_score: obj.attributes.home_score,
    fixture_date: obj.attributes.fixture_date
  }))
}

export function convertFixtureResponseToFixtures(fixturesResponse: any[], included: any[]): JsonapiModelResponse[] {
  return fixturesResponse.map( fixture => {
    // todo optimize
    const incc = included

    const newFixture = fixture
    const awayLeagueTeam = incc.find(inc => inc.type === fixture.relationships.away.data.type && inc.id === fixture.relationships.away.data.id)
    const homeLeagueTeam = incc.find(inc => inc.type === fixture.relationships.home.data.type && inc.id === fixture.relationships.home.data.id)

    homeLeagueTeam.relationships.team.data = incc.find(inc => inc.type === homeLeagueTeam.relationships.team.data.type && inc.id === homeLeagueTeam.relationships.team.data.id)
    awayLeagueTeam.relationships.team.data = incc.find(inc => inc.type === awayLeagueTeam.relationships.team.data.type && inc.id === awayLeagueTeam.relationships.team.data.id)


    newFixture.relationships.home.data = homeLeagueTeam
    newFixture.relationships.away.data = awayLeagueTeam

    // debugger

    return newFixture
  })

}

export function convertSearchToRouteParams(search: string) {
  return qs.parse(search, {
    ignoreQueryPrefix: true,
  }) as unknown as PageParams
}


export function fixtureSearchQuery(search: string) {
  const filter = [{or: [
    {
      "name": "away",
      "op": "has",
      "val": {
        "name": "team",
        "op": "has",
        "val": {
          "name": "name",
          "op": "ilike",
          "val": `%${search}%`
        }
      }
    },
    {
      "name": "home",
      "op": "has",
      "val": {
        "name": "team",
        "op": "has",
        "val": {
          "name": "name",
          "op": "ilike",
          "val": `%${search}%`
        }
      }
    }
  ]
}
]
  return filter
}
