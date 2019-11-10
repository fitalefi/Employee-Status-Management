import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class EmployeesTable extends Component {
  render() {
    let rows = this.props.employeesData;

    if (this.props.searchTerm !== null) {
      rows = rows.filter(employee =>
        employee.name.startsWith(this.props.searchTerm)
      );
    }
    if (this.props.statusFilterTerm !== null) {
      rows = rows.filter(
        employee => employee.status === this.props.statusFilterTerm
      );
    }
    const currentName = this.props.currentEmployeeMail;
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> name </TableCell>
              <TableCell> status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row =>
              row.email !== currentName ? (
                <TableRow
                  classes={
                    row.status === 'OnVacation' ? { root: 'red-row' } : null
                  }
                  key={row.name}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ) : null
            )}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
export default EmployeesTable;
