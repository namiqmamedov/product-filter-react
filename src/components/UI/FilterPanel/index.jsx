import React from 'react'
import FilterListToggle from '../../FilterListToggle'
import {categoryList,ratingList} from '../../../constants/index'
import '../FilterPanel/styles.css'
import CheckboxProton from '../../CheckboxProton'
import SliderProton from '../../SliderProton'

const FilterPanel = ({selectedCategory,selectToggle, selectedRating, selectRating,cusines,changeChecked,changePrice,selectedPrice}) => {
  return (
      <div>
        <div className="input-group">
          <p className='label'>Category</p>
          <FilterListToggle options={categoryList} value={selectedCategory} selectToggle={selectToggle}/>
        </div>
        <div className="input-group">
          <p className='label'>Cusine</p>
          {cusines.map((cuisine) => ( 
          <CheckboxProton
          key={cuisine.id} 
          cuisine={cuisine } 
          changeChecked={changeChecked}/> ))}
        </div>
        <div className="input-group">
          <p className='label-range'>Price Range</p>
            <SliderProton value={selectedPrice} changePrice={changePrice}/>
        </div>
        <div className="input-group">
          <p className='label'>
            Star Rating
          </p>
          <FilterListToggle options={ratingList} value={selectedRating} selectToggle={selectRating}/>
        </div>
      </div>
    )
}

export default FilterPanel