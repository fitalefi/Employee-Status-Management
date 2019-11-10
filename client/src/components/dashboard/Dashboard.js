import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getAllEmployeesStatus,
  fetchStatusesToDisplay,
  updateStatus
} from '../../actions/profile';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import EmployeesTable from './EmployeesTable';

import CircularProgress from '@material-ui/core/CircularProgress';

class Dashboard extends Component {
  state = { currentStatus: '', searchTerm: '', statusFilterTerm: '' };
  componentDidMount() {
    this.props.fetchStatusesToDisplay();
    this.props.getAllEmployeesStatus();
  }

  onSelectFieldChange(e) {
    const values = {
      email: this.props.auth.email,
      name: this.props.auth.name,
      status: e.target.value !== '' ? e.target.value : 'Working'
    };
    this.setState({ currentStatus: e.target.value });
    this.props.updateStatus(values);
  }

  renderSearchAndFilter(selectFlag) {
    return (
      <div>
        <h5> list of employees</h5>
        <div className='filter-table'>
          <input
            className='input-search'
            placeholder='Search By Name...'
            name='Search'
            value={this.state.searchTerm}
            onChange={e => this.setState({ searchTerm: e.target.value })}
          />
          <Select
            classes={{ root: 'select-filter-style' }}
            value={this.state.statusFilterTerm}
            onChange={e => this.setState({ statusFilterTerm: e.target.value })}
          >
            <MenuItem MenuItem value={''} classes={{ root: 'empty-select' }} />

            {selectFlag
              ? this.props.profile.statusData.map((value, index) => (
                  <MenuItem value={value} key={index}>
                    {value}
                  </MenuItem>
                ))
              : null}
          </Select>
        </div>
      </div>
    );
  }

  renderFields() {
    let selectFlag =
      this.props.profile.statusData && this.props.profile.statusData.length > 0;

    return (
      <div>
        Update My Current Status
        <FormControl className='form-class-style'>
          <Select
            value={this.state.currentStatus}
            onChange={e => this.onSelectFieldChange(e)}
            classes={{ root: 'select-status-style' }}
          >
            {selectFlag
              ? this.props.profile.statusData.map((value, index) => (
                  <MenuItem value={value} key={index}>
                    {value}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>
        {this.renderSearchAndFilter(selectFlag)}
      </div>
    );
  }

  render() {
    let selectFlag =
      this.props.profile.statusData || this.props.profile.statusData.length > 0;
    if (!selectFlag || !this.props.profile.allUsers || !this.props.auth.name) {
      return <CircularProgress />;
    }
    return (
      <div>
        <h4>{`Hello ${this.props.auth.name}, You are ${this.props.auth.status} `}</h4>
        {this.renderFields()}
        <EmployeesTable
          employeesData={this.props.profile.allUsers}
          currentEmployeeMail={this.props.auth.email}
          searchTerm={
            this.state.searchTerm !== '' ? this.state.searchTerm : null
          }
          statusFilterTerm={
            this.state.statusFilterTerm !== ''
              ? this.state.statusFilterTerm
              : null
          }
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getAllEmployeesStatus, fetchStatusesToDisplay, updateStatus }
)(Dashboard);
