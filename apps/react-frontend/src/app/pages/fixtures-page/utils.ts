import { FixtureTableRow } from "../../fixture-table/fixture-table";
import { JsonapiModelResponse } from "../../interfaces/jsonapi-response";


export function convertFixturesToFixturesRows(fixturesObjects: JsonapiModelResponse[]): FixtureTableRow[] {
  // debugger
  return fixturesObjects.map(obj => ({
    key: obj.id,
    id: obj.id,
    away_id: obj.attributes.away_id,
    away_score: obj.attributes.away_score,
    home_id: obj.attributes.home_id,
    home_score: obj.attributes.home_score,
    fixture_date: obj.attributes.fixture_date
  }))
}
