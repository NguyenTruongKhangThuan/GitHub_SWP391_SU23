import React, {useState} from 'react'
import Table from './Table';

const Tag = ({ content }) => {
    let tagBgColor;

    if (content === "Monopoly") {
        tagBgColor = '#FF8989';
    }
    else if (content === "Werewolves") {
        tagBgColor = '#97DECE';
    }
    else if (content === "Root") {
        tagBgColor = '#5C469C';
    }
    else if (content === "Catan") {
        tagBgColor = '#91684A';
    }
    else if (content === "Spudnet") {
        tagBgColor = '#FFD93D';
    }
    else{
        tagBgColor = '#A8A196';
    }

    const tagStyle = {
        backgroundColor: tagBgColor,
        color: 'white',
        padding: '5px',
        borderRadius: '20px',
    };

    return (
        <div className='w-32 text-center text-[16px]' style={tagStyle}>
          {content}
        </div>
      );
}

const Tags = () => {
    const columns = [
        { label: "ID", field: "TagID" },
        { label: "Name", field: "TagName" },
        { label: "Display", field: "Display" },
        { label: "Category", field: "TagCategory", hidden: true}
    ]
    const [testBasedBoardgameTags, setTestBasedBoardgameTags] = useState([
        {
            TagID: "TG1",
            TagName: "Monopoly",
            Display: <Tag content={"Monopoly"}/>,
            TagCategory: "Based Boardgames"
        },
        {
            TagID: "TG2",
            TagName: "Root",
            Display: <Tag content={"Root"}/>,
            TagCategory: "Based Boardgames"
        },
        {
            TagID: "TO1",
            TagName: "Family",
            Display: <Tag content={"Family"}/>,
            TagCategory: "Others"
        },
        {
            TagID: "TO2",
            TagName: "Party",
            Display: <Tag content={"Party"}/>,
            TagCategory: "Others"
        }
    ])

    return (
        <div>
            <div>
                <h2 className='text-[24px] font-bold'>Based Boardgame Tags</h2>
                <Table 
                    columns={columns}
                    data={testBasedBoardgameTags}
                    isAdd
                    isDelete
                    isUpdate
                />
            </div>

            
        </div>
    )
}

export default Tags
