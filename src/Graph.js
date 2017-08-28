import React, { Component } from 'react';
import axios from 'axios';
import Display from './Display';
import loading from './loading.gif'
import { API_KEY } from './config.js'

const baseURL = 'https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=' + API_KEY + '&';

class Graph extends Component {
  constructor(){
    super();

    this.state = {
      loading: false,
      filter: '208',
      common: true,
      data: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({[name]: value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({loading: true});
    axios.get(baseURL + 'nutrients=' + this.state.filter + '&sort=c&subset=' + (this.state.common ? 1 : 0) + '&max=20')
      .then( data => this.setState({
        loading: false,
        data: data.data.report.foods
      }) );
  }

  render() {
    return (
      <div className='graph-section'>
        <form onSubmit={this.handleSubmit}>
          Which foods contain the most
          <select name='filter' value={this.state.filter} onChange={this.handleChange}>
            <option value='208'>Calories</option>
            <option value='203'>Protein</option>
            <option value='204'>Lipids (Fat)</option>
            <option value='205'>Carbohydrates</option>
            <option value='269'>Sugars</option>
          </select>
          per serving?
          <br />
          <label className='checkbox-label'>
            Limit to most commonly consumed foods
            <input className='checkbox' name='common' type='checkbox' checked={this.state.common} onChange={this.handleChange} />
          </label>
          <br />
          <input type='submit' value='Submit' />
        </form>
        <hr />
        {this.state.loading === true ? <img src={loading} alt="Loading animation" /> : <Display filter={this.state.filter} data={this.state.data}/>}
      </div>
    )
  }
}

export default Graph;
