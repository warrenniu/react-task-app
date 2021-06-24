import PropTypes from 'prop-types'
import Button from './Button'
//a hook we can use to access the pathname of the location. can use to hide certain components when on that page
import { useLocation } from 'react-router-dom'

const Header = ({ title, onAdd, showAdd }) => {
    const location = useLocation()
    //hiding add button in about page
    return (
        <header className='header'>
            <h1>{title}</h1>
            { location.pathname === '/' && <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>}
        </header>
    )
}

//Sets our default prop value if one isn't passed down from the parent component. Will get overwritten if one does
Header.defaultProps = {
    title: 'Task Tracker'
}

//Ensures that the prop is of the designated data type
Header.propTypes = {
    title: PropTypes.string
}

//CSS in JS. Creating a variable as opposed to doing it inline
// const headingStyle = {
//     color: "red",
//     backgroundColor: "black"
// }

export default Header


