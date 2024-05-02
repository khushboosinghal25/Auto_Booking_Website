import React from "react";
import ListItem from "./ListItem.js";

function List() {
  const userList = [
    {
      title: "Raghav Sapra",
      image:
        "https://img.freepik.com/free-vector/cute-man-working-laptop-cartoon-vector-icon-illustration-people-technology-icon-concept-isolated_138676-9123.jpg?w=740&t=st=1706971548~exp=1706972148~hmac=e7e462db8f6f6ff401cf6b3cdd362881e4f0ca40bda559b38c7349822a876dd6",
      github: "https://github.com/RaghavSapraOfficial",
      linkedin: "https://www.linkedin.com/in/raghav-sapra-891a00297/",
    },
    {
      title: "Khushbu",
      image: "https://cdn-icons-png.flaticon.com/512/9436/9436961.png",
      github: "https://github.com/khushbu0501",
      linkedin: "https://www.linkedin.com/in/khushbu-68a330232/",
    },
    {
      title: "Khushboo Singhal",
      image: "https://cdn-icons-png.flaticon.com/512/9436/9436961.png",
      github: "https://github.com/khushboosinghal25",
      linkedin: "https://www.linkedin.com/in/khushboo-singhal-76080622b/",
    },
    {
      title: "Priyanka Bai Meena",
      image: "https://cdn-icons-png.flaticon.com/512/9436/9436961.png",
      github: "https://github.com/PriyankaMee2003",
      linkedin: "http://www.linkedin.com/in/priyanka-meena-302500232",
    },
  ];
  return (
    <div>
      {userList.map((item) => (
        <ListItem
          key={item.title}
          title={item.title}
          image={item.image}
          github={item.github}
          linkedin={item.linkedin}
        />
      ))}
    </div>
  );
}

export default List;
