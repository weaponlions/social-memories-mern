import React from 'react';
import Pagi from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import  { getPostsBySearch } from '../Redux/actions' 

export const Pagination = ({ page, totalPage, tags, title}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    
    const handlePage = (e, selectedPage) => {
      Sleep(500, selectedPage)
    }

    const Sleep = (time, selectedPage) => {
      setTimeout(()=> {
        dispatch(getPostsBySearch({page: selectedPage, tags: (tags[0] === undefined ? '' : tags.join(',')), title: title}))
      }, time)
     }
      
  return (
    <>
        <Pagi
        classes={{ul : classes.ul}}
        count={totalPage}
        page={page}
        variant={'outlined'}
        color={'primary'}
        onChange={handlePage}
        renderItem = {(item) => (
            <PaginationItem {...item}  component={Link}  />
        )}
        />
 
    </>
  )
}
