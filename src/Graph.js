import React, { Component } from 'react';
import axios from 'axios';
import Display from './Display';
import FakeDisplay from './FakeDisplay';
import loading from './loading.gif'

const baseURL = 'https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=1a3quCIlkBB16IIsDrDRzlFoeZezD3Gl9oK5NhNE&';

class Graph extends Component {
  constructor(){
    super();

    this.state = {
      loading: false,
      // selected: '208',
      filter: '208',
      data: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(e) {
    this.setState({filter: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({loading: true});
    // this.setState({filter: this.state.selected});
    axios.get(baseURL + 'nutrients=' + this.state.filter + '&sort=c&subset=0&max=20')
      .then( data => this.setState({
        loading: false,
        data: data.data.report.foods
      }) );
  }


  render() {
    return (
      <div className='graph-section'>
        <form onSubmit={this.handleSubmit}>
          <select value={this.state.filter} onChange={this.handleChange}>
            <option value='208'>Calories</option>
            <option value='203'>Protein</option>
            <option value='204'>Lipids (fat)</option>
            <option value='205'>Carbohydrates</option>
            <option value='269'>Sugars</option>
          </select>
          <input type='submit' value='Submit' />
        </form>
        {this.state.loading === true ? <img src={loading} alt="Loading animation" /> : <Display filter={this.state.filter} data={this.state.data}/>}
      </div>
    )
  }
}

export default Graph;
