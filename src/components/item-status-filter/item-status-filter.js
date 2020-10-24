import React, { Component } from 'react';

import './item-status-filter.css';


export default class ItemStatusFilter extends Component {
  filterBtns = [
    {
      text: 'All',
      label: 'all',
      id: 1
    },
    {
      text: 'Active',
      label: 'active',
      id: 2
    },
    {
      text: 'Done',
      label: 'done',
      id: 3
    }
  ]

  render() {
    const {onTabFilterClick, filterName} = this.props

    return (
      <div className="btn-group">
        {
          this.filterBtns.map(btn => {
            let classes = 'btn'
            classes += filterName === btn.label ? ' btn-info' : ' btn-outline-secondary'

            return (
              <button key={btn.id} type="button"
                      onClick={() => onTabFilterClick(btn.label)}
                      className={classes}>{btn.text}</button>
            )
          })
        }
      </div>
    );
  }
}
