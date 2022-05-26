import chalk from 'chalk';
import chalkTable from 'chalk-table';

import TableComponent from '../../shared/base/tableComponent.mjs';

export default class TableConsoleComponent extends TableComponent {
  render(data) {
    const columns = this.prepareDate(data);
    const options = {
      leftPad: 0,
      columns,
    };
    const table = chalkTable(options, data);
    console.log(table);
  }

  prepareDate(data) {
    const [firstItem] = data;
    const headers = Object.keys(firstItem)
      // .map()
    const formatHeader = (data, index) => index %2 === 0
      ? chalk.yellow(data)
      : chalk.green(data);
    const columns = headers
      .map((item, index) => ({
        field: item,
        name: formatHeader(item, index),
      }))

    return columns
  }
}