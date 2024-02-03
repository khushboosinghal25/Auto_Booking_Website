import React from 'react'
import ListItem from './ListItem.js';

function List() {
    const List = [
        {
            title: "Raghav Sapra",
            image: "https://img.freepik.com/free-vector/cute-man-working-laptop-cartoon-vector-icon-illustration-people-technology-icon-concept-isolated_138676-9123.jpg?w=740&t=st=1706971548~exp=1706972148~hmac=e7e462db8f6f6ff401cf6b3cdd362881e4f0ca40bda559b38c7349822a876dd6",
        },
        {
            title: "Khushbu",
            image: "https://cdn-icons-png.flaticon.com/512/9436/9436961.png",
        },
        {
            title: "Khushboo Singhal",
            image: "https://cdn-icons-png.flaticon.com/512/9436/9436961.png",
        },
        {
            title: "Priyanka Bai Meena",
            image: "https://cdn-icons-png.flaticon.com/512/9436/9436961.png",
        },
    ];
    return (
        <div>
            {List.map(item => <ListItem title={item.title} image={item.image}></ListItem>)}
        </div>
    )
}

export default List
