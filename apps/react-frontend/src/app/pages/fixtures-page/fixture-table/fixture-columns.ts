

export const fixtureColumns = [
  {
    title: 'Fixture Date',
    dataIndex: 'fixture_date',
    // filters: [
    //   {
    //     text: 'Edward King 0',
    //     value: 'Edward King 0',
    //   },
    // ],
        // specify the condition of filtering result
  // here is that finding the name started with `value`
  onFilter: (value: any, record: any) => record.name.indexOf(value) === 0,
  // sorter: (a: any, b: any) => a.name.length - b.name.length,
  // sortDirections: ['descend'],
  },
  {
    title: 'Home Name',
    dataIndex: 'homeName',
  },
  {
    title: 'Home Score',
    dataIndex: 'home_score',
  },
  {
    title: 'Away Score',
    dataIndex: 'away_score',
  },
  {
    title: 'Away Name',
    dataIndex: 'awayName',
  },
];
