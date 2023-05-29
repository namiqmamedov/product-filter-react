import React,{useEffect, useState} from 'react'
import SearchBar from '../components/UI/SearchBar/index'
import FilterPanel from '../components/UI/FilterPanel/index'
import List from '../components/UI/List/index'
import EmptyView from '../components/EmptyView/index'
import './styles.css'
import { dataList } from '../constants'

const Home = () => {
  
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedRating, setSelectedRating] = useState(null)
  const [selectedPrice, setSelectedPrice] = useState([1000,5000])
  const [list,setList] = useState(dataList)
  const [inputSearch,setInputSearch] = useState('')
  const [resultsFound,setResultFound] = useState(false)
  const [cusines, setCusines] = useState([
    {
    id: 1,
    checked: false,
    label: 'American'
  },
  {
    id: 2,
    checked: false,
    label: 'Chinese'
  },
  {
    id: 3,
    checked: false,
    label: 'Italian'
  },
])
  
  const handleSelectCategory = (event,value) => !value ? null : setSelectedCategory(value)

  const handleSelectRating = (event,value) => !value ? null : setSelectedRating(value)

  const handleChangeChecked = (id) => {
    const cuisinesStateList = cusines;
    const changeCheckedCuisines = cuisinesStateList.map(item => item.id === id?
    {...item,checked: !item.checked} : item)

    setCusines(changeCheckedCuisines)
  };

  const handleChangePrice = (event,value) => {
    setSelectedPrice(value);
  }

  const applyFilters = () =>{

    let updatedList = dataList
    
    // Rating Filter
    
    if(selectedRating){
      updatedList = updatedList.filter(item => parseInt(item.rating) === parseInt(selectedRating))
    }

    // Category Filter

    if(selectedCategory){
        updatedList = updatedList.filter(item =>
        item.category === selectedCategory)
    }

    // Cusine Filter

    const cuisineChecked = cusines.filter(item=>item.checked).map(item => item.label.toLocaleLowerCase().trim())

    if(cuisineChecked.length){
        updatedList = updatedList.filter(item=>cuisineChecked.includes(item.cuisine))
    }

    // Price Filter

    const minPrice = selectedPrice[0]
    const maxPrice = selectedPrice[1]

    updatedList = updatedList.filter(item => item.price >= minPrice && item.price <= maxPrice )

    // Search Filter

    if(inputSearch){
      updatedList = updatedList.filter(item=>item.title.toLocaleLowerCase().trim().search(inputSearch.toLocaleLowerCase().trim())!==-1)
    }

    setList(updatedList)

    !updatedList.length ? setResultFound(false) : setResultFound(true)
  };
 
  useEffect(() => {
    applyFilters();
  },[selectedRating,selectedCategory,cusines,selectedPrice,inputSearch])
  

  return (
    <div className='home'>
    {/* Search Bar */}
    <SearchBar value={inputSearch} changeInput={e=>setInputSearch(e.target.value)} />
    <div className='home_panelList-wrap'>
      {/* Filter Panel */}
      <div className='home_panel-wrap'>
        <FilterPanel
        selectToggle={handleSelectCategory} 
        selectedCategory={selectedCategory}
        selectRating={handleSelectRating}
        selectedRating={selectedRating}
        cusines={cusines}
        changeChecked={handleChangeChecked}
        selectedPrice={selectedPrice}
        changePrice={handleChangePrice}
        />
      </div>
      <div className='home_list-wrap'>
        {resultsFound ? <List list={list}/> : <EmptyView />}
      <List list={list} />
      </div>
    </div>
  </div>
  )
}

export default Home