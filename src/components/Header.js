import PropTypes from 'prop-types'


const Header = ({ title }) => {
    return (
        <header>
            <h1>{title}</h1>
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


